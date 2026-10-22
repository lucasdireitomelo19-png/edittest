# Gera cenas.py (motor_h) a partir de plano.py e dos tempos da narração.
import json, re, subprocess, unicodedata
from plano import PLANO, CAPS, CANTO
SRC = '/home/user/edittest/producoes/pipeline/src'
cred = json.load(open(SRC + '/creditos_pixabay.json'))
pal = json.load(open('palavras.json'))
FIM = round(pal[-1]['t'] + pal[-1]['d'] + 4.0, 2)
def norm(s):
    s = unicodedata.normalize("NFD", s.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn"); return re.sub(r"[^a-z0-9 ]+", " ", s)
txt, ini = "", []
for p in pal:
    for parte in norm(p["w"]).split(): ini.append((len(txt), p["t"])); txt += parte + " "
def tempo(a, desde=0):
    pos = txt.find(" ".join(norm(a).split()) + " ", desde); assert pos >= 0, a
    return next(t for c, t in reversed(ini) if c <= pos), pos + 1
def dims(a):
    o = subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', a]).decode().split(',')
    return int(o[0]), int(o[1])
TEXTOS = {"em nova york": "NOVA YORK", "hoje pripyat e uma floresta": "PRIPYAT HOJE", "na lua onde nao tem": "LUA · APOLLO 17",
          "um ponto de fogo": "REENTRADA DA ORION · NASA", "uma capsula descendo": "PARAQUEDAS DA ORION · NASA"}
L = ['# Gerado por gerar_cenas.py a partir de plano.py. Ver producoes/20_ultima_pessoa.md.', f'FIM = {FIM}', 'SAIDA = "ultima_pessoa.mp4"', 'FINAL = ""',
     'MAX_PLANO = 7.0', 'MUSICA = "musica.wav"', 'MUSICA_DB = -14', 'ANIM_PAGE = "ultima.html"', '', 'CENAS = [']
sat, cur = 1.0, 0
for i, (a, f, ideia) in enumerate(PLANO, 1):
    t, cur = tempo(a, cur)
    o = {}; tipo, nome = f.split(':', 1)
    if nome == 'u_rebobina': sat = 1.0
    if tipo == 'mg':
        c = nome
        if c.startswith('cap'):
            n = c[3:]; tit, sub, cor, c1, sat = CAPS[n]
            o['p'] = dict(titulo=tit, sub=sub, cor=cor, c1=c1, seed=int(n) * 7, glitch=n == '2'); c = 'u_cap'; o['capitulo'] = f"{tit.title()} · {sub}"
        o['src'] = 'anim:' + c; o['tag'] = 'anim'; o.setdefault('p', {})['sat'] = sat
    else:
        if '@' in nome: nome, ss = nome.split('@'); o['ss'] = float(ss)
        arq = {'px': f'fm_{nome}.mp4', 'src': nome}[tipo]; o['src'] = arq; dims(f'{SRC}/{arq}')
        o['tag'] = 'real'; o['sat'] = round(1.12 * sat, 2)
        o['credito'] = cred.get(arq, {}).get('credito', 'Pixabay') if tipo == 'px' else 'NASA'
    if a in TEXTOS: o['texto'] = TEXTOS[a]
    L.append(f"    ({a!r}, {o!r}),  # {i} {ideia}")
L.append(']')
# cantinho (população/tempo): tempos absolutos
ct, cur = [], 0
for a, s in CANTO:
    t, cur = tempo(a, cur); ct.append((round(max(t - 0.15, 0), 2), s))
L.append('CANTO = ' + repr([(t0, ct[k + 1][0], s) for k, (t0, s) in enumerate(ct[:-1]) if s]))
open('cenas.py', 'w').write("\n".join(L) + "\n")
print(len(PLANO), 'cenas, FIM', FIM)
