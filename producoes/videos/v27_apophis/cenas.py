import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 50.2
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
CORTE_MAX = 2.4
PROGRESSO = True
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_apophis.mp4"
CREDITO = "NASA/Johns Hopkins APL · Pixabay"
DR = "na_dart_recap.mp4"   # NASA: DART Recap (lançamento real 36–44 s, aproximação real de Dimorphos 54–58 s, céu 87 s)
CENAS = montar(AQUI, [
    C("", "pb_s6_calendario.mp4", 1, "anim", zoom=(1.0, 1.1), texto="SEXTA-FEIRA 13"),
    C("um asteroide do tamanho", "pb_s6_asteroide.mp4", 2, "anim", zoom=(1.0, 1.15)),
    C("tres campos de futebol", "pb_s6_estadio.mp4", 4, "real", zoom=(1.0, 1.12), texto="3 CAMPOS DE FUTEBOL"),
    C("vai passar raspando", "pb_s6_asteroide2.mp4", 3, "anim", zoom=(1.05, 1.2), rgb=True),
    C("e o apophis", "pb_s6_asteroide.mp4", 9, "anim", zoom=(1.1, 1.25), texto="APOPHIS"),
    C("trezentos e quarenta", "pb_s6_asteroide2.mp4", 10, "anim", zoom=(1.0, 1.12), conta=(0, 340, " M"), som=("hit", -14)),
    C("no dia 13", "pb_s6_calendario.mp4", 6, "anim", zoom=(1.05, 1.15), texto="13 · ABRIL · 2029"),
    C("ele vai passar a uns", "a2_apophis.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True, conta=(0, 32000, " KM"), som=("hit", -14)),
    C("mais perto que os", "a2_apophis.mp4", 3.6, "anim", zoom=(1.0, 1.08), fixo=True, texto="MAIS PERTO QUE OS SATÉLITES"),
    C("em parte do planeta", "pb_s6_ceu_satelite.mp4", 1, "real", zoom=(1.0, 1.12)),
    C("um ponto de luz", "pb_s6_ceu_satelite.mp4", 5, "real", zoom=(1.2, 1.35), texto="A OLHO NU"),
    C("quando foi descoberto", "pb_s6_grafica.mp4", 2, "real", zoom=(1.0, 1.12), texto="2004"),
    C("quase tres por cento", "pb_s6_grafica.mp4", 6, "real", zoom=(1.15, 1.3), conta=(0, 2.7, "% DE CHANCE"), som=("hit", -14)),
    C("o asteroide mais perigoso", "pb_s6_asteroide.mp4", 14, "anim", zoom=(1.1, 1.3), flash=True),
    C("hoje sabemos", "pb_s6_radiotelescopio.mp4", 4, "real", zoom=(1.0, 1.12), texto="NÃO VAI BATER"),
    C("nem em 2029", "pb_s6_radiotelescopio.mp4", 14, "real", zoom=(1.05, 1.2), texto="SEM RISCO POR +100 ANOS"),
    C("mas e se viesse", "pb_s6_asteroide2.mp4", 13, "anim", zoom=(1.0, 1.2), rgb=True),
    C("em 2022", DR, 36.5, "real", zoom=(1.0, 1.12), texto="MISSÃO DART · 2022"),
    C("jogou uma nave", DR, 51, "anim", zoom=(1.0, 1.08), crop=(500, 0, 450, 800)),
    C("a onze milhoes", DR, 54, "real", zoom=(1.0, 1.08), crop=(820, 205, 338, 600), conta=(0, 11, " MILHÕES DE KM")),
    C("e mudou a orbita", DR, 56.5, "real", zoom=(1.0, 1.1), crop=(720, 150, 360, 640), flash=True, texto="ÓRBITA 32 MIN MAIS CURTA", som=("hit", -12)),
    C("foi a primeira vez", DR, 87, "real", zoom=(1.0, 1.15)),
    C("caminho de um corpo", DR, 96.5, "anim", zoom=(1.0, 1.1)),
])
