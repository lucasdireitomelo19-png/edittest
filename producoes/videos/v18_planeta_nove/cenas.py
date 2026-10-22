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
SAIDA = "short_planeta_nove.mp4"
CREDITO = "ESO/M. Kornmesser · NASA · Pixabay"
OR = "an_l_orbitas.mp4"          # órbitas alinhadas dos objetos transnetunianos (animação própria)
O9 = "an_l_orbitas_nove.mp4"     # com a órbita suposta do Planeta Nove
PL = "es_eso1629b.mp4"           # planeta escuro e distante (ilustração ESO, usada como ilustração genérica)
CENAS = montar(AQUI, [
    C("", "pb_via_lactea_v.mp4", 4, "real", zoom=(1.0, 1.15), texto="ALGO INVISÍVEL ESTÁ PUXANDO"),
    C("e pode ser um planeta", PL, 2, "ilus", zoom=(1.0, 1.2), sat=0.5, texto="UM PLANETA ESCONDIDO?"),
    C("bem depois de netuno", OR, 0, "anim", zoom=(1.0, 1.0)),
    C("e varios deles", OR, 2.2, "anim", zoom=(1.0, 1.1), texto="ÓRBITAS ALINHADAS"),
    C("em 2016", "pb_ceu_estrelas.mp4", 3, "real", zoom=(1.0, 1.1), texto="CALTECH · 2016"),
    C("um planeta gigante", O9, 2, "anim", zoom=(1.0, 1.05)),
    C("o planeta nove", O9, 4.2, "anim", zoom=(1.05, 1.15), texto="HIPÓTESE"),
    C("ele teria", PL, 10, "ilus", zoom=(1.1, 1.3), sat=0.5, texto="5 A 10 TERRAS"),
    C("e estaria tao longe", O9, 5, "anim", zoom=(1.15, 1.25), texto="+10.000 ANOS POR VOLTA"),
    C("tao distante", "pb_estrelas_tl.mp4", 6, "real", zoom=(1.0, 1.15)),
    C("que nenhum telescopio", "es_almatimelapse12f.mp4", 6, "real", zoom=(1.0, 1.15), texto="NUNCA FOI VISTO"),
    C("e existe uma hipotese", "pb_particulas_acel.mp4", 3, "anim", zoom=(1.0, 1.1)),
    C("em 2019", "an_l_bolha.mp4", 0.6, "anim", zoom=(1.0, 1.0), texto="BURACO NEGRO PRIMORDIAL?"),
    C("com a massa de varios", PL, 18, "ilus", zoom=(1.0, 1.15), sat=0.5),
    C("e do tamanho", "an_l_bolha.mp4", 0.3, "anim", zoom=(1.4, 1.6), texto="DO TAMANHO DE UMA BOLA"),
    C("o novo observatorio", "pb_estrelas_tl.mp4", 9, "real", zoom=(1.0, 1.15), texto="VERA RUBIN VARRE O CÉU"),
    C("se esse objeto existir", O9, 3.5, "anim", zoom=(1.15, 1.3), texto="PODE SER DESCOBERTO EM BREVE"),
])
