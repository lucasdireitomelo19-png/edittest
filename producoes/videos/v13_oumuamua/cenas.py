import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 45.5
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_oumuamua.mp4"
CREDITO = "ESO/M. Kornmesser, L. Calçada · NASA · Pixabay"
GIRA = "es_eso1737d.mp4"     # concepção artística do ʻOumuamua girando (ESO/M. Kornmesser)
ROTA = "es_eso1737b.mp4"     # trajetória pelo Sistema Solar (ESO/L. Calçada)
GAS = "es_eso1820b.mp4"      # ʻOumuamua liberando gás (ESO/M. Kornmesser)
GAS2 = "es_eso1820c.mp4"
CENAS = montar(AQUI, [
    C("", GIRA, 4, "ilus", zoom=(1.2, 1.4), texto="2017"),
    C("e fez algo", GIRA, 5.5, "ilus", zoom=(1.3, 1.5), pan=(0.5, 0.5)),
    C("um telescopio no havai", "pb_ceu_estrelas.mp4", 2, "real", zoom=(1.0, 1.1), texto="PAN-STARRS · HAVAÍ"),
    C("pela primeira vez", ROTA, 30, "anim", zoom=(1.0, 1.15), texto="VEIO DE OUTRA ESTRELA"),
    C("os astronomos o chamaram", GIRA, 5, "ilus", zoom=(1.0, 1.2), texto="OUMUAMUA"),
    C("em havaiano", GAS2, 4, "ilus", zoom=(1.0, 1.1), texto="“MENSAGEIRO VINDO DE LONGE”"),
    C("e ele era estranho", GAS2, 10, "ilus", zoom=(1.1, 1.3)),
    C("o brilho mudava", GIRA, 5, "ilus", zoom=(1.3, 1.5), texto="BRILHO VARIAVA 10×"),
    C("ou seja o formato", "es_eso1737b.mp4", 1, "ilus", zoom=(1.5, 1.7), pan=(0.45, 0.5), texto="ALONGADO?"),
    C("ou achatado", GAS2, 14, "ilus", zoom=(1.2, 1.4), texto="OU PANQUECA?"),
    C("nao tinha cauda", GAS, 2, "ilus", zoom=(1.0, 1.15), texto="SEM CAUDA"),
    C("e mesmo assim", ROTA, 42, "anim", zoom=(1.0, 1.2)),
    C("ele acelerou", ROTA, 52, "anim", zoom=(1.1, 1.3), texto="ACELEROU"),
    C("que a gravidade", GAS, 9, "ilus", zoom=(1.0, 1.15)),
    C("um astronomo de harvard", "nl_vela_solar.mp4", 188, "ilus", zoom=(1.0, 1.15), texto="HIPÓTESE: UMA VELA SOLAR"),
    C("uma nave", "nl_vela_solar.mp4", 268, "ilus", zoom=(1.1, 1.3), texto="UMA NAVE?"),
    C("a maioria dos cientistas", GAS2, 6, "ilus", zoom=(1.0, 1.15), texto="PROVAVELMENTE NATURAL"),
    C("mas ninguem vai poder", ROTA, 62, "anim", zoom=(1.0, 1.15)),
    C("ele ja foi embora", GIRA, 6.5, "ilus", zoom=(1.0, 1.25), texto="NUNCA MAIS VAI VOLTAR"),
])
