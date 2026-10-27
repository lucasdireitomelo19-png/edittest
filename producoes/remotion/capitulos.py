# Insere um silêncio antes de cada capítulo (onde entra o cartão) e desloca os tempos das palavras.
# Uso: python3 capitulos.py <pasta do vídeo> <gap_s> "<frase 1>" "<frase 2>" ...   → narracao_cap.mp3 e palavras_cap.json
import json, re, subprocess, sys, unicodedata
d, GAP, caps = sys.argv[1], float(sys.argv[2]), sys.argv[3:]
W = json.load(open(f'{d}/palavras.json'))
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]', ' ', s)).strip()
txt, dono = '', []
for i, w in enumerate(W):
    n = norm(w['w'])
    if not n: continue
    if txt: txt += ' '; dono.append(i)
    dono += [i] * len(n); txt += n
de, idx = 0, []
for c in caps:
    p = txt.index(norm(c), de); de = p + 1; idx.append(dono[p])
cut = [W[i]['t'] - 0.15 for i in idx]   # corta um pouco antes da palavra
seg, p = [], 0
for c in cut: seg.append((p, c)); p = c
seg.append((p, None))
f, parts = '', []
for k, (a, b) in enumerate(seg):
    f += f"[0:a]atrim=start={a:.3f}" + (f":end={b:.3f}" if b else '') + f",asetpts=PTS-STARTPTS[s{k}];"
    parts.append(f'[s{k}]')
    if k < len(cut): f += f"anullsrc=r=44100:cl=mono,atrim=duration={GAP}[z{k}];"; parts.append(f'[z{k}]')
f += ''.join(parts) + f"concat=n={len(parts)}:v=0:a=1[o]"
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{d}/narracao.mp3', '-filter_complex', f, '-map', '[o]', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '192k', f'{d}/narracao_cap.mp3'], check=True)
for w in W:
    w['t'] = round(w['t'] + GAP * sum(1 for c in cut if c <= w['t']), 3)
json.dump(W, open(f'{d}/palavras_cap.json', 'w'), ensure_ascii=False)
print('capítulos em', [round(W[i]['t'] - GAP, 1) for i in idx])
