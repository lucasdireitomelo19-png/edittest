import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 45.3
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_tabby.mp4"
CREDITO = "ESO/M. Kornmesser · NASA Goddard · Pixabay"
CT = "an_l_curva_tabby.mp4"      # curva de luz com quedas irregulares (animação própria)
CP = "an_l_curva_planeta.mp4"    # curva de luz de um planeta em trânsito (animação própria)
DY = "an_l_dyson.mp4"            # enxame de painéis (animação própria)
CENAS = montar(AQUI, [
    C("", CT, 3.6, "anim", zoom=(1.0, 1.05), texto="ALGO BLOQUEIA 22% DA LUZ"),
    C("e ninguem sabe", "pb_via_lactea_v.mp4", 6, "real", zoom=(1.0, 1.15)),
    C("ela fica a quase", "pb_ceu_estrelas.mp4", 6, "real", zoom=(1.0, 1.15), texto="~1.500 ANOS-LUZ"),
    C("o nome tecnico", "pb_estrelas_tl.mp4", 2, "real", zoom=(1.0, 1.15), texto="KIC 8462852"),
    C("mas ficou famosa", "es_eso2109c.mp4", 2, "ilus", zoom=(1.0, 1.15), sat=0.6, texto="A ESTRELA DE TABBY"),
    C("quando um planeta", CP, 0, "anim", zoom=(1.0, 1.0)),
    C("aqui nao", CT, 0, "anim", zoom=(1.0, 1.0)),
    C("nenhum planeta", CT, 4.5, "anim", zoom=(1.05, 1.15), texto="NENHUM PLANETA FARIA ISSO"),
    C("ai surgiu", DY, 0, "ilus", zoom=(1.0, 1.1), texto="HIPÓTESE"),
    C("uma megaestrutura", DY, 2, "ilus", zoom=(1.1, 1.25), texto="MEGAESTRUTURA ALIENÍGENA?"),
    C("paineis gigantes", DY, 4, "ilus", zoom=(1.25, 1.4)),
    C("em 2018", "es_eso2109c.mp4", 8, "ilus", zoom=(1.0, 1.15), sat=0.6, texto="2018"),
    C("isso combina", "es_eso2109c.mp4", 14, "ilus", zoom=(1.1, 1.3), sat=0.6, texto="POEIRA"),
    C("so que de onde", CT, 5.5, "anim", zoom=(1.0, 1.1)),
    C("essa parte", "pb_via_lactea_v.mp4", 16, "real", zoom=(1.0, 1.15), texto="MISTÉRIO EM ABERTO"),
])
