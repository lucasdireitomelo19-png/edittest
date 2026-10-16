import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = ""
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_som_buraco_negro_61s.mp4"
CREDITO = "Imagens: NASA/CXC/SAO · NASA Goddard"
P = "fd_perseus.mp4"
CENAS = montar(AQUI, [
    C("", P, 9, "sim", punch=1),
    C("mas existe um buraco negro que canta", P, 17.7, "sim", zoom=(1.2, 1.5)),
    C("ele fica no centro do aglomerado", "fdi_perseus.jpg", tag="real", texto="AGLOMERADO DE PERSEU"),
    C("a cerca de duzentos", P, 88, "real", texto="240 MILHÕES DE ANOS-LUZ"),
    C("esse aglomerado e cheio", P, 100, "sim"),
    C("e o som precisa de um meio", P, 26.6, "sim"),
    C("em 2003 o telescopio", P, 120.3, "anim", vel=0.65, texto="CHANDRA · 2003"),
    C("viu ondulacoes nesse gas", "fdi_perseus.jpg", tag="real", zoom=(1.3, 1.8)),
    C("ondas sonoras de verdade", P, 66, "sim"),
    C("o problema a nota", P, 38, "sim", texto="57 OITAVAS ABAIXO DO DÓ"),
    C("grave demais", P, 0, "sim", zoom=(1.3, 1.6)),
    C("em 2022 a nasa", P, 53, "sim", texto="2022"),
    C("o resultado e um gemido", P, 75, "sim", shake=3),
    C("uma unica onda dessas", "fdi_perseus.jpg", tag="real", zoom=(2.0, 1.4), texto="MILHÕES DE ANOS"),
    C("ou seja esse buraco negro", P, 97, "real"),
    C("desde antes de existir", "ns_earth_spin.mp4", 10),
])
