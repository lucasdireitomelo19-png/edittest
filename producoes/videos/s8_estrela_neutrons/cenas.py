import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
AMBIENTE = "drone"
AMBIENTE_DB = -22
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_estrela_neutrons_61s.mp4"
CREDITO = "NASA Goddard (SVS/CIL) · Pixabay/Kanenori, D-GM, adege"
PU = "nl_pulsar4k.mp4"          # simulação de pulsar (NASA Goddard/Fermi)
SN = "sv_supernova_pulsar.mp4"  # animação de supernova com pulsar (NASA Goddard CIL)
MG = "sv_magnetar_flares.mp4"   # animação de magnetar com erupções
MF = "sv_magnetar.mp4"          # animação de magnetar, vista fixa
PV = "sv_pulsar_vento.mp4"      # animação de pulsar atravessando vento estelar (XRISM)
VL = "pb_via_lactea_v.mp4"      # Via Láctea, vertical (Pixabay/Kanenori)
TL = "pb_estrelas_tl.mp4"       # timelapse de estrelas (Pixabay/adege)
CA = "pb_cidade_aerea.mp4"      # cidade vista de drone (Pixabay/D-GM)
CENAS = montar(AQUI, [
    C("", PU, 4, "sim", zoom=(1.1, 1.2), texto="1 CUBO DE AÇÚCAR"),
    C("pesando um bilhao", PU, 3.5, "sim", zoom=(1.2, 1.3), texto="1 BILHÃO DE TONELADAS"),
    C("isso existe", MG, 2, "anim", zoom=(1.2, 1.3)),
    C("e esta la fora", VL, 3, "real", zoom=(1.0, 1.1)),
    C("tudo comeca", SN, 0.5, "anim", zoom=(1.0, 1.1)),
    C("ela explode", SN, 5.5, "anim"),
    C("e por um instante", SN, 11, "anim", zoom=(1.1, 1.2), texto="MAIS QUE UMA GALÁXIA"),
    C("mas o nucleo dela desaba", SN, 22, "anim", zoom=(1.0, 1.1)),
    C("mais massa que o sol", PV, 2, "anim", zoom=(1.2, 1.3), texto="MAIS MASSA QUE O SOL"),
    C("esmagada numa bola", MF, 3, "anim", zoom=(1.2, 1.1), texto="~20 KM"),
    C("do tamanho de uma cidade", CA, 5, "real", zoom=(1.05, 1.15)),
    C("a pressao e tao absurda", PU, 72, "sim", zoom=(1.1, 1.2)),
    C("protons e eletrons", PU, 88, "sim", zoom=(1.2, 1.3)),
    C("sobram so neutrons", MF, 12, "anim", texto="SÓ NÊUTRONS"),
    C("nasceu uma estrela", PU, 9, "sim", zoom=(1.0, 1.1), texto="ESTRELA DE NÊUTRONS"),
    C("e ela gira", PU, 5, "sim", vel=1.3, zoom=(1.2, 1.3)),
    C("as mais rapidas", PV, 3, "anim", vel=1.5, zoom=(1.1, 1.2)),
    C("dao mais de setecentas", PU, 8, "sim", vel=1.5, texto="+700 VOLTAS"),
    C("por segundo", PU, 10, "sim", vel=1.5, texto="POR SEGUNDO"),
    C("o campo magnetico", PU, 15, "sim", zoom=(1.1, 1.2)),
    C("trilhoes de vezes", PU, 60, "sim", zoom=(1.2, 1.3), texto="TRILHÕES DE VEZES A TERRA"),
    C("e existe um tipo", MG, 6, "anim", zoom=(1.0, 1.1)),
    C("as magnetares", MG, 14, "anim", texto="MAGNETARES"),
    C("mil vezes mais", MF, 18, "anim", zoom=(1.2, 1.3), texto="×1000"),
    C("um cubo de acucar", PU, 118, "sim", zoom=(1.1, 1.2), texto="1 CUBO DE AÇÚCAR"),
    C("um bilhao de toneladas", SN, 30, "anim", zoom=(1.2, 1.3), texto="1 BILHÃO DE TONELADAS"),
    C("segue o perfil", VL, 15, "real", zoom=(1.0, 1.1), texto="SIGA O PERFIL"),
    C("porque o universo", TL, 4, "real", zoom=(1.1, 1.2), texto="SIGA O PERFIL"),
])
