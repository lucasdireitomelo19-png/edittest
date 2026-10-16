import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = ""
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_saturno_61s.mp4"
CREDITO = "Imagens: NASA/JPL-Caltech/Space Science Institute (Cassini) · NASA Goddard"
R = "fd_saturn_rings.mp4"
CENAS = montar(AQUI, [
    C("", R, 3, "anim", punch=1),
    C("se existisse uma banheira", "fdi_saturn.jpg", tag="real", zoom=(1.0, 1.25)),
    C("ele tem noventa e cinco vezes", R, 41.5, "anim", texto="95× A MASSA DA TERRA"),
    C("mas e feito quase so", "fd_saturn_storm.mp4", 37.4, "real"),
    C("por isso a densidade media", R, 10, "anim", texto="MENOS DENSO QUE A ÁGUA"),
    C("e o unico planeta", "fdi_saturn.jpg", tag="real", zoom=(1.3, 1.6)),
    C("e os aneis", R, 59.5, "anim"),
    C("mas na maior parte", R, 64, "anim", texto="DEZENAS DE METROS"),
    C("sao bilhoes de pedacos de gelo", R, 21, "anim"),
    C("outros do tamanho de casas", R, 25, "anim", zoom=(1.2, 1.4)),
    C("saturno tambem tem mais", "fd_saturn_storm.mp4", 9.4, "real", texto="+270 LUAS"),
    C("mas o detalhe mais impressionante", R, 34.7, "anim"),
    C("o gelo dos aneis esta caindo", R, 45, "anim", texto="CHUVA DOS ANÉIS"),
    C("se continuar nesse ritmo", R, 52, "anim", zoom=(1.2, 1.4)),
    C("ou seja nos vivemos", "fdi_rings.jpg", tag="real", zoom=(1.0, 1.25)),
    C("o planeta mais bonito", R, 3.5, "anim", zoom=(1.0, 1.2)),
])
