# Troca piscadas pretas curtas (<= 4 quadros) pelo próximo quadro bom, com freezeframes do ffmpeg.
import subprocess, sys, re
ent, sai = sys.argv[1], sys.argv[2]
out = subprocess.run(['ffmpeg', '-i', ent, '-vf', 'blackdetect=d=0.01:pix_th=0.04', '-an', '-f', 'null', '-'], capture_output=True, text=True).stderr
runs = [(float(a), float(b)) for a, b in re.findall(r'black_start:([0-9.]+) black_end:([0-9.]+)', out)]
# junta piscadas separadas por 1 quadro
fr = []
for a, b in runs:
    i, j = round(a * 30), round(b * 30) - 1
    if fr and i - fr[-1][1] <= 2: fr[-1][1] = j
    else: fr.append([i, j])
fr = [(i, j) for i, j in fr if j - i + 1 <= 5]
n = len(fr)
if n == 0:
    filt = '[0:v]null[o]'
else:
    partes = [f'[0:v]split={n + 1}[v0]' + ''.join(f'[r{k}]' for k in range(1, n + 1))]
    for k, (i, j) in enumerate(fr, 1):
        partes.append(f'[v{k - 1}][r{k}]freezeframes=first={i}:last={j}:replace={j + 1}[v{k}]')
    partes.append(f'[v{n}]null[o]')
    filt = ';'.join(partes)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', ent, '-filter_complex', filt, '-map', '[o]', '-map', '0:a?', '-c:a', 'copy', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', sai], check=True)
print(len(fr), 'piscadas tapadas')
