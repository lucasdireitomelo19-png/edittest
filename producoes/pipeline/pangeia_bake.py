import json, numpy as np
from PIL import Image, ImageFilter
P = '/home/user/edittest/producoes/remotion/public/pangeia'
W, H = 2048, 1024
def v(la, lo): la, lo = np.radians(la), np.radians(lo); return np.array([np.cos(la)*np.cos(lo), np.sin(la), -np.cos(la)*np.sin(lo)])
def rot(axis, ang):
    a = axis/np.linalg.norm(axis); t = np.radians(ang); K = np.array([[0,-a[2],a[1]],[a[2],0,-a[0]],[-a[1],a[0],0]])
    return np.eye(3)+np.sin(t)*K+(1-np.cos(t))*K@K
def arco(de, para):
    a, b = v(*de), v(*para); ax = np.cross(a, b); return ax/np.linalg.norm(ax), np.degrees(np.arccos(np.clip(a@b, -1, 1)))
C0 = {'sa': (-15, -60), 'af': (5, 20), 'na': (50, -100), 'eu': (50, 80), 'au': (-25, 134), 'an': (-88, 0.1)}
def aa(axis, ang): return [float(x) for x in axis] + [float(np.radians(ang))]
def cfg_arcos(alvos, extra={}):
    o = {}
    for c, d in C0.items():
        if c in extra: o[c] = extra[c]
        elif c in alvos: ax, ang = arco(d, alvos[c]); o[c] = aa(ax, ang)
        else: o[c] = [0, 1, 0, 0.0]
    return o
BULL = {'sa': aa(v(44, -30.6), 57), 'na': aa(v(66, -12), 75.5)}
CFG = {
  'pangeia': cfg_arcos({'an': (-60, 30), 'au': (-45, 75)}, BULL),
  'ultima': cfg_arcos({'an': (-55, 40), 'au': (-20, 70), 'eu': (45, 60)}, BULL),
  'novo': cfg_arcos({'na': (50, 175), 'sa': (0, 160), 'au': (5, 125), 'an': (-45, 140)}),
  'amasia': cfg_arcos({'af': (40, 25), 'sa': (40, -75), 'na': (70, -140), 'eu': (62, 85), 'au': (35, 140)}),
  'aurica': cfg_arcos({'na': (40, -160), 'sa': (-10, -165), 'af': (0, 55), 'eu': (35, 105), 'au': (-5, 150), 'an': (-40, -150)}),
}
json.dump(CFG, open('/home/user/edittest/producoes/remotion/src/videos/pangeia.cfg.json', 'w'))
dia = np.array(Image.open('/home/user/edittest/producoes/remotion/public/teste3d/terra_dia.jpg').convert('RGB')).astype(float)
oc = np.array(Image.open(f'{P}/oceano.jpg').convert('RGB')).astype(float)
M = {c: np.array(Image.open(f'{P}/m_{c}.png')).astype(float)/255 for c in C0}
yy, xx = np.mgrid[0:H, 0:W]; lon = (xx+0.5)/W*360-180; lat = 90-(yy+0.5)/H*180
p = np.stack(v(lat, lon), -1)
def amostra(img, q):
    la = np.degrees(np.arcsin(np.clip(q[..., 1], -1, 1))); lo = np.degrees(np.arctan2(-q[..., 2], q[..., 0]))
    x = ((lo+180)/360*W).astype(int) % W; y = np.clip(((90-la)/180*H).astype(int), 0, H-1); return img[y, x]
for nome, cfg in CFG.items():
    cor = oc.copy(); terra = np.zeros((H, W))
    for c in ['an', 'au', 'sa', 'na', 'eu', 'af']:
        ax = np.array(cfg[c][:3]); R = rot(ax, np.degrees(cfg[c][3])); q = p @ R  # R^T p
        m = amostra(M[c], q); col = amostra(dia, q)
        cor = cor*(1-m[..., None]) + col*m[..., None]; terra = np.maximum(terra, m)
    Image.fromarray(cor.clip(0, 255).astype('uint8')).save(f'{P}/sc_{nome}.jpg', quality=90)
    t = Image.fromarray((terra*255).astype('uint8'))
    er = t
    for _ in range(9): er = er.filter(ImageFilter.MinFilter(5))
    calor = er.filter(ImageFilter.GaussianBlur(14))
    er3 = t
    for _ in range(3): er3 = er3.filter(ImageFilter.MinFilter(5))
    borda = Image.fromarray(np.clip(np.array(t).astype(int) - np.array(er3.filter(ImageFilter.GaussianBlur(2))).astype(int), 0, 255).astype('uint8'))
    calor.save(f'{P}/sc_{nome}_calor.png'); borda.save(f'{P}/sc_{nome}_borda.png'); t.save(f'{P}/sc_{nome}_terra.png')
    print(nome)
