# Gera cenas.py (motor_h) a partir de plano.py e dos tempos da narração.
import json, re, subprocess, unicodedata
from plano import PLANO, CAPS
SRC = '/home/user/edittest/producoes/pipeline/src'
cred = json.load(open(SRC + '/creditos_pixabay.json'))
pal = json.load(open('palavras.json'))
def norm(s):
    s = unicodedata.normalize("NFD", s.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn"); return re.sub(r"[^a-z0-9 ]+", " ", s)
txt, ini = "", []
for p in pal:
    for parte in norm(p["w"]).split(): ini.append((len(txt), p["t"])); txt += parte + " "
def tempo(a, desde=0):
    pos = txt.find(" ".join(norm(a).split()) + " ", desde); assert pos >= 0, a
    return next(t for c, t in reversed(ini) if c <= pos)
def dims(a):
    o = subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', a]).decode().split(',')
    return int(o[0]), int(o[1])
# marcas internas de algumas animações (sincronizadas com a fala)
MARCAS = {'v_linha': ["ha dois milhoes", "ha um milhao e trezentos", "ha seiscentos e quarenta"],
          'f_recap': ["um supervulcao pode abalar", "um asteroide gigante", "uma explosao de raios gama perigosa", "o sol so vira problema", "e o vacuo provavelmente"]}
TEXTOS = {"sessenta e seis milhoes de anos atras": "66 MILHÕES DE ANOS ATRÁS", "ha uns setenta e quatro mil anos": "LAGO TOBA · INDONÉSIA",
          "e yellowstone ja teve tres": "YELLOWSTONE", "e pela primeira vez na historia": "DART · 2021", "a nasa jogou a nave dart": "IMPACTO DA DART · 26/09/2022",
          "foi a primeira vez que a humanidade": "HUBBLE · 2022", "em outubro de 2022": "FERMI · 9/10/2022"}
L = ['# Gerado por gerar_cenas.py a partir de plano.py. Ver producoes/15_fim_do_mundo.md.', 'FIM = 506.0', 'SAIDA = "fim_do_mundo.mp4"', 'FINAL = ""',
     'MAX_PLANO = 9.0', 'MUSICA = "musica.wav"', 'MUSICA_DB = -14', 'ANIM_PAGE = "mundo.html"', '', 'CENAS = [']
for i, (a, f, ideia) in enumerate(PLANO, 1):
    o = {}; tipo, nome = f.split(':', 1)
    if tipo == 'mg':
        c = nome
        if c.startswith('cap'):
            n = c[3:]; tit, tema, c1 = CAPS[n]; o['p'] = dict(num=int(n), titulo=tit, tema=tema, c1=c1); c = 'cap'; o['capitulo'] = f"{n} · {tit.title()}"
        if c in MARCAS:
            t0 = tempo(a) - 0.15; o['p'] = dict(ts=[round(tempo(m) - t0, 2) for m in MARCAS[c]])
        o['src'] = 'anim:' + c; o['tag'] = 'anim'
    else:
        esq, cen = nome.endswith('#esq'), nome.endswith('#centro'); nome = nome.replace('#esq', '').replace('#centro', '')
        if '@' in nome: nome, ss = nome.split('@'); o['ss'] = float(ss)
        arq = {'px': f'fm_{nome}.mp4', 'src': nome, 'svs': f'sv_{nome}'}[tipo]; o['src'] = arq
        w, h = dims(f'{SRC}/{arq}')
        if esq: o['crop'] = [0, 0, int(w * 0.56) // 2 * 2, h]
        if cen: o['crop'] = [int(w * 0.27), int(h * 0.12), int(w * 0.5) // 2 * 2, int(h * 0.5) // 2 * 2]
        o['tag'] = 'ilus' if ('(ilustra' in ideia or '(anima' in ideia) else 'real'
        if tipo == 'px': o['credito'] = cred.get(arq, {}).get('credito', 'Pixabay')
        elif 'recap' in arq: o['credito'] = 'NASA/Johns Hopkins APL'
        elif '14215' in arq: o['credito'] = 'NASA/ESA/Hubble'
        elif 'sdo' in arq: o['credito'] = 'NASA/SDO'
        elif 'iss' in arq: o['credito'] = 'NASA'
        else: o['credito'] = 'NASA Goddard'
    if a in TEXTOS: o['texto'] = TEXTOS[a]
    L.append(f"    ({a!r}, {o!r}),  # {i} {ideia}")
L.append(']')
open('cenas.py', 'w').write("\n".join(L) + "\n")
print(len(PLANO), 'cenas')
