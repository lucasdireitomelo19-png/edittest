# Recorta o contorno de terra do Natural Earth 50m (pipeline/anim/geo/land-50m.json) para uma região: python3 geo_regiao.py nome lon0 lon1 lat0 lat1
import json, sys
nome, lo0, lo1, la0, la1 = sys.argv[1], *map(float, sys.argv[2:6])
t = json.load(open('../pipeline/anim/geo/land-50m.json'))
sx, sy = t['transform']['scale']; tx, ty = t['transform']['translate']
arcs = []
for a in t['arcs']:
    x = y = 0; pts = []
    for dx, dy in a: x += dx; y += dy; pts.append((x * sx + tx, y * sy + ty))
    arcs.append(pts)
arc = lambda i: arcs[i] if i >= 0 else arcs[~i][::-1]
obj = t['objects']['land']; polys = []
for g in (obj['geometries'] if 'geometries' in obj else [obj]):
    for poly in (g['arcs'] if g['type'] == 'MultiPolygon' else [g['arcs']]):
        for ring in poly:
            pts = []
            for i in ring: a = arc(i); pts.extend(a if not pts else a[1:])
            m = 25   # margem: guarda pontos um pouco fora do quadro para não criar cordas visíveis
            sel = [[round(x, 3), round(y, 3)] for x, y in pts if lo0 - m <= x <= lo1 + m and la0 - m <= y <= la1 + m]
            if len(sel) > 2 and any(lo0 <= x <= lo1 and la0 <= y <= la1 for x, y in sel): polys.append(sel)
json.dump(polys, open(f'src/videos/dados/{nome}.json', 'w'), separators=(',', ':'))
print(nome, len(polys), sum(len(p) for p in polys))
