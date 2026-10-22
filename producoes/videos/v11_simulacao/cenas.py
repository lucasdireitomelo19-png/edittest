import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 44.5
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_simulacao.mp4"
CREDITO = "NASA Goddard (OpenUniverse) · ESA/Hubble · Pixabay"
OU = "sv_openuniverse.mp4"      # universo simulado para o telescópio Roman (NASA SVS 14749)
GZ = "hb_zoom_galaxias.mp4"     # zoom real até NGC 1512 (ESA/Hubble heic1712a)
GN = "hb_zoom_gnz11.mp4"        # zoom real até GN-z11 (ESA/Hubble heic1604a)
CENAS = montar(AQUI, [
    C("", GZ, 44, "real", zoom=(1.0, 1.2), pan=(0.06, 0.5), texto="E SE NADA DISSO FOR REAL?"),
    C("talvez nada disso", GZ, 46, "real", zoom=(1.2, 1.5), pan=(0.06, 0.5), pixel=(1, 40)),
    C("em 2003", "pb_binario.mp4", 3, "anim", zoom=(1.0, 1.1), texto="NICK BOSTROM · 2003"),
    C("imagine uma civilizacao", "pb_circuito_tunel.mp4", 2, "anim", zoom=(1.0, 1.1)),
    C("ela poderia simular", OU, 30, "sim", zoom=(1.0, 1.15), texto="UNIVERSOS SIMULADOS"),
    C("com seres que pensam", "pb_multidao.mp4", 3, "real", zoom=(1.0, 1.1)),
    C("e se pode simular um", OU, 36, "sim", zoom=(1.1, 1.3)),
    C("pode simular milhoes", "pb_matrix_tunel.mp4", 2, "anim", vel=1.4, texto="MILHÕES"),
    C("ai vem a conta", GN, 21, "real", zoom=(1.0, 1.15)),
    C("se existem milhoes", OU, 38, "sim", zoom=(1.2, 1.4), texto="1.000.000 SIMULADOS"),
    C("qual a chance", GZ, 40, "real", zoom=(1.0, 1.1), pan=(0.06, 0.5), texto="× 1 REAL"),
    C("para bostrom", "pb_particulas.mp4", 2, "anim", zoom=(1.0, 1.1), texto="3 POSSIBILIDADES"),
    C("ou as civilizacoes", "pb_glitch_codigo.mp4", 1, "anim", zoom=(1.0, 1.1), texto="1. ELAS SE DESTROEM"),
    C("ou nunca se interessam", "pb_binario.mp4", 12, "anim", zoom=(1.1, 1.2), texto="2. NÃO QUEREM SIMULAR"),
    C("ou quase certamente", GZ, 44, "real", zoom=(1.0, 1.25), pan=(0.06, 0.5), pixel=(1, 30), texto="3. ESTAMOS NUMA SIMULAÇÃO"),
    C("alguns fisicos", "pb_particulas.mp4", 10, "anim", zoom=(1.0, 1.1)),
    C("se o universo fosse uma grade", GN, 24, "real", zoom=(1.1, 1.3), pixel=(4, 24), texto="UMA GRADE?"),
    C("os raios cosmicos", "pb_circuito_tunel.mp4", 9, "anim", vel=1.5, zoom=(1.0, 1.1), texto="RAIOS CÓSMICOS"),
    C("ate hoje", OU, 25, "sim", zoom=(1.0, 1.1), texto="NENHUM SINAL"),
    C("mas tambem ninguem", "pb_glitch_codigo.mp4", 5, "anim", zoom=(1.0, 1.1), texto="HIPÓTESE FILOSÓFICA"),
])
