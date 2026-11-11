"""Gera as texturas do mapa "o mar sobe" (Short Gelo, lado-103).

Uso: python3 gelo_bake.py <pasta_de_trabalho>
Baixe antes, na pasta de trabalho:
  ETOPO5.DAT  https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO5/TOPO/ETOPO5/ETOPO5.DAT  (NOAA, domínio público; altitude em metros, 5 minutos de arco)
  bm.jpg      https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg     (NASA Blue Marble 4096x2048, domínio público)
Saída em remotion/public/gelo: elev.png (0 = oceano; 1 a 255 = altitude da terra em metros, com teto em 255) e terra4k.jpg.
A Antártida fica em 255 para não ser pintada de azul (o ETOPO5 dá a superfície do gelo, não a rocha).
"""
import os, sys
import numpy as np
from PIL import Image
d = sys.argv[1]
P = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'remotion', 'public')
a = np.roll(np.fromfile(os.path.join(d, 'ETOPO5.DAT'), dtype='>i2').reshape(2160, 4320), 2160, axis=1).astype(np.float32)
W, H = 4096, 2048
el = np.array(Image.fromarray(a).resize((W, H), Image.BILINEAR))
# o ETOPO5 tem blocos retos de 1 grau em áreas mal medidas (Amazônia, África central): suaviza a altitude da terra antes do corte
from PIL import ImageFilter
baixo = Image.fromarray(np.clip(el, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(7))
el = np.where(el > 0, np.minimum(np.maximum(el, 0), 255) * 0.25 + np.array(baixo).astype(np.float32) * 0.75, el)
terra = np.array(Image.open(P + '/pangeia/m_terra.png').resize((W, H), Image.BILINEAR)) > 100
land = terra | (el > 3)
out = np.where(land, np.clip(el, 1, 255), 0).astype(np.uint8)
lat = 90 - (np.arange(H)[:, None] + 0.5) / H * 180
out = np.where((lat < -60) & land, 255, out)
Image.fromarray(out).save(P + '/gelo/elev.png')
Image.open(os.path.join(d, 'bm.jpg')).save(P + '/gelo/terra4k.jpg', quality=88)
print('terra alagada com +66 m: %.1f%%' % (100 * ((out > 0) & (out < 66)).sum() / (out > 0).sum()))
