import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 44.9
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_rajadas_radio.mp4"
CREDITO = "ESO/M. Kornmesser · NASA Goddard · Pixabay"
FRB = "es_eso1915b.mp4"        # rajada atravessando o espaço entre galáxias (ESO, animação)
MAG = "sv_magnetar_frb.mp4"    # magnetar SGR 1935+2154 (NASA Goddard, animação)
ALMA = "es_almatimelapse12f.mp4"
CENAS = montar(AQUI, [
    C("", FRB, 1, "anim", zoom=(1.0, 1.15), texto="SINAIS DE OUTRAS GALÁXIAS"),
    C("alguns em um ritmo", "an_l_ritmo.mp4", 3, "anim", zoom=(1.0, 1.0)),
    C("sao as rajadas", FRB, 3, "anim", zoom=(1.1, 1.25), texto="RAJADAS RÁPIDAS DE RÁDIO"),
    C("duram milissegundos", ALMA, 2, "real", zoom=(1.0, 1.15), texto="MILISSEGUNDOS"),
    C("mas nesse instante", FRB, 5, "anim", zoom=(1.0, 1.2), texto="A ENERGIA DE DIAS DE SOL"),
    C("a primeira foi", "pb_binario.mp4", 4, "anim", zoom=(1.0, 1.1), texto="2007"),
    C("hoje ja sao", "pb_ceu_estrelas.mp4", 6, "real", zoom=(1.0, 1.15), texto="MILHARES"),
    C("a maioria aparece", FRB, 6.5, "anim", zoom=(1.0, 1.1)),
    C("mas algumas se repetem", "an_l_ritmo.mp4", 0, "anim", zoom=(1.0, 1.0), texto="ALGUMAS SE REPETEM"),
    C("fica ativa", "an_l_ritmo.mp4", 3, "anim", zoom=(1.0, 1.05)),
    C("claro que muita gente", ALMA, 9, "real", zoom=(1.0, 1.15), texto="UMA CIVILIZAÇÃO?"),
    C("em 2020", MAG, 2, "anim", zoom=(1.0, 1.2), texto="2020"),
    C("uma estrela morta", MAG, 172, "anim", zoom=(1.0, 1.15), texto="MAGNETAR"),
    C("disparou uma rajada", MAG, 176, "anim", zoom=(1.2, 1.4)),
    C("entao pelo menos", "pb_via_lactea_v.mp4", 6, "real", zoom=(1.0, 1.15), texto="ORIGEM NATURAL"),
    C("mas a fisica", FRB, 2, "anim", zoom=(1.0, 1.15)),
    C("ainda e um dos", "pb_estrelas_tl.mp4", 5, "real", zoom=(1.0, 1.15), texto="MISTÉRIO EM ABERTO"),
])
