import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 44.8          # versão curta e rápida (narração de ~43 s a +25%)
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_buraco_terra.mp4"
CREDITO = "Textura da Terra: NASA Blue Marble · lava: Pixabay/Gylfi"
# animações 3D de pipeline/anim/buraco3d.html (node render_3d.js <jobs> buraco3d.html)
def A(anc, nome, z=(1.0, 1.05), **k):
    return C(anc, f"b3_{nome}.mp4", 0, "anim", zoom=z, **k)
CENAS = montar(AQUI, [
    A("", "intro"),
    A("primeiro voce despenca", "pov_inicio"),
    A("a cada segundo", "pov_acelera", texto="CADA VEZ MAIS RÁPIDO"),
    A("mas olha que estranho", "flutua_a"),
    A("sem peso nenhum", "flutua_b", texto="SEM PESO"),
    A("la embaixo", "pov_quente", texto="+5.000 °C"),
    C("tao quente quanto", "pb_lava.mp4", 4, "real", zoom=(1.15, 1.3), pan=(0.5, 0.65), texto="= SUPERFÍCIE DO SOL"),
    A("e a pressao", "nucleo", texto="3 MILHÕES × A PRESSÃO"),
    A("mas digamos", "flutua_quente"),
    A("no centro da terra", "pov_centro", texto="~29.000 KM/H"),
    A("depois a gravidade", "volta"),
    A("voce freia", "freia"),
    A("trinta e oito", "lado38", texto="38 MINUTOS"),
    A("e se ninguem", "cai"),
    A("vai e volta", "vaivem", texto="PARA SEMPRE"),
    A("na vida real", "amortece", texto="O AR TE FREIA"),
    A("e como a terra gira", "polo", texto="A TERRA GIRA"),
    A("a nao ser", "eixo", texto="SÓ DE POLO A POLO"),
    A("segue o perfil", "final", texto="SIGA O PERFIL"),
])
