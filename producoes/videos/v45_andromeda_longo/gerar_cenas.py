# Gera cenas.py (motor_h) a partir de plano.py e dos tempos da narração.
import json, re, subprocess, unicodedata
from plano import PLANO, CAPS, CANTO
SRC = '/home/user/edittest/producoes/pipeline/src'
cred = json.load(open(SRC + '/creditos_pixabay.json'))
pal = json.load(open('palavras.json'))
FIM = round(pal[-1]['t'] + pal[-1]['d'] + 1.2, 2)   # corte seco pro preto logo depois da última fala
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
L = ['# Gerado por gerar_cenas.py a partir de plano.py. Ver producoes/23_andromeda_longo.md.', f'FIM = {FIM}', 'SAIDA = "andromeda_longo.mp4"', 'FINAL = ""',
     'MAX_PLANO = 7.0', 'MUSICA = "musica.wav"', 'MUSICA_DB = -14', 'ANIM_PAGE = "andro.html"', '', 'CENAS = [']
cur = 0
for i, (a, f, ideia) in enumerate(PLANO, 1):
    t, cur = tempo(a, cur); o = {}; tipo, nome = f.split(':', 1)
    if tipo == 'mg':
        c = nome
        if c.startswith('cap'):
            n = c[3:]; tit, cont, cor, c1 = CAPS[n]; o['p'] = dict(num=int(n), titulo=tit, cont=cont, cor=cor, c1=c1, seed=int(n) * 5); c = 'a_cap'; o['capitulo'] = f"{n} · {tit.capitalize()}"
        o['src'] = 'anim:' + c; o['tag'] = 'anim'
    else:
        rec = None
        if '#c=' in nome: nome, rec = nome.split('#c='); rec = [float(v) for v in rec.split(',')]
        esq = nome.endswith('#esq'); nome = nome.replace('#esq', '')
        if '@' in nome: nome, ss = nome.split('@'); o['ss'] = float(ss)
        arq = {'px': f'fm_{nome}.mp4', 'src': nome, 'svs': f'sv_{nome}'}[tipo]; o['src'] = arq
        w, h = dims(f'{SRC}/{arq}')
        if rec: o['crop'] = [int(w * rec[0]) // 2 * 2, int(h * rec[1]) // 2 * 2, int(w * rec[2]) // 2 * 2, int(h * rec[3]) // 2 * 2]
        if esq: o['crop'] = [0, 0, int(w * 0.56) // 2 * 2, h]
        o['tag'] = 'sim' if '(simula' in ideia else 'ilus' if ('(ilustra' in ideia or '(anima' in ideia) else 'real'
        if tipo == 'px': o['credito'] = cred.get(arq, {}).get('credito', 'Pixabay')
        elif arq.startswith('hb_'): o['credito'] = 'ESA/Hubble & NASA'
        elif 'sdo' in arq: o['credito'] = 'NASA/SDO'
        elif '14762' in arq or 'm33' in arq: o['credito'] = 'NASA/ESA/Hubble'
        elif 'ceu_andromeda' in arq or '14847' in arq: o['credito'] = 'NASA/ESA/STScI'
        else: o['credito'] = 'NASA'
    L.append(f"    ({a!r}, {o!r}),  # {i} {ideia}")
L.append(']')
ct, cur = [], 0
for a, s in CANTO:
    t, cur = tempo(a, cur); ct.append((round(max(t - 0.15, 0), 2), s))
ct.append((FIM, None))
L.append('CANTO = ' + repr([(t0, ct[k + 1][0], s) for k, (t0, s) in enumerate(ct[:-1]) if s]))
open('cenas.py', 'w').write("\n".join(L) + "\n")
print(len(PLANO), 'cenas, FIM', FIM)
