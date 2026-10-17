import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 46.2
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_dyson.mp4"
CREDITO = "ESO/M. Kornmesser · ESA/Hubble · NASA Goddard · Pixabay"
DY = "an_l_dyson.mp4"            # enxame de Dyson (animação própria)
OU = "sv_openuniverse.mp4"       # campo de galáxias (NASA OpenUniverse)
CENAS = montar(AQUI, [
    C("", "pb_via_lactea_v.mp4", 2, "real", zoom=(1.0, 1.15), texto="5.000.000 DE ESTRELAS"),
    C("e sete delas", DY, 0, "ilus", zoom=(1.0, 1.0), texto="7 BRILHAVAM DEMAIS"),
    C("a ideia e antiga", "pb_ceu_estrelas.mp4", 4, "real", zoom=(1.0, 1.1)),
    C("o fisico freeman", "pb_estrelas_tl.mp4", 3, "real", zoom=(1.0, 1.1), texto="FREEMAN DYSON · 1960"),
    C("uma civilizacao muito", "pb_circuito_tunel.mp4", 3, "anim", zoom=(1.0, 1.1)),
    C("entao construiria", DY, 1.5, "ilus", zoom=(1.0, 1.1), texto="HIPÓTESE: ESFERA DE DYSON"),
    C("para captar a luz", DY, 3.5, "ilus", zoom=(1.1, 1.25)),
    C("essas estruturas", "es_eso1629d.mp4", 24, "ilus", zoom=(1.0, 1.15)),
    C("e brilhariam", DY, 2.5, "ilus", zoom=(1.2, 1.35), texto="INFRAVERMELHO"),
    C("o projeto hephaistos", OU, 30, "sim", zoom=(1.0, 1.15), texto="PROJETO HEPHAISTOS"),
    C("atras exatamente", "pb_binario.mp4", 8, "anim", zoom=(1.0, 1.1), texto="3 TELESCÓPIOS"),
    C("e encontrou sete", "es_eso1629e.mp4", 4, "ilus", zoom=(1.0, 1.15), texto="ANÃS VERMELHAS"),
    C("sete candidatas", DY, 4, "ilus", zoom=(1.0, 1.2), texto="7 CANDIDATAS"),
    C("pouco depois", "pb_ceu_estrelas.mp4", 12, "real", zoom=(1.0, 1.1)),
    C("galaxias distantes", "hb_zoom_gnz11.mp4", 26, "real", zoom=(1.0, 1.2), texto="GALÁXIAS DISTANTES"),
    C("bem atras dessas", "hb_zoom_gnz11.mp4", 29, "real", zoom=(1.2, 1.5)),
    C("entao por enquanto", "an_l_dyson_some.mp4", 0, "ilus", zoom=(1.0, 1.0), texto="NADA DE ALIENÍGENAS"),
    C("mas pela primeira vez", "pb_via_lactea_v.mp4", 14, "real", zoom=(1.0, 1.15)),
    C("e a proxima busca", OU, 36, "sim", zoom=(1.1, 1.3), texto="A PRÓXIMA SERÁ MAIOR"),
])
