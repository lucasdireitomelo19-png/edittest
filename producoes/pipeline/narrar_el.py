"""Narração com o ElevenLabs (gera narracao.mp3 e palavras.json, como o narrar.py).

Uso: ELEVENLABS_API_KEY=... python3 narrar_el.py <pasta> [alvo_s] [--voz ID] [--vel 1.15] [--pausa 0.15]
  --voz    id da voz (padrão: Brian, nPczCjzI2devNBz1zQrb)
  --vel    velocidade pedida ao ElevenLabs (0.7 a 1.2)
  --pausa  encurta silêncios entre frases para no máximo S segundos
  alvo_s   se a fala passar do alvo, acelera com atempo (no máximo 1.15x) para caber
A chave fica só na variável de ambiente; nunca é gravada em arquivo. Cada execução gasta créditos.
"""
import base64, json, os, subprocess, sys, urllib.request

args = sys.argv[1:]
def opcao(nome, padrao=None):
    if nome in args:
        i = args.index(nome); v = args[i + 1]; del args[i:i + 2]; return v
    return padrao
VOZ = opcao("--voz", "nPczCjzI2devNBz1zQrb")
VEL = float(opcao("--vel", "1.15"))
PAUSA = float(opcao("--pausa", "0.15"))
d = args[0]
alvo = float(args[1]) if len(args) > 1 else None
CHAVE = os.environ.get("ELEVENLABS_API_KEY")
if not CHAVE:
    raise SystemExit("ELEVENLABS_API_KEY não definida")
TEXT = open(f"{d}/roteiro.txt", encoding="utf-8").read().strip()

def duracao(arq):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", arq]))

req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{VOZ}/with-timestamps?output_format=mp3_44100_128",
    data=json.dumps({"text": TEXT, "model_id": "eleven_multilingual_v2",
                     "voice_settings": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.3, "speed": VEL}}).encode(),
    headers={"xi-api-key": CHAVE, "Content-Type": "application/json"})
resp = json.load(urllib.request.urlopen(req, timeout=300))
bruto = f"{d}/narracao_el.mp3"
open(bruto, "wb").write(base64.b64decode(resp["audio_base64"]))

# letras -> palavras
al = resp["alignment"]
words, atual, ini, fim = [], "", None, None
for ch, t0, t1 in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
    if ch.isspace():
        if atual: words.append({"t": ini, "d": fim - ini, "w": atual}); atual = ""
        continue
    if not atual: ini = t0
    atual += ch; fim = t1
if atual: words.append({"t": ini, "d": fim - ini, "w": atual})

# encurta pausas longas entre palavras
folga = PAUSA / 2
cortes = [(a["t"] + a["d"] + folga, b["t"] - folga) for a, b in zip(words, words[1:]) if b["t"] - (a["t"] + a["d"]) > PAUSA]
total = duracao(bruto)
trechos, p0 = [], 0.0
for c0, c1 in cortes:
    trechos.append((p0, c0)); p0 = c1
trechos.append((p0, total))
filtro = "".join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[p{i}];" for i, (a, b) in enumerate(trechos))
filtro += "".join(f"[p{i}]" for i in range(len(trechos))) + f"concat=n={len(trechos)}:v=0:a=1[c]"
for w in words:
    w["t"] -= sum(c1 - c0 for c0, c1 in cortes if c1 <= w["t"])
dur = total - sum(c1 - c0 for c0, c1 in cortes)
fator = 1.0
if alvo and dur > alvo:
    fator = min(1.15, dur / alvo)
filtro += f";[c]atempo={fator:.4f}[a]" if fator > 1.0001 else ";[c]anull[a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", bruto, "-filter_complex", filtro, "-map", "[a]",
                "-c:a", "libmp3lame", "-b:a", "192k", f"{d}/narracao.mp3"], check=True)
os.remove(bruto)
for w in words:
    w["t"] = round(w["t"] / fator, 3); w["d"] = round(w["d"] / fator, 3)
json.dump(words, open(f"{d}/palavras.json", "w"), ensure_ascii=False)
open(f"{d}/voz.txt", "w").write(f"elevenlabs={VOZ}\nvel={VEL}\npausa={PAUSA}\natempo={fator:.3f}\n")
open(f"{d}/rate.txt", "w").write(f"elevenlabs vel {VEL} atempo {fator:.3f}")
print(d, f"{len(words)} palavras, {duracao(f'{d}/narracao.mp3'):.2f}s (vel {VEL}, atempo {fator:.3f}, {len(TEXT)} caracteres)")
