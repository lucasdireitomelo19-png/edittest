import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = ""
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_lua_fugindo_61s.mp4"
CREDITO = "Imagens: NASA · NASA Goddard (LRO) · NASA/GRC"
M = "fd_moontour.mp4"
CENAS = montar(AQUI, [
    C("", M, 1, "sim", punch=1),
    C("e a gente consegue medir", "fdi_laser.jpg", tag="real", zoom=(1.0, 1.2)),
    C("em 1969 os astronautas da apollo 11", "fdi_aldrin_walk.jpg", tag="real", texto="APOLLO 11 · 1969"),
    C("um painel de espelhos", "fdi_easep.jpg", tag="real", zoom=(1.0, 1.3)),
    C("ate hoje observatorios", "fdi_laser.jpg", tag="real", zoom=(1.3, 1.6), pan=(0.5, 0.3)),
    C("o resultado a lua se afasta", M, 268, "sim", texto="3,8 CM POR ANO"),
    C("mais ou menos a velocidade", M, 140, "sim"),
    C("o culpado sao as mares", "ns_earth_spin.mp4", 40),
    C("a lua puxa os oceanos", "hdi_earth.jpg", tag="real", zoom=(1.2, 1.5)),
    C("a terra perde velocidade", "ns_earth_spin.mp4", 60),
    C("por isso os dias na terra", "ns_earth_spin.mp4", 75, texto="DIAS MAIS LONGOS"),
    C("so dois milesimos", M, 30, "sim"),
    C("e isso tem uma consequencia", M, 46.5, "sim"),
    C("hoje a lua tem o tamanho certo", "fdi_eclipse.jpg", tag="real", zoom=(1.0, 1.3)),
    C("daqui a centenas de milhoes", M, 262, "sim", zoom=(1.3, 1.0)),
    C("nos vivemos numa epoca privilegiada", "fdi_eclipse.jpg", tag="real", zoom=(1.5, 1.1), texto="ECLIPSE TOTAL · 2024"),
    C("um dia os eclipses totais", M, 2, "sim", sat=0.6, zoom=(1.2, 1.0)),
])
