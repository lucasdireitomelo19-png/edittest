"""Gera o cenas.py de um Short vertical a partir do plano.py e da narração; renderiza as animações (anim/vert.html).
Uso: python3 gerar_short.py <pasta_do_video> <prefixo> <saida.mp4>
plano.py: PLANO = [(âncora, fonte, ideia)]; fontes px:<id>[@ss], svs:<arquivo>[@ss], src:<arquivo>[@ss], mg:<cena>.
Opcional no plano.py: MARCAS = {cena: [âncoras]} (tempos internos da animação), TEXTOS = {âncora: texto}, SONS = {âncora: (som, db)}.
"""
import importlib.util, json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ancoras import norm
BASE = os.path.dirname(os.path.abspath(__file__)); SRC = os.path.join(BASE, "src")
pasta, pref, saida = os.path.abspath(sys.argv[1]), sys.argv[2], sys.argv[3]
spec = importlib.util.spec_from_file_location("plano", os.path.join(pasta, "plano.py")); pl = importlib.util.module_from_spec(spec); spec.loader.exec_module(pl)
MARCAS, TEXTOS, SONS = getattr(pl, "MARCAS", {}), getattr(pl, "TEXTOS", {}), getattr(pl, "SONS", {})
pal = json.load(open(os.path.join(pasta, "palavras.json")))
txt, ini = "", []
for p in pal:
    for parte in norm(p["w"]).split(): ini.append((len(txt), p["t"])); txt += parte + " "
def tempo(a, desde=0):
    pos = txt.find(" ".join(norm(a).split()) + " ", desde); assert pos >= 0, a
    return next(t for c, t in reversed(ini) if c <= pos), pos + 1
FIM = round(pal[-1]["t"] + pal[-1]["d"] + 2.6, 2)
ts, cur = [], 0
for i, (a, f, _) in enumerate(pl.PLANO):
    if i == 0: ts.append(0.0); continue
    t, cur = tempo(a, cur); ts.append(max(0.0, t - 0.1))
cred = json.load(open(os.path.join(SRC, "creditos_pixabay.json")))
jobs, linhas, creditos = [], [], []
for i, (a, f, ideia) in enumerate(pl.PLANO):
    dur = (ts[i + 1] if i + 1 < len(ts) else FIM) - ts[i]
    tipo, nome = f.split(":", 1); ss = 0
    topo = nome.endswith("#topo"); nome = nome.replace("#topo", "")
    rec = None
    if "#c=" in nome: nome, rec = nome.split("#c="); rec = [float(v) for v in rec.split(",")]   # recorte x,y,w,h em frações do quadro
    if "@" in nome: nome, ss = nome.split("@"); ss = float(ss)
    o = {}
    if tipo == "mg":
        arq = f"{pref}_{i:02d}_{nome}.mp4"; p = {}
        if nome in MARCAS: p["ts"] = [round(tempo(m)[0] - ts[i], 2) for m in MARCAS[nome]]
        jobs.append(dict(saida=os.path.join(SRC, arq), cena=nome, dur=round(dur + 0.4, 2), p=p))
        o.update(tag="anim", zoom=(1.0, 1.03), sat=getattr(pl, "SAT", {}).get(a, 1.0), fixo=True)   # SAT: dessatura no ffmpeg (motor.py)
    else:
        arq = {"px": f"fm_{nome}.mp4", "svs": f"sv_{nome}", "src": nome}[tipo]
        if topo:  # fonte vertical com texto embaixo: usa só a parte de cima
            w, h = map(int, subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", os.path.join(SRC, arq)]).decode().strip().split(","))
            o["crop"] = [0, int(h * 0.07) // 2 * 2, w, int(h * 0.55) // 2 * 2]
        if rec:
            w, h = map(int, subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", os.path.join(SRC, arq)]).decode().strip().split(","))
            o["crop"] = [int(w * rec[0]) // 2 * 2, int(h * rec[1]) // 2 * 2, int(w * rec[2]) // 2 * 2, int(h * rec[3]) // 2 * 2]
        o.update(tag="sim" if "(simula" in ideia else "ilus" if ("(anima" in ideia or "(ilustra" in ideia) else "real", zoom=(1.0, 1.12))
        c = cred.get(arq, {}).get("credito") if tipo == "px" else ("ESA/Hubble & NASA" if arq.startswith("hb_") else "NASA")
        if c and c not in creditos: creditos.append(c)
    o["src"], o["ss"] = arq, ss
    if a in TEXTOS: o["texto"] = TEXTOS[a]
    if a in SONS: o["som"] = SONS[a]
    linhas.append(f"    dict(t={ts[i]:.2f}, **{o!r}),  # {i + 1} {ideia}")
if jobs:
    jp = os.path.join(pasta, "jobs_anim.json"); json.dump(jobs, open(jp, "w"))
    subprocess.run(["node", os.path.join(BASE, "anim", "render_anim.js"), jp, "vert.html", "1080", "1920"], check=True)
extra = []
if getattr(pl, "DIAS_ANC", None):
    extra.append("DIAS = " + repr([(round(tempo(a)[0], 2), r) for a, r in pl.DIAS_ANC]))
    if getattr(pl, "DIAS_TAM", None): extra.append(f"DIAS_TAM = {pl.DIAS_TAM}")
for nome_cfg in ("VIRADA_ANC", "SILENCIO_ANC"):
    if getattr(pl, nome_cfg, None):
        extra.append(f"{nome_cfg[:-4]} = " + repr(tuple(round(tempo(a)[0], 2) for a in getattr(pl, nome_cfg))))
if getattr(pl, "CRONO_ANC", None):
    extra.append("CRONO = (" + ", ".join(f"{tempo(a)[0]:.2f}" for a in pl.CRONO_ANC) + ")")
cab = [f"# Gerado por pipeline/gerar_short.py a partir de plano.py.", 'FINAL = "SIGA PARA MAIS"', f"FIM = {FIM}", 'AMBIENTE = "drone"', "AMBIENTE_DB = -22",
       f"ETIQUETAS = {getattr(pl, 'ETIQUETAS', False)!r}", "CORTE_MAX = 2.6", "PROGRESSO = True", "LEGENDA_MV = 230", "FINAL_ALIN, FINAL_MV = 8, 200", f'SAIDA = "{saida}"',
       f"CREDITO = {' · '.join(creditos)!r}", *extra, "CENAS = ["]
open(os.path.join(pasta, "cenas.py"), "w").write("\n".join(cab + linhas + ["]"]) + "\n")
print("FIM", FIM, "| cenas", len(linhas), "| animações", len(jobs))
