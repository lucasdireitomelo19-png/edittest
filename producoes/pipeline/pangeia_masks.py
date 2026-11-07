import json, sys
from PIL import Image, ImageDraw, ImageFilter
W, H = 2048, 1024
g = json.load(open(sys.argv[1])); out = sys.argv[2]; terra = sys.argv[3]
def px(lon, lat): return ((lon + 180) / 360 * W, (90 - lat) / 180 * H)
def rings(geom):
    cs = geom['coordinates']
    polys = cs if geom['type'] == 'MultiPolygon' else [cs]
    for p in polys:
        yield p[0]
def centro(f):
    xs = [(lo, la) for r in rings(f['geometry']) for lo, la in r]
    return sum(a for a, _ in xs) / len(xs), sum(b for _, b in xs) / len(xs)
def cont(f):
    n = f['properties']['name']; lo, la = centro(f)
    if n == 'Antarctica': return 'an'
    if n in ('Australia', 'New Zealand', 'Papua New Guinea'): return 'au'
    if n in ('Greenland',): return 'na'
    if lo < -25 or n in ('Fiji',) and False:
        return 'sa' if (la < 8.5 and lo > -82) or n in ('Venezuela', 'Colombia', 'Guyana', 'Suriname') else 'na'
    if lo > 150 and la < 0: return 'au'
    if la < 37.5 and -20 < lo < 52 and n not in ('Yemen', 'Oman', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Iraq', 'Jordan', 'Israel', 'Palestine', 'Syria', 'Lebanon', 'Cyprus', 'Turkey', 'Iran', 'Bahrain'): return 'af'
    if n == 'Madagascar': return 'af'
    return 'eu'
GUINE = {'Nigeria', 'Ghana', 'Cameroon', 'Benin', 'Togo', "Côte d'Ivoire", 'Gabon', 'Eq. Guinea', 'Liberia', 'São Tomé and Principe'}
masks = {k: Image.new('L', (W, H), 0) for k in ['sa', 'af', 'na', 'eu', 'au', 'an', 'brasil', 'nordeste', 'guine', 'terra']}
def poly(img, ring, clip=None):
    pts = []
    prev = None
    for lo, la in ring:
        if prev is not None and abs(lo - prev) > 180: lo = lo + 360 if lo < prev else lo - 360
        pts.append((lo, la)); prev = lo
    for shift in (-360, 0, 360):
        q = [px(lo + shift, la) for lo, la in pts]
        if len(q) > 2: ImageDraw.Draw(img).polygon(q, fill=255)
for f in g['features']:
    n = f['properties']['name']
    for r in rings(f['geometry']):
        c = cont({'properties': {'name': n}, 'geometry': {'type': 'Polygon', 'coordinates': [r]}})
        if n in ('France', 'Spain', 'Portugal', 'Italy', 'Greece', 'Malta') and c == 'af': c = 'eu'
        if c == 'an':
            continue
        poly(masks[c], r); poly(masks['terra'], r)
        if n == 'Brazil': poly(masks['brasil'], r)
        if n in GUINE: poly(masks['guine'], r)
# Antártida: preenche até o polo
an = masks['an']; d = ImageDraw.Draw(an)
_t = Image.open(terra).convert('L').resize((W, H))
for y in range(int((90 + 60) / 180 * H), H):
    for x in range(W):
        if _t.getpixel((x, y)) > 150 or y > (90 + 70) / 180 * H: an.putpixel((x, y), 255)
masks['terra'] = Image.fromarray(__import__('numpy').maximum(__import__('numpy').array(masks['terra']), __import__('numpy').array(an)))
# Nordeste: Brasil a leste de -48 e norte de -18.3
import numpy as np
b = np.array(masks['brasil']); yy, xx = np.mgrid[0:H, 0:W]
lon = xx / W * 360 - 180; lat = 90 - yy / H * 180
ne = Image.new('L', (W, H), 0)
NE = [(-48.7, 2), (-48.7, -1), (-48.3, -5.5), (-47.4, -8.6), (-46.1, -10.2), (-46.6, -13.4), (-44.3, -14.6), (-41.6, -15.8), (-40.6, -17.3), (-39.7, -18.4), (-28, -18.4), (-28, 2)]
ImageDraw.Draw(ne).polygon([px(lo, la) for lo, la in NE], fill=255)
masks['nordeste'] = Image.fromarray(np.minimum(b, np.array(ne)).astype('uint8'))
for k, m in masks.items():
    m.filter(ImageFilter.GaussianBlur(0.8)).save(f'{out}/m_{k}.png')
# oceano: textura com a terra trocada pela cor média do mar ao redor
t = np.array(Image.open(terra).convert('RGB').resize((W, H))).astype(float)
mt = np.array(masks['terra'].filter(ImageFilter.MaxFilter(5))) > 0
lum = t.mean(2)
mar = np.median(t[(~mt) & (lum < 120)], 0)
gelo = (lum > 110) & ~mt
oc = t.copy(); oc[mt | gelo] = mar
for _ in range(3):
    b = np.array(Image.fromarray(oc.clip(0,255).astype('uint8')).filter(ImageFilter.GaussianBlur(12))).astype(float)
    oc[mt | gelo] = b[mt | gelo]
oc[mt | gelo] = oc[mt | gelo] * 0.6 + mar * 0.4
Image.fromarray(np.clip(oc, 0, 255).astype('uint8')).filter(ImageFilter.GaussianBlur(1)).save(f'{out}/oceano.jpg', quality=90)
print('ok', mar)
