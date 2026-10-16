import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = ""
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_pegadas_lua_61s.mp4"
CREDITO = "Imagens: NASA · NASA/GSFC/Arizona State University (LRO)"
M = "fd_moontour.mp4"
CENAS = montar(AQUI, [
    C("", "fdi_footprint.jpg", tag="real", punch=1, zoom=(1.1, 1.3)),
    C("e podem continuar", "fdi_footprint2.jpg", tag="real", zoom=(1.0, 1.2)),
    C("na terra o vento e a chuva", "hdi_earth.jpg", tag="real", zoom=(1.0, 1.2)),
    C("mas a lua nao tem atmosfera", M, 120, "sim"),
    C("nao tem vento", M, 150, "sim"),
    C("la o chao so e desgastado", M, 200, "sim"),
    C("tao lenta que apagar", "fdi_footprint.jpg", tag="real", zoom=(1.6, 2.0), texto="MILHÕES DE ANOS"),
    C("entre 1969 e 1972", "fdi_aldrin_walk.jpg", tag="real", texto="12 PESSOAS"),
    C("e os passos delas", "fdi_flag11.jpg", tag="real", zoom=(1.0, 1.3), pan=(0.4, 0.6)),
    C("a sonda lro da nasa", "fdi_lrrr15.jpg", tag="real", fit=1, texto="FOTO DA SONDA LRO"),
    C("da para ver ate as trilhas", "fdi_lrrr15.jpg", tag="real", zoom=(1.3, 1.8)),
    C("as bandeiras tambem continuam", "fdi_flag17.jpg", tag="real", zoom=(1.0, 1.2)),
    C("mas depois de decadas", "fdi_flag17.jpg", tag="real", sat=0.25, zoom=(1.2, 1.4), texto="DESBOTADAS"),
    C("desde os ultimos passos", M, 230, "sim", texto="DEZEMBRO DE 1972"),
    C("mas as pegadas continuam", "fdi_footprint.jpg", tag="real", zoom=(1.8, 1.0)),
])
