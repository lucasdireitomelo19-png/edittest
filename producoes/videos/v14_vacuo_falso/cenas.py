import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 44.2
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_vacuo_falso.mp4"
CREDITO = "ESA/Hubble · NASA Goddard (OpenUniverse) · Pixabay"
GZ = "hb_zoom_galaxias.mp4"    # zoom real até NGC 1512 (ESA/Hubble)
OU = "sv_openuniverse.mp4"     # campo de galáxias (NASA OpenUniverse)
CENAS = montar(AQUI, [
    C("", OU, 38, "sim", zoom=(1.1, 1.25), texto="O UNIVERSO PODE ACABAR"),
    C("nenhum", "an_l_bolha.mp4", 0, "anim", zoom=(1.0, 1.0), texto="SEM AVISO"),
    C("tudo depende", "pb_particulas.mp4", 4, "anim", zoom=(1.0, 1.1)),
    C("o campo de higgs", "pb_particulas_acel.mp4", 2, "anim", zoom=(1.0, 1.1), texto="CAMPO DE HIGGS"),
    C("e ele que da massa", "pb_atomo.mp4", 3, "anim", zoom=(1.0, 1.15)),
    C("em 2012", "pb_particulas_acel.mp4", 9, "anim", vel=1.3, zoom=(1.1, 1.2), texto="LHC · 2012"),
    C("encontrou o boson", "pb_particulas.mp4", 12, "anim", zoom=(1.1, 1.25), texto="BÓSON DE HIGGS"),
    C("e com a massa", GZ, 42, "real", zoom=(1.0, 1.15), pan=(0.06, 0.5)),
    C("o nosso universo", OU, 33, "sim", zoom=(1.0, 1.15)),
    C("pode estar num", "an_l_degrau.mp4", 0, "anim", zoom=(1.0, 1.0), texto="HIPÓTESE"),
    C("se em algum ponto", "an_l_degrau_cai.mp4", 0, "anim", zoom=(1.0, 1.0)),
    C("surge uma bolha", "an_l_bolha_lenta.mp4", 0, "anim", zoom=(1.0, 1.0), texto="VÁCUO VERDADEIRO"),
    C("e essa bolha", "an_l_bolha_lenta.mp4", 1.6, "anim", zoom=(1.0, 1.1), texto="QUASE NA VELOCIDADE DA LUZ"),
    C("dentro dela", GZ, 46, "real", zoom=(1.2, 1.4), pan=(0.06, 0.5), pixel=(1, 60)),
    C("atomos", "pb_atomo.mp4", 8, "anim", zoom=(1.1, 1.3), pixel=(1, 50)),
    C("estrelas", "pb_estrelas_tl.mp4", 4, "real", zoom=(1.0, 1.2), pixel=(1, 60)),
    C("planetas", "sv_terra_girando.mp4", 30, "anim", zoom=(1.3, 1.5), pixel=(1, 70)),
    C("e como ela viaja", "an_l_bolha.mp4", 1.0, "anim", zoom=(1.0, 1.0)),
    C("nada nos avisaria", "an_l_bolha_lenta.mp4", 4, "anim", zoom=(1.0, 1.1), texto="NADA NOS AVISARIA"),
    C("a boa noticia", OU, 25, "sim", zoom=(1.0, 1.1), texto="MUITO ALÉM DA IDADE DO UNIVERSO"),
    C("a ma", "an_l_bolha_lenta.mp4", 6, "anim", zoom=(1.0, 1.15), texto="MAS NÃO É IMPOSSÍVEL"),
])
