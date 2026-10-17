import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 44.6
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_bootes.mp4"
CREDITO = "ESA/Hubble · NASA Goddard (OpenUniverse) · Pixabay"
VZ = "an_l_vazio.mp4"          # espuma cósmica com o vazio (animação própria)
VE = "an_l_vazio_escala.mp4"   # com a Via Láctea em escala
OU = "sv_openuniverse.mp4"
CENAS = montar(AQUI, [
    C("", VZ, 0, "anim", zoom=(1.0, 1.0), texto="300 MILHÕES DE ANOS-LUZ"),
    C("e quase nada dentro", VZ, 3.5, "anim", zoom=(1.0, 1.05), texto="QUASE VAZIO"),
    C("ele fica na direcao", "pb_ceu_estrelas.mp4", 3, "real", zoom=(1.0, 1.15), texto="CONSTELAÇÃO DO BOIEIRO"),
    C("por isso o nome", "pb_estrelas_tl.mp4", 2, "real", zoom=(1.0, 1.15), texto="VAZIO DE BOÖTES"),
    C("para comparar", "hb_zoom_galaxias.mp4", 45, "real", zoom=(1.0, 1.15), pan=(0.06, 0.5), texto="VIA LÁCTEA: 100 MIL ANOS-LUZ"),
    C("caberiam mais de", VE, 1, "anim", zoom=(1.0, 1.0), texto="+3.000 VIAS LÁCTEAS"),
    C("numa regiao desse tamanho", OU, 36, "sim", zoom=(1.0, 1.15), texto="DEVERIA TER MILHARES"),
    C("os astronomos encontraram", VZ, 4.5, "anim", zoom=(1.05, 1.1), texto="SÓ ~60 GALÁXIAS"),
    C("ele foi descoberto", "pb_via_lactea_v.mp4", 6, "real", zoom=(1.0, 1.15), texto="1981"),
    C("e ate hoje", VE, 4, "anim", zoom=(1.0, 1.05)),
    C("mas ele nao e", OU, 30, "sim", zoom=(1.0, 1.15)),
    C("o universo e como", VZ, 1, "anim", zoom=(1.3, 1.5), texto="UMA ESPUMA CÓSMICA"),
    C("e entre eles", VZ, 4.5, "anim", zoom=(1.2, 1.35)),
    C("bootes provavelmente", OU, 38, "sim", zoom=(1.1, 1.3), texto="FUSÃO DE VAZIOS MENORES"),
    C("agora imagine", "hb_zoom_galaxias.mp4", 40, "real", zoom=(1.0, 1.2), pan=(0.06, 0.5)),
    C("sem nenhuma vizinha", "hb_zoom_galaxias.mp4", 44, "real", zoom=(1.25, 1.0), pan=(0.06, 0.5), texto="SOZINHA NO ESCURO"),
])
