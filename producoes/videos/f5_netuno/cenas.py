import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = ""
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_netuno_61s.mp4"
CREDITO = "Imagens: NASA/JPL (Voyager 2) · NASA/ESA (Hubble)"
N = "fd_neptune_cast.mp4"
CENAS = montar(AQUI, [
    C("", "fdi_neptune.jpg", tag="real", punch=1, zoom=(1.1, 1.3)),
    C("e ninguem sabe exatamente", N, 13, "anim"),
    C("netuno fica a quatro bilhoes", "fdi_neptune2.jpg", tag="real", zoom=(1.0, 1.3), texto="4,5 BILHÕES DE KM"),
    C("la a luz do sol chega", N, 26, "anim", texto="900× MAIS FRACA"),
    C("mesmo assim os ventos", "fdi_gds.jpg", tag="real", shake=6, zoom=(1.1, 1.4), texto="+2.000 KM/H"),
    C("netuno foi descoberto pela matematica", N, 52, "anim", texto="1846"),
    C("calcularam onde estaria", "fdi_neptune2.jpg", tag="real", zoom=(1.5, 1.2)),
    C("apontaram o telescopio", N, 58.5, "anim"),
    C("um ano la dura", "fdi_neptune.jpg", tag="real", zoom=(1.4, 1.8), texto="1 ANO = 165 ANOS"),
    C("so uma sonda chegou perto", N, 131, "real", texto="VOYAGER 2 · 1989"),
    C("ela fotografou uma tempestade", "fdi_gds.jpg", tag="real", zoom=(1.4, 1.9), texto="GRANDE MANCHA ESCURA"),
    C("anos depois o hubble", N, 123.5, "anim"),
    C("e a tempestade tinha sumido", N, 136, "real"),
    C("de onde vem tanta energia", N, 169, "real"),
    C("essa e uma pergunta", "fdi_neptune.jpg", tag="real", zoom=(1.6, 1.0)),
])
