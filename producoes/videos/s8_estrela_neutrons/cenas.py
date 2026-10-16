import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
AMBIENTE = "drone"
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
    C("", PU, 4, "sim", punch=1, rgb=1, zoom=(1.1, 1.35), texto="1 CUBO DE AÇÚCAR", som="hit"),
    C("pesando um bilhao", PU, 3.5, "sim", zoom=(1.3, 1.7), shake=6, flash=1, texto="1 BILHÃO DE TONELADAS", som="boom"),
    C("isso existe", MG, 2, "anim", zoom=(1.2, 1.4), som="whoosh"),
    C("e esta la fora", VL, 3, "real", zoom=(1.0, 1.15), som="whoosh"),
    C("tudo comeca", SN, 0.5, "anim", zoom=(1.0, 1.4), som=("riser", -2)),
    C("ela explode", SN, 5.5, "anim", punch=1, flash=1, shake=10, som=("boom", 2)),
    C("e por um instante", SN, 11, "anim", zoom=(1.1, 1.3), texto="MAIS QUE UMA GALÁXIA"),
    C("mas o nucleo dela desaba", SN, 22, "anim", zoom=(1.0, 1.8), som="whoosh"),
    C("mais massa que o sol", PV, 2, "anim", zoom=(1.2, 1.4), texto="MAIS MASSA QUE O SOL", som="hit"),
    C("esmagada numa bola", MF, 3, "anim", zoom=(1.6, 1.1), texto="~20 KM", som="hit"),
    C("do tamanho de uma cidade", CA, 5, "real", zoom=(1.05, 1.2), som="whoosh"),
    C("a pressao e tao absurda", PU, 72, "sim", shake=4, zoom=(1.1, 1.4)),
    C("protons e eletrons", PU, 88, "sim", rgb=1, zoom=(1.2, 1.5), som="hit"),
    C("sobram so neutrons", MF, 12, "anim", punch=1, texto="SÓ NÊUTRONS", som="boom"),
    C("nasceu uma estrela", PU, 9, "sim", flash=1, zoom=(1.0, 1.3), texto="ESTRELA DE NÊUTRONS", som="whoosh"),
    C("e ela gira", PU, 5, "sim", vel=2, zoom=(1.2, 1.4), som="pulsar"),
    C("as mais rapidas", PV, 3, "anim", vel=1.5, zoom=(1.1, 1.3)),
    C("dao mais de setecentas", PU, 8, "sim", vel=3, shake=5, texto="+700 VOLTAS", som="tick"),
    C("por segundo", PU, 10, "sim", vel=3, punch=1, rgb=1, texto="POR SEGUNDO", som="hit"),
    C("o campo magnetico", PU, 15, "sim", zoom=(1.1, 1.4), som="whoosh"),
    C("trilhoes de vezes", PU, 60, "sim", zoom=(1.3, 1.6), texto="TRILHÕES DE VEZES A TERRA", som="tick"),
    C("e existe um tipo", MG, 6, "anim", zoom=(1.0, 1.3), som=("riser", -2)),
    C("as magnetares", MG, 14, "anim", punch=1, rgb=1, shake=6, texto="MAGNETARES", som="boom"),
    C("mil vezes mais", MF, 18, "anim", zoom=(1.2, 1.6), texto="×1000", som="hit"),
    C("um cubo de acucar", PU, 118, "sim", zoom=(1.1, 1.4), texto="1 CUBO DE AÇÚCAR", som="whoosh"),
    C("um bilhao de toneladas", SN, 30, "anim", shake=5, zoom=(1.2, 1.5), texto="1 BILHÃO DE TONELADAS", som="boom"),
    C("segue o perfil", VL, 15, "real", zoom=(1.0, 1.2), texto="SIGA O PERFIL", som="whoosh"),
    C("porque o universo", TL, 4, "real", zoom=(1.1, 1.35), texto="SIGA O PERFIL", som="whoosh"),
])
