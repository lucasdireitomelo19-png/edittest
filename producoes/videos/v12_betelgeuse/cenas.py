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
SAIDA = "short_betelgeuse.mp4"
CREDITO = "ESO/M. Montargès et al., L. Calçada, N. Risinger · NASA Goddard · Pixabay"
ZOOM = "es_eso2109d.mp4"     # zoom de Órion até Betelgeuse (ESO)
SN = "sv_supernova_pulsar.mp4"  # animação de supernova (NASA Goddard CIL)
CENAS = montar(AQUI, [
    C("", ZOOM, 1, "real", zoom=(1.0, 1.15), texto="ESTA ESTRELA VAI EXPLODIR"),
    C("e quando isso", SN, 6, "anim", zoom=(1.1, 1.25)),
    C("vai dar para ver", "pb_ceu_dia.mp4", 2, "real", zoom=(1.0, 1.1), texto="VISÍVEL DE DIA"),
    C("e betelgeuse", ZOOM, 6, "real", zoom=(1.0, 1.2), texto="BETELGEUSE"),
    C("uma supergigante", "an_l_tamanho.mp4", 0, "anim", zoom=(1.0, 1.0)),
    C("ela esta no fim", "es_eso2003d.mp4", 10, "real", zoom=(1.0, 1.15), texto="FIM DA VIDA"),
    C("no fim de 2019", "es_eso2003c.mp4", 0, "real", zoom=(1.45, 1.55), pan=(0.5, 0.38), texto="2019"),
    C("betelgeuse perdeu", "es_eso2109b.mp4", 4, "real", zoom=(1.45, 1.6), pan=(0.5, 0.36), texto="-60% DE BRILHO"),
    C("muita gente achou", SN, 7, "anim", zoom=(1.0, 1.15)),
    C("era uma nuvem", "es_eso2109c.mp4", 4, "anim", zoom=(1.0, 1.15), texto="POEIRA"),
    C("e em 2025", "es_eso2611b.mp4", 25, "real", zoom=(1.0, 1.2), texto="UMA COMPANHEIRA"),
    C("a explosao deve", SN, 2.5, "anim", zoom=(1.0, 1.15), texto="PRÓXIMOS 100 MIL ANOS"),
    C("pode ser daqui", ZOOM, 20, "real", zoom=(1.0, 1.1)),
    C("ou amanha", SN, 5.6, "anim", zoom=(1.15, 1.3), texto="OU AMANHÃ"),
    C("quando acontecer ela", "pb_lua_cheia.mp4", 20, "real", zoom=(1.6, 1.8), pan=(0.5, 0.66), texto="QUASE COMO A LUA"),
    C("e nao tem perigo", ZOOM, 2, "real", zoom=(1.0, 1.1), texto="SEM PERIGO PARA A TERRA"),
    C("vai ser so o maior", SN, 22, "anim", zoom=(1.0, 1.2)),
])
