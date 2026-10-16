"""Gera narracao.mp3 e palavras.json a partir de roteiro.txt, ajustando a velocidade para caber no alvo.

Uso: python3 narrar.py <pasta> [alvo_s] [rate_inicial] [--voz NOME] [--pausa S]
  --voz    voz do edge-tts (padrão pt-BR-AntonioNeural)
  --pausa  encurta os silêncios entre frases para no máximo S segundos (fala contínua)
A voz e a pausa usadas ficam gravadas em voz.txt na pasta, e são reaproveitadas na próxima execução.
"""
import asyncio, json, os, sys, subprocess, edge_tts

args = sys.argv[1:]
def opcao(nome):
    if nome in args:
        i = args.index(nome); v = args[i + 1]; del args[i:i + 2]; return v
d = args[0]
cfg = dict(l.split("=", 1) for l in open(f"{d}/voz.txt").read().split()) if os.path.exists(f"{d}/voz.txt") else {}
VOZ = opcao("--voz") or cfg.get("voz", "pt-BR-AntonioNeural")
PAUSA = float(opcao("--pausa") or cfg.get("pausa", 0)) or None
alvo = float(args[1]) if len(args) > 1 else 60.2
TEXT = open(f"{d}/roteiro.txt", encoding="utf-8").read().strip()

def duracao(arq):
    return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",arq]))

def encurtar_pausas(words):
    """Corta os silêncios maiores que PAUSA e desloca os tempos das palavras."""
    folga = PAUSA / 2
    cortes = []   # (início, fim) de cada trecho removido
    for a, b in zip(words, words[1:]):
        fim_a = a["t"] + a["d"]
        if b["t"] - fim_a > PAUSA:
            cortes.append((fim_a + folga, b["t"] - folga))
    if not cortes:
        return words
    total = duracao(f"{d}/narracao.mp3")
    trechos, ini = [], 0.0
    for c0, c1 in cortes:
        trechos.append((ini, c0)); ini = c1
    trechos.append((ini, total))
    filtros = "".join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[p{i}];" for i, (a, b) in enumerate(trechos))
    filtros += "".join(f"[p{i}]" for i in range(len(trechos))) + f"concat=n={len(trechos)}:v=0:a=1[a]"
    tmp = f"{d}/narracao_bruta.mp3"
    os.replace(f"{d}/narracao.mp3", tmp)
    subprocess.run(["ffmpeg","-v","error","-y","-i",tmp,"-filter_complex",filtros,"-map","[a]",
                    "-c:a","libmp3lame","-b:a","192k",f"{d}/narracao.mp3"], check=True)
    os.remove(tmp)
    for w in words:
        w["t"] = round(w["t"] - sum(c1 - c0 for c0, c1 in cortes if c1 <= w["t"]), 3)
    return words

async def gerar(rate):
    c = edge_tts.Communicate(TEXT, VOZ, rate=rate, boundary="WordBoundary",
                             proxy=os.environ.get("HTTPS_PROXY"))
    words = []
    with open(f"{d}/narracao.mp3", "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio": f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"t": ch["offset"]/1e7, "d": ch["duration"]/1e7, "w": ch["text"]})
    if PAUSA:
        words = encurtar_pausas(words)
    json.dump(words, open(f"{d}/palavras.json", "w"), ensure_ascii=False)
    return duracao(f"{d}/narracao.mp3")

r = int(args[2]) if len(args) > 2 else 8
for _ in range(6):
    dur = asyncio.run(gerar(f"{r:+d}%"))
    print(d, VOZ, f"rate {r:+d}% -> {dur:.2f}s")
    if alvo - 0.6 <= dur <= alvo: break
    r += max(1, round((dur/alvo - 1) * 100)) if dur > alvo else -max(1, round((1 - dur/alvo) * 100))
open(f"{d}/rate.txt","w").write(f"{r:+d}%")
open(f"{d}/voz.txt","w").write(f"voz={VOZ}" + (f"\npausa={PAUSA}" if PAUSA else "") + "\n")
