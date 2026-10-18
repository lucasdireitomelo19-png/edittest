import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SAGITÁRIO A*"
FIM = 61.0
AMBIENTE = "drone"
AMBIENTE_DB = -22
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_sgr_a.mp4"
CREDITO = "ESO · EHT · NASA Goddard (CC BY 4.0 / domínio público)"
CENAS = montar(AQUI, [
    C("", "sv_mwzoom.mp4", 0, "anim", zoom=(1.0, 1.1)),
    C("ou quase", "eso_eso1825b.mp4", 1, "anim", zoom=(1.05, 1.15), som="whoosh"),
    C("no centro da via lactea", "eso_eso1825c.mp4", 2, "real", zoom=(1.0, 1.15), texto="27.000 ANOS-LUZ"),
    C("existe um monstro", "bd_upclose.mp4", 2, "anim", zoom=(1.0, 1.08), texto="SAGITÁRIO A*", som=("boom", -6)),
    C("quatro milhoes", "bd_diskc.mp4", 3, "anim", zoom=(1.0, 1.1), texto="4 MILHÕES DE SÓIS"),
    C("e o sol levando", "sv_171.mp4", 5, "real", zoom=(1.15, 1.25)),
    C("gira em volta", "sv_mwzoom.mp4", 3, "anim", zoom=(1.1, 1.2), vel=0.6, texto="+800.000 KM/H"),
    C("mesmo assim", "sv_imap.mp4", 0, "anim", zoom=(1.0, 1.12), texto="1 VOLTA = 230 MILHÕES DE ANOS"),
    C("na ultima vez", "ns_earth_spin.mp4", 20, "anim", zoom=(1.1, 1.2), texto="ERA DOS PRIMEIROS DINOSSAUROS"),
    C("mas tem um detalhe", "eso_eso1825e.mp4", 0, "real", zoom=(1.0, 1.1)),
    C("o sol nao gira", "bd_orbit.mp4", 2, "anim", zoom=(1.1, 1.2), punch=True, rgb=True, texto="NÃO É O BURACO NEGRO", som=("hit", -10)),
    C("sagitario a estrela e menos", "eso_eso1825c.mp4", 40, "real", zoom=(1.0, 1.12), texto="< 0,01% DA MASSA DA GALÁXIA"),
    C("o que segura o sol", "sv_mwzoom.mp4", 12, "anim", zoom=(1.0, 1.1), vel=0.7),
    C("bilhoes de estrelas", "sv_imap.mp4", 14, "anim", zoom=(1.0, 1.1), texto="ESTRELAS · GÁS · MATÉRIA ESCURA"),
    C("se o buraco negro sumisse", "bd_disk360.mp4", 2, "anim", zoom=(1.0, 1.1)),
    C("o sol nem perceberia", "sv_171.mp4", 30, "real", zoom=(1.15, 1.22)),
    C("quem sente ele", "eso_eso1825f.mp4", 30, "anim", zoom=(1.0, 1.1)),
    C("uma delas", "eso_eso2006b.mp4", 6, "anim", zoom=(1.1, 1.25), texto="S2: 1 VOLTA A CADA 16 ANOS"),
    C("a mais de sete mil", "eso_eso1825b.mp4", 8, "anim", zoom=(1.05, 1.2), texto="+7.000 KM/S", som="whoosh"),
    C("foi assim que", "eso_eso1825e.mp4", 8, "real", zoom=(1.0, 1.12)),
    C("e em dois mil", "eso_eso2208-eht-mwb.mp4", 40, "real", zoom=(1.0, 1.1), texto="2022 · A SOMBRA DE SGR A*"),
])
