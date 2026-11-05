# Teste 3D v2 (Blender, 05/11/2026): Terra atingida por um asteroide e rachando, a crosta quebra em pedaços de verdade.
# Pedido do dono ("Consegue fazer com blender?") depois do teste em Remotion (lado-94). Estilizado e nada gráfico.
# Uso: blender -b -P terra_impacto.py -- <pasta das texturas> <pasta de saída> [porcentagem] [amostras] [frame_ini] [frame_fim]
import bpy, bmesh, math, random, sys
from mathutils import Vector, Matrix, Quaternion, Euler

argv = sys.argv[sys.argv.index('--') + 1:]
TEX, SAIDA = argv[0], argv[1]
PCT = int(argv[2]) if len(argv) > 2 else 60
AMOSTRAS = int(argv[3]) if len(argv) > 3 else 24
F_INI = int(argv[4]) if len(argv) > 4 else 1
F_FIM = int(argv[5]) if len(argv) > 5 else 240
IMPACTO = 60
random.seed(7)

# ---------- cena limpa ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
cena = bpy.context.scene
cena.frame_start, cena.frame_end = 1, 240
cena.render.fps = 30
cena.render.resolution_x, cena.render.resolution_y, cena.render.resolution_percentage = 1080, 1920, PCT
cena.render.engine = 'CYCLES'
cena.cycles.device = 'CPU'
cena.cycles.samples = AMOSTRAS
cena.cycles.use_denoising = True
cena.cycles.denoiser = 'OPENIMAGEDENOISE'
cena.cycles.max_bounces = 4
cena.cycles.transparent_max_bounces = 8
cena.render.use_persistent_data = True
cena.view_settings.view_transform = 'AgX'
cena.view_settings.look = 'AgX - Punchy'
cena.render.image_settings.file_format = 'PNG'
cena.render.filepath = SAIDA.rstrip('/') + '/f_'
cena.gravity = (0, 0, 0)

def img(nome, cor=True):
    i = bpy.data.images.load(TEX + '/' + nome)
    if not cor: i.colorspace_settings.name = 'Non-Color'
    return i

def mat_novo(nome):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    n = m.node_tree.nodes; n.clear()
    return m, n, m.node_tree.links

# ---------- direção do impacto (de frente para a câmera, em cima à esquerda) ----------
D = Vector((-0.42, -0.80, 0.42)).normalized()
CAP = 0.36  # raio angular (rad) da região que se quebra

# ---------- mundo: estrelas procedurais ----------
mundo = bpy.data.worlds.new('Mundo'); cena.world = mundo; mundo.use_nodes = True
wn, wl = mundo.node_tree.nodes, mundo.node_tree.links; wn.clear()
co = wn.new('ShaderNodeTexCoord'); vo = wn.new('ShaderNodeTexVoronoi'); vo.inputs['Scale'].default_value = 420
rp = wn.new('ShaderNodeValToRGB'); rp.color_ramp.elements[0].position = 0.0; rp.color_ramp.elements[0].color = (1, 1, 1, 1)
rp.color_ramp.elements[1].position = 0.035; rp.color_ramp.elements[1].color = (0, 0, 0, 1)
ns = wn.new('ShaderNodeTexNoise'); ns.inputs['Scale'].default_value = 60
mx = wn.new('ShaderNodeMath'); mx.operation = 'MULTIPLY'
bg = wn.new('ShaderNodeBackground'); bg.inputs['Strength'].default_value = 1.4
out = wn.new('ShaderNodeOutputWorld')
wl.new(co.outputs['Generated'], vo.inputs['Vector']); wl.new(vo.outputs['Distance'], rp.inputs['Fac'])
wl.new(co.outputs['Generated'], ns.inputs['Vector'])
wl.new(rp.outputs['Color'], mx.inputs[0]); wl.new(ns.outputs['Fac'], mx.inputs[1])
wl.new(mx.outputs['Value'], bg.inputs['Color']); wl.new(bg.outputs['Background'], out.inputs['Surface'])

# ---------- grupo da Terra (gira devagar) ----------
bpy.ops.object.empty_add(location=(0, 0, 0)); terra_grupo = bpy.context.object; terra_grupo.name = 'TerraGrupo'
ROT0 = -1.9
terra_grupo.rotation_euler = (0.0, 0.0, ROT0); terra_grupo.keyframe_insert('rotation_euler', frame=1)
terra_grupo.rotation_euler = (0.0, 0.0, ROT0 + 0.10); terra_grupo.keyframe_insert('rotation_euler', frame=240)
for fc in terra_grupo.animation_data.action.fcurves:
    for k in fc.keyframe_points: k.interpolation = 'LINEAR'
def rot_em(f):
    return Matrix.Rotation(ROT0 + 0.10 * (f - 1) / 239, 4, 'Z')
D_LOCAL = (rot_em(IMPACTO).inverted().to_3x3() @ D).normalized()

# ---------- material da Terra com rachaduras de lava ----------
m_terra, n, l = mat_novo('Terra')
tc = n.new('ShaderNodeTexCoord')
dia = n.new('ShaderNodeTexImage'); dia.image = img('terra_dia.jpg')
nor_i = n.new('ShaderNodeTexImage'); nor_i.image = img('terra_normal.jpg', False)
spec = n.new('ShaderNodeTexImage'); spec.image = img('terra_spec.jpg', False)
nmap = n.new('ShaderNodeNormalMap'); nmap.inputs['Strength'].default_value = 0.6
inv = n.new('ShaderNodeInvert')
bsdf = n.new('ShaderNodeBsdfPrincipled')
l.new(tc.outputs['UV'], dia.inputs['Vector']); l.new(tc.outputs['UV'], nor_i.inputs['Vector']); l.new(tc.outputs['UV'], spec.inputs['Vector'])
l.new(nor_i.outputs['Color'], nmap.inputs['Color']); l.new(nmap.outputs['Normal'], bsdf.inputs['Normal'])
l.new(spec.outputs['Color'], inv.inputs['Color']); l.new(inv.outputs['Color'], bsdf.inputs['Roughness'])
# máscara angular: 1 perto do impacto, crescendo com o tempo (valor "alcance" animado)
dotn = n.new('ShaderNodeVectorMath'); dotn.operation = 'DOT_PRODUCT'; dotn.inputs[1].default_value = D_LOCAL
norm = n.new('ShaderNodeVectorMath'); norm.operation = 'NORMALIZE'
l.new(tc.outputs['Object'], norm.inputs[0]); l.new(norm.outputs['Vector'], dotn.inputs[0])
acos_ = n.new('ShaderNodeMath'); acos_.operation = 'ARCCOSINE'; l.new(dotn.outputs['Value'], acos_.inputs[0])
alcance = n.new('ShaderNodeValue'); alcance.name = 'alcance'; alcance.outputs[0].default_value = 0.0
sub = n.new('ShaderNodeMath'); sub.operation = 'SUBTRACT'; l.new(alcance.outputs[0], sub.inputs[0]); l.new(acos_.outputs[0], sub.inputs[1])
frente = n.new('ShaderNodeMapRange'); frente.inputs['From Min'].default_value = 0.0; frente.inputs['From Max'].default_value = 0.25
l.new(sub.outputs[0], frente.inputs['Value'])
# rede de rachaduras: Voronoi "distância até a borda" com distorção de ruído
ruido = n.new('ShaderNodeTexNoise'); ruido.inputs['Scale'].default_value = 3.0; ruido.inputs['Detail'].default_value = 4
mixv = n.new('ShaderNodeMix'); mixv.data_type = 'VECTOR'; mixv.inputs['Factor'].default_value = 0.25
l.new(tc.outputs['Object'], mixv.inputs[4]); l.new(ruido.outputs['Color'], mixv.inputs[5]); l.new(tc.outputs['Object'], ruido.inputs['Vector'])
vor = n.new('ShaderNodeTexVoronoi'); vor.feature = 'DISTANCE_TO_EDGE'; vor.inputs['Scale'].default_value = 5.5
vor2 = n.new('ShaderNodeTexVoronoi'); vor2.feature = 'DISTANCE_TO_EDGE'; vor2.inputs['Scale'].default_value = 16
l.new(mixv.outputs[1], vor.inputs['Vector']); l.new(mixv.outputs[1], vor2.inputs['Vector'])
r1 = n.new('ShaderNodeMapRange'); r1.inputs['From Min'].default_value = 0.035; r1.inputs['From Max'].default_value = 0.0
r2 = n.new('ShaderNodeMapRange'); r2.inputs['From Min'].default_value = 0.022; r2.inputs['From Max'].default_value = 0.0
l.new(vor.outputs['Distance'], r1.inputs['Value']); l.new(vor2.outputs['Distance'], r2.inputs['Value'])
perto = n.new('ShaderNodeMapRange'); perto.inputs['From Min'].default_value = 0.9; perto.inputs['From Max'].default_value = 0.2
l.new(acos_.outputs[0], perto.inputs['Value'])
fina = n.new('ShaderNodeMath'); fina.operation = 'MULTIPLY'; l.new(r2.outputs[0], fina.inputs[0]); l.new(perto.outputs[0], fina.inputs[1])
rede = n.new('ShaderNodeMath'); rede.operation = 'MAXIMUM'; l.new(r1.outputs[0], rede.inputs[0]); l.new(fina.outputs[0], rede.inputs[1])
lava = n.new('ShaderNodeMath'); lava.operation = 'MULTIPLY'; l.new(rede.outputs[0], lava.inputs[0]); l.new(frente.outputs[0], lava.inputs[1])
corlava = n.new('ShaderNodeValToRGB'); e = corlava.color_ramp.elements
e[0].position, e[0].color = 0.0, (0.9, 0.12, 0.01, 1); e[1].position, e[1].color = 1.0, (1.0, 0.75, 0.3, 1)
l.new(lava.outputs[0], corlava.inputs['Fac'])
forca = n.new('ShaderNodeMath'); forca.operation = 'MULTIPLY'; forca.inputs[1].default_value = 14.0; l.new(lava.outputs[0], forca.inputs[0])
# chamuscado perto do impacto
queima_v = n.new('ShaderNodeValue'); queima_v.name = 'queima'; queima_v.outputs[0].default_value = 0.0
qm = n.new('ShaderNodeMapRange'); qm.inputs['From Min'].default_value = 0.8; qm.inputs['From Max'].default_value = 0.25; l.new(acos_.outputs[0], qm.inputs['Value'])
qq = n.new('ShaderNodeMath'); qq.operation = 'MULTIPLY'; l.new(qm.outputs[0], qq.inputs[0]); l.new(queima_v.outputs[0], qq.inputs[1])
mixc = n.new('ShaderNodeMix'); mixc.data_type = 'RGBA'; mixc.inputs[7].default_value = (0.06, 0.035, 0.025, 1)
l.new(qq.outputs[0], mixc.inputs['Factor']); l.new(dia.outputs['Color'], mixc.inputs[6]); l.new(mixc.outputs[2], bsdf.inputs['Base Color'])
l.new(corlava.outputs['Color'], bsdf.inputs['Emission Color']); l.new(forca.outputs[0], bsdf.inputs['Emission Strength'])
saida = n.new('ShaderNodeOutputMaterial'); l.new(bsdf.outputs['BSDF'], saida.inputs['Surface'])
def anima_valor(no, chaves):
    for f, v in chaves:
        no.outputs[0].default_value = v; no.outputs[0].keyframe_insert('default_value', frame=f)
anima_valor(alcance, [(1, 0.0), (IMPACTO + 3, 0.05), (IMPACTO + 60, 0.75), (240, 1.45)])
anima_valor(queima_v, [(1, 0.0), (IMPACTO, 0.0), (IMPACTO + 25, 1.0)])

# ---------- Terra: esfera com o "buraco" da região que vai quebrar ----------
bpy.ops.mesh.primitive_uv_sphere_add(segments=256, ring_count=128, radius=1.0)
terra = bpy.context.object; terra.name = 'Terra'; terra.parent = terra_grupo
bpy.ops.object.shade_smooth()
terra.data.materials.append(m_terra)
bm = bmesh.new(); bm.from_mesh(terra.data)
cap_faces = [f for f in bm.faces if f.calc_center_median().normalized().angle(D_LOCAL) < CAP]
# a casca da região vira um objeto à parte (com espessura), que depois é dividido em pedaços
bm_cap = bmesh.new()
cap_mesh = bpy.data.meshes.new('cap');
bmesh.ops.delete(bm, geom=cap_faces, context='FACES')
bm.to_mesh(terra.data); bm.free()
bpy.ops.mesh.primitive_uv_sphere_add(segments=256, ring_count=128, radius=1.0)
casca = bpy.context.object; casca.name = 'Casca'
bm2 = bmesh.new(); bm2.from_mesh(casca.data)
fora = [f for f in bm2.faces if f.calc_center_median().normalized().angle(D_LOCAL) >= CAP]
bmesh.ops.delete(bm2, geom=fora, context='FACES')
bm2.to_mesh(casca.data); bm2.free()
casca.data.materials.append(m_terra)
# material de rocha quente para o interior dos pedaços
m_rocha, n, l = mat_novo('RochaQuente')
b = n.new('ShaderNodeBsdfPrincipled'); b.inputs['Base Color'].default_value = (0.08, 0.05, 0.035, 1); b.inputs['Roughness'].default_value = 0.95
b.inputs['Emission Color'].default_value = (1.0, 0.3, 0.05, 1)
brasa = n.new('ShaderNodeValue'); brasa.name = 'brasa'
l.new(brasa.outputs[0], b.inputs['Emission Strength'])
o = n.new('ShaderNodeOutputMaterial'); l.new(b.outputs['BSDF'], o.inputs['Surface'])
anima_valor(brasa, [(1, 3.0), (IMPACTO + 30, 3.0), (IMPACTO + 120, 0.6)])
casca.data.materials.append(m_rocha)

# ---------- divide a casca em pedaços (Voronoi: cortes radiais entre sementes) ----------
t1 = D_LOCAL.cross(Vector((0, 0, 1))).normalized(); t2 = D_LOCAL.cross(t1).normalized()
sementes = []
while len(sementes) < 34:
    a = random.uniform(0, 2 * math.pi); r = CAP * math.sqrt(random.random()) * 1.05
    p = (D_LOCAL * math.cos(r) + (t1 * math.cos(a) + t2 * math.sin(a)) * math.sin(r)).normalized()
    if all(p.angle(q) > 0.05 for q in sementes): sementes.append(p)
pedacos = []
for i, s in enumerate(sementes):
    bmc = bmesh.new(); bmc.from_mesh(casca.data)
    viz = sorted(sementes, key=lambda q: (q - s).length)[1:12]
    for q in viz:
        mid = (s + q) / 2; nrm = (q - s).normalized()
        g = bmc.verts[:] + bmc.edges[:] + bmc.faces[:]
        bmesh.ops.bisect_plane(bmc, geom=g, plane_co=mid, plane_no=nrm, clear_outer=True)
    if len(bmc.faces) == 0: bmc.free(); continue
    # espessura: extruda para dentro (a parte de dentro fica com o material de rocha quente)
    ext = bmesh.ops.extrude_face_region(bmc, geom=bmc.faces[:])
    novos_v = [v for v in ext['geom'] if isinstance(v, bmesh.types.BMVert)]
    esp = random.uniform(0.05, 0.09)
    for v in novos_v: v.co = v.co * (1 - esp)
    for f in bmc.faces:
        if any(v in novos_v for v in f.verts): f.material_index = 1
    bmesh.ops.recalc_face_normals(bmc, faces=bmc.faces[:])
    me = bpy.data.meshes.new(f'pedaco{i}'); bmc.to_mesh(me); bmc.free()
    ob = bpy.data.objects.new(f'Pedaco{i}', me); cena.collection.objects.link(ob)
    ob.data.materials.append(m_terra); ob.data.materials.append(m_rocha)
    # origem no centro do pedaço
    cen = sum((v.co for v in me.vertices), Vector()) / len(me.vertices)
    me.transform(Matrix.Translation(-cen)); ob.location = cen; ob.parent = terra_grupo
    for p in me.polygons: p.use_smooth = True
    pedacos.append((ob, cen, s))
bpy.data.objects.remove(casca)

# animação dos pedaços: saem do centro para fora, com rotação e inércia (desaceleram devagar)
for ob, cen, s in pedacos:
    ang = s.angle(D_LOCAL)
    ini = IMPACTO + 2 + int(ang / CAP * 26) + random.randint(0, 8)
    dirn = (cen.normalized() * 1.0 + (cen.normalized() - D_LOCAL) * random.uniform(1.0, 2.5)).normalized()
    vel = random.uniform(0.012, 0.03) * (1.4 - ang / CAP * 0.6)
    eixo = Vector((random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1))).normalized()
    giro = random.uniform(0.03, 0.1)
    ob.rotation_mode = 'QUATERNION'
    ob.location = cen; ob.rotation_quaternion = Quaternion((1, 0, 0, 0))
    ob.keyframe_insert('location', frame=1); ob.keyframe_insert('rotation_quaternion', frame=1)
    ob.keyframe_insert('location', frame=ini); ob.keyframe_insert('rotation_quaternion', frame=ini)
    for f in range(ini + 4, 245, 6):
        t = f - ini; d = vel * (t - t * t / 900.0) if t < 450 else vel * 225
        ob.location = cen + dirn * d
        ob.rotation_quaternion = Quaternion(eixo, giro * t)
        ob.keyframe_insert('location', frame=f); ob.keyframe_insert('rotation_quaternion', frame=f)

# ---------- núcleo de lava por baixo da casca ----------
m_lava, n, l = mat_novo('Lava')
tc = n.new('ShaderNodeTexCoord'); nz = n.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 9; nz.inputs['Detail'].default_value = 8
cr = n.new('ShaderNodeValToRGB'); e = cr.color_ramp.elements
e[0].position, e[0].color = 0.35, (0.25, 0.02, 0.0, 1); e[1].position, e[1].color = 0.7, (1.0, 0.55, 0.12, 1)
em = n.new('ShaderNodeEmission'); em.inputs['Strength'].default_value = 9
o = n.new('ShaderNodeOutputMaterial')
l.new(tc.outputs['Object'], nz.inputs['Vector']); l.new(nz.outputs['Fac'], cr.inputs['Fac']); l.new(cr.outputs['Color'], em.inputs['Color']); l.new(em.outputs['Emission'], o.inputs['Surface'])
bpy.ops.mesh.primitive_uv_sphere_add(segments=96, ring_count=48, radius=0.93)
nucleo = bpy.context.object; nucleo.name = 'Nucleo'; nucleo.parent = terra_grupo; nucleo.data.materials.append(m_lava)

# ---------- nuvens e atmosfera ----------
m_nuv, n, l = mat_novo('Nuvens')
tc = n.new('ShaderNodeTexCoord'); al = n.new('ShaderNodeTexImage'); al.image = img('nuvens_alpha.jpg', False)
pb = n.new('ShaderNodeBsdfPrincipled'); pb.inputs['Base Color'].default_value = (1, 1, 1, 1); pb.inputs['Roughness'].default_value = 1
mul = n.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = 0.85
# as nuvens somem em volta do impacto
dn = n.new('ShaderNodeVectorMath'); dn.operation = 'DOT_PRODUCT'; dn.inputs[1].default_value = D_LOCAL
nn = n.new('ShaderNodeVectorMath'); nn.operation = 'NORMALIZE'; l.new(tc.outputs['Object'], nn.inputs[0]); l.new(nn.outputs['Vector'], dn.inputs[0])
furo = n.new('ShaderNodeMapRange'); furo.inputs['From Min'].default_value = math.cos(CAP * 1.6); furo.inputs['From Max'].default_value = math.cos(CAP * 0.9)
furo.inputs['To Min'].default_value = 1.0; furo.inputs['To Max'].default_value = 0.0
l.new(dn.outputs['Value'], furo.inputs['Value'])
fv = n.new('ShaderNodeValue'); fv.name = 'furo'
mixf = n.new('ShaderNodeMix'); mixf.data_type = 'FLOAT'; l.new(fv.outputs[0], mixf.inputs['Factor']); mixf.inputs[2].default_value = 1.0; l.new(furo.outputs['Result'], mixf.inputs[3])
mul2 = n.new('ShaderNodeMath'); mul2.operation = 'MULTIPLY'
l.new(tc.outputs['UV'], al.inputs['Vector']); l.new(al.outputs['Color'], mul.inputs[0]); l.new(mul.outputs[0], mul2.inputs[0]); l.new(mixf.outputs[0], mul2.inputs[1])
l.new(mul2.outputs[0], pb.inputs['Alpha'])
o = n.new('ShaderNodeOutputMaterial'); l.new(pb.outputs['BSDF'], o.inputs['Surface'])
anima_valor(fv, [(1, 0.0), (IMPACTO, 0.0), (IMPACTO + 8, 1.0)])
bpy.ops.mesh.primitive_uv_sphere_add(segments=128, ring_count=64, radius=1.012)
nuv = bpy.context.object; nuv.parent = terra_grupo; nuv.data.materials.append(m_nuv); bpy.ops.object.shade_smooth()

m_atm, n, l = mat_novo('Atmosfera')
lw = n.new('ShaderNodeLayerWeight'); lw.inputs['Blend'].default_value = 0.35
pw = n.new('ShaderNodeMath'); pw.operation = 'POWER'; pw.inputs[1].default_value = 2.2; l.new(lw.outputs['Facing'], pw.inputs[0])
em = n.new('ShaderNodeEmission'); em.inputs['Color'].default_value = (0.25, 0.55, 1.0, 1)
ms = n.new('ShaderNodeMath'); ms.operation = 'MULTIPLY'; ms.inputs[1].default_value = 3.0; l.new(pw.outputs[0], ms.inputs[0]); l.new(ms.outputs[0], em.inputs['Strength'])
tr = n.new('ShaderNodeBsdfTransparent'); ad = n.new('ShaderNodeAddShader')
l.new(tr.outputs[0], ad.inputs[0]); l.new(em.outputs[0], ad.inputs[1])
o = n.new('ShaderNodeOutputMaterial'); l.new(ad.outputs[0], o.inputs['Surface'])
bpy.ops.mesh.primitive_uv_sphere_add(segments=128, ring_count=64, radius=1.045)
atm = bpy.context.object; atm.data.materials.append(m_atm); bpy.ops.object.shade_smooth()

# ---------- luzes ----------
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(55), math.radians(-35), math.radians(-20)))
sol = bpy.context.object; sol.data.energy = 4.5; sol.data.angle = math.radians(1.5)
bpy.ops.object.light_add(type='POINT', location=D * 1.25)
brilho = bpy.context.object; brilho.data.color = (1.0, 0.45, 0.12); brilho.data.shadow_soft_size = 0.3
for f, v in [(1, 0), (IMPACTO - 1, 0), (IMPACTO, 700), (IMPACTO + 8, 90), (IMPACTO + 40, 22), (240, 14)]:
    brilho.data.energy = v; brilho.data.keyframe_insert('energy', frame=f)

# ---------- asteroide com rastro de fogo ----------
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=0.07)
ast = bpy.context.object; ast.name = 'Asteroide'
dsp = ast.modifiers.new('d', 'DISPLACE'); tx = bpy.data.textures.new('rocha', 'CLOUDS'); tx.noise_scale = 0.04; dsp.texture = tx; dsp.strength = 0.03
m_ast, n, l = mat_novo('Asteroide')
b = n.new('ShaderNodeBsdfPrincipled'); b.inputs['Base Color'].default_value = (0.12, 0.09, 0.07, 1); b.inputs['Roughness'].default_value = 1
b.inputs['Emission Color'].default_value = (1.0, 0.35, 0.05, 1); b.inputs['Emission Strength'].default_value = 1.5
o = n.new('ShaderNodeOutputMaterial'); l.new(b.outputs['BSDF'], o.inputs['Surface']); ast.data.materials.append(m_ast)
INI_AST = Vector((-0.85, -1.7, 1.75))
for f in range(1, IMPACTO + 1, 3):
    k = ((f - 1) / (IMPACTO - 1)) ** 1.6
    ast.location = INI_AST.lerp(D * 1.0, k); ast.rotation_euler = (f * 0.11, f * 0.07, 0)
    ast.keyframe_insert('location', frame=f); ast.keyframe_insert('rotation_euler', frame=f)
ast.location = D * 1.0; ast.keyframe_insert('location', frame=IMPACTO)
ast.hide_render = False; ast.keyframe_insert('hide_render', frame=IMPACTO - 1)
ast.hide_render = True; ast.keyframe_insert('hide_render', frame=IMPACTO)

# partículas: fagulhas do rastro (instâncias que esfriam com a idade)
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.0, location=(0, 0, -50))
fag = bpy.context.object; fag.name = 'Fagulha'
m_fag, n, l = mat_novo('Fagulha')
pi_ = n.new('ShaderNodeParticleInfo'); dv = n.new('ShaderNodeMath'); dv.operation = 'DIVIDE'
l.new(pi_.outputs['Age'], dv.inputs[0]); l.new(pi_.outputs['Lifetime'], dv.inputs[1])
cr = n.new('ShaderNodeValToRGB'); e = cr.color_ramp.elements
e[0].position, e[0].color = 0.0, (1.0, 0.85, 0.5, 1); e[1].position, e[1].color = 1.0, (0.6, 0.06, 0.0, 1)
l.new(dv.outputs[0], cr.inputs['Fac'])
inv2 = n.new('ShaderNodeMath'); inv2.operation = 'SUBTRACT'; inv2.inputs[0].default_value = 1.0; l.new(dv.outputs[0], inv2.inputs[1])
st = n.new('ShaderNodeMath'); st.operation = 'MULTIPLY'; st.inputs[1].default_value = 30.0; l.new(inv2.outputs[0], st.inputs[0])
em = n.new('ShaderNodeEmission'); l.new(cr.outputs['Color'], em.inputs['Color']); l.new(st.outputs[0], em.inputs['Strength'])
o = n.new('ShaderNodeOutputMaterial'); l.new(em.outputs[0], o.inputs['Surface']); fag.data.materials.append(m_fag)

def particulas(emissor, nome, qtd, ini, fim, vida, vel_n, vel_r, tam, tam_r, inst):
    ps = emissor.modifiers.new(nome, 'PARTICLE_SYSTEM').particle_system.settings
    ps.count, ps.frame_start, ps.frame_end, ps.lifetime, ps.lifetime_random = qtd, ini, fim, vida, 0.4
    ps.normal_factor, ps.factor_random = vel_n, vel_r
    ps.effector_weights.gravity = 0.0
    ps.render_type, ps.instance_object = 'OBJECT', inst
    ps.particle_size, ps.size_random = tam, tam_r
    ps.use_rotations, ps.rotation_mode, ps.use_dynamic_rotation = True, 'NONE', True
    ps.angular_velocity_mode, ps.angular_velocity_factor = 'RAND', 3.0
    emissor.show_instancer_for_render = False
    return ps
particulas(ast, 'rastro', 900, 1, IMPACTO - 1, 14, 0.0, 0.08, 0.012, 0.6, fag)

# ---------- impacto: ejeção, poeira, flash e anel ----------
bpy.ops.mesh.primitive_circle_add(vertices=24, radius=0.12, fill_type='NGON', location=D_LOCAL * 1.0)
disco = bpy.context.object; disco.name = 'EmissorImpacto'; disco.parent = terra_grupo
disco.rotation_mode = 'QUATERNION'; disco.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(D_LOCAL)
p1 = particulas(disco, 'ejecao', 700, IMPACTO, IMPACTO + 14, 90, 1.8, 1.4, 0.008, 0.8, fag)
p1.lifetime_random = 0.6
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.0, location=(0, 0, -60))
grao = bpy.context.object; grao.name = 'Poeira'
m_po, n, l = mat_novo('Poeira')
b = n.new('ShaderNodeBsdfPrincipled'); b.inputs['Base Color'].default_value = (0.35, 0.22, 0.14, 1); b.inputs['Roughness'].default_value = 1
b.inputs['Emission Color'].default_value = (1.0, 0.4, 0.1, 1); b.inputs['Emission Strength'].default_value = 0.4
o = n.new('ShaderNodeOutputMaterial'); l.new(b.outputs['BSDF'], o.inputs['Surface']); grao.data.materials.append(m_po)
p2 = particulas(disco, 'poeira', 1600, IMPACTO + 2, IMPACTO + 70, 200, 0.55, 0.5, 0.007, 0.9, grao)

m_fl, n, l = mat_novo('Flash')
em = n.new('ShaderNodeEmission'); em.inputs['Color'].default_value = (1.0, 0.85, 0.6, 1); em.name = 'em'
tr = n.new('ShaderNodeBsdfTransparent'); mxs = n.new('ShaderNodeMixShader'); mxs.inputs['Fac'].default_value = 1.0
l.new(tr.outputs[0], mxs.inputs[1]); l.new(em.outputs[0], mxs.inputs[2])
o = n.new('ShaderNodeOutputMaterial'); l.new(mxs.outputs[0], o.inputs['Surface'])
for f, v in [(1, 0), (IMPACTO - 1, 0), (IMPACTO, 40), (IMPACTO + 5, 6), (IMPACTO + 14, 0)]:
    em.inputs['Strength'].default_value = v; em.inputs['Strength'].keyframe_insert('default_value', frame=f)
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1.0, location=D * 1.02)
flash = bpy.context.object; flash.data.materials.append(m_fl)
for f, h in [(1, True), (IMPACTO - 1, True), (IMPACTO, False), (IMPACTO + 15, True)]:
    flash.hide_render = h; flash.keyframe_insert('hide_render', frame=f)
for f, s in [(1, 0.001), (IMPACTO - 1, 0.001), (IMPACTO, 0.05), (IMPACTO + 4, 0.16), (IMPACTO + 20, 0.22)]:
    flash.scale = (s, s, s); flash.keyframe_insert('scale', frame=f)

m_anel, n, l = mat_novo('Anel')
em = n.new('ShaderNodeEmission'); em.inputs['Color'].default_value = (1.0, 0.8, 0.55, 1)
for f, v in [(1, 0), (IMPACTO, 0), (IMPACTO + 1, 25), (IMPACTO + 40, 0)]:
    em.inputs['Strength'].default_value = v; em.inputs['Strength'].keyframe_insert('default_value', frame=f)
o = n.new('ShaderNodeOutputMaterial'); l.new(em.outputs[0], o.inputs['Surface'])
bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.012, major_segments=128, minor_segments=8, location=D * 1.01)
anel = bpy.context.object; anel.data.materials.append(m_anel)
for f, h in [(1, True), (IMPACTO, True), (IMPACTO + 1, False), (IMPACTO + 40, True)]:
    anel.hide_render = h; anel.keyframe_insert('hide_render', frame=f)
anel.rotation_mode = 'QUATERNION'; anel.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(D)
for f, s in [(1, 0.001), (IMPACTO, 0.001), (IMPACTO + 1, 0.05), (IMPACTO + 40, 0.75)]:
    anel.scale = (s, s, s); anel.keyframe_insert('scale', frame=f)

# ---------- câmera: tremida no impacto e recuo no fim ----------
bpy.ops.object.camera_add()
cam = bpy.context.object; cena.camera = cam; cam.data.lens = 50; cam.data.sensor_fit = 'VERTICAL'; cam.data.sensor_height = 24 * 1.45
cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 8.0
alvo = bpy.data.objects.new('Alvo', None); cena.collection.objects.link(alvo)
cam.data.dof.focus_object = alvo
tt = cam.constraints.new('TRACK_TO'); tt.target = alvo; tt.track_axis = 'TRACK_NEGATIVE_Z'; tt.up_axis = 'UP_Y'
def dist(f):
    if f <= IMPACTO: return 6.3 - 0.5 * (f - 1) / (IMPACTO - 1)
    if f <= 90: return 5.8
    k = (f - 90) / 150; k = k * k * (3 - 2 * k); return 5.8 + 1.9 * k
for f in range(1, 241, 2):
    tremor = max(0.0, 1 - abs(f - IMPACTO - 3) / 20) * 0.08
    cam.location = Vector((random.uniform(-1, 1) * tremor, -dist(f), 0.25 + random.uniform(-1, 1) * tremor))
    cam.keyframe_insert('location', frame=f)
cena.render.use_motion_blur = True; cena.render.motion_blur_shutter = 0.4

# ---------- compositor: brilho (glare) e vinheta ----------
cena.use_nodes = True
cn = cena.node_tree.nodes; cl_ = cena.node_tree.links; cn.clear()
rl = cn.new('CompositorNodeRLayers')
gl = cn.new('CompositorNodeGlare'); gl.glare_type = 'FOG_GLOW'; gl.quality = 'HIGH'; gl.threshold = 0.85; gl.size = 8; gl.mix = 0.0
el = cn.new('CompositorNodeEllipseMask'); el.width, el.height = 0.95, 0.7
bl = cn.new('CompositorNodeBlur'); bl.size_x = bl.size_y = 200; bl.filter_type = 'GAUSS'
mxv = cn.new('CompositorNodeMixRGB'); mxv.blend_type = 'MIX'; mxv.inputs[1].default_value = (0, 0, 0, 1)
mapv = cn.new('CompositorNodeMapRange'); mapv.inputs['To Min'].default_value = 0.35
comp = cn.new('CompositorNodeComposite')
cl_.new(rl.outputs['Image'], gl.inputs['Image']); cl_.new(el.outputs['Mask'], bl.inputs['Image']); cl_.new(bl.outputs['Image'], mapv.inputs['Value'])
cl_.new(mapv.outputs['Value'], mxv.inputs['Fac']); cl_.new(gl.outputs['Image'], mxv.inputs[2])
cl_.new(mxv.outputs['Image'], comp.inputs['Image'])

cena.frame_start, cena.frame_end = F_INI, F_FIM
bpy.ops.wm.save_as_mainfile(filepath=SAIDA.rstrip('/') + '/cena.blend')
bpy.ops.render.render(animation=True)
