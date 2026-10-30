"""Regra do dono (30/10/2026): nenhum vídeo repete cena. Confere, num arquivo de vídeo, se alguma foto/clipe
(arquivo em public/) ou alguma cena do plano aparece mais de uma vez. Uso: python3 checar_repeticao.py src/videos/X.tsx"""
import re, sys, collections
s = open(sys.argv[1], encoding='utf-8').read()
corpo = s.split('export const Thumb')[0]   # a thumbnail não entra no vídeo
arqs = re.findall(r"""['"]([\w./-]+\.(?:jpg|jpeg|png|mp4|webm))['"]""", corpo)
plano = re.search(r'const PLANO[^=]*=([\s\S]*?)\n\];', corpo)
if plano: cenas = re.findall(r"\[\s*'[^']+',\s*(\w+)\]", plano.group(1))
else:
    m = re.search(r'const CENAS = \[([\s\S]*?)\];', corpo)
    cenas = re.findall(r'\b([A-Z]\w+)\b', m.group(1)) if m else []
ruim = False
for nome, lista in (('arquivo de mídia', arqs), ('cena', cenas)):
    for x, n in collections.Counter(lista).items():
        if n > 1: print(f'REPETIDO ({nome}): {x} × {n}'); ruim = True
print('ok: nada repetido' if not ruim else 'há repetição', f'({len(set(arqs))} mídias, {len(cenas)} cenas)')
sys.exit(1 if ruim else 0)
