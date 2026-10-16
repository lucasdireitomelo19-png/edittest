import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = ""
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_venus_61s.mp4"
CREDITO = "Imagens: NASA · NASA/JPL (Magellan) · ESA/Hubble"
V = "fd_venus_hot.mp4"
CENAS = montar(AQUI, [
    C("", V, 55.5, "anim", punch=1, zoom=(1.1, 1.3)),
    C("e ele fica bem aqui do lado", "fdi_venus_hemi.jpg", tag="real", zoom=(1.0, 1.25)),
    C("e venus", V, 58, "anim"),
    C("ele leva duzentos e vinte e cinco dias", V, 52.8, "anim", texto="1 ANO = 225 DIAS"),
    C("mas leva duzentos e quarenta e tres", V, 56.5, "anim", zoom=(1.3, 1.6), texto="1 DIA = 243 DIAS"),
    C("e tem mais ele gira ao contrario", "fdi_venus_hemi.jpg", tag="real", zoom=(1.4, 1.1), texto="GIRA AO CONTRÁRIO"),
    C("la o sol nasce no oeste", "fdi_venus_volcano.jpg", tag="real", texto="O SOL NASCE NO OESTE"),
    C("venus tem quase o mesmo tamanho", "hdi_earth.jpg", tag="real", zoom=(1.0, 1.15)),
    C("ja foi chamado de planeta irmao", V, 63, "anim"),
    C("mas a semelhanca acaba ai", V, 66, "anim", flash=1),
    C("a superficie passa de", V, 47.5, "anim", texto="+460 °C", shake=4),
    C("quente o suficiente para derreter", V, 50.3, "anim", shake=8),
    C("a pressao e noventa vezes", "fdi_venus_volcano.jpg", tag="real", zoom=(1.4, 1.8), pan=(0.5, 0.5), texto="90× A PRESSÃO DA TERRA"),
    C("e as nuvens sao feitas", V, 48.5, "anim", texto="ÁCIDO SULFÚRICO"),
    C("as sondas sovieticas", V, 66.5, "anim", zoom=(1.2, 1.4), texto="~2 HORAS"),
    C("e o mais curioso", V, 52.8, "anim", zoom=(1.3, 1.5)),
    C("mercurio e", "hd_transit.mp4", 14, "anim"),
    C("mesmo assim venus e o mais quente", V, 55.8, "anim", zoom=(1.0, 1.3)),
    C("por causa de um efeito estufa", V, 34.3, "anim", texto="EFEITO ESTUFA"),
])
