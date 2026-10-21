import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 50.0
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
SAIDA = "short_bennu.mp4"
CREDITO = "NASA/Goddard/University of Arizona · NASA/Johns Hopkins APL · Pixabay"
GL = "na_bennu_global.mp4"    # NASA: modelo global do Bennu girando (dados reais da OSIRIS-REx)
MK = "na_bennu_marca.mp4"     # NASA: superfície real e imagens reais do toque (TAG) em 33–40 s
TG = "na_bennu_tag.mp4"       # NASA: trailer do TAG (animação)
BR = "na_bennu_broll.mp4"     # NASA: B-roll do retorno (TAG real 44 s, cápsula no deserto 220 s, C-17 264 s, sala limpa 353+ s)
AM = "na_bennu_amostra.mp4"   # NASA: amostra sendo despejada na sala limpa
DR = "na_dart_recap.mp4"      # NASA: aproximação real de Dimorphos (DART)
CENAS = montar(AQUI, [
    C("", "pb_s6_calendario.mp4", 1, "anim", zoom=(1.0, 1.1)),
    C("24 de setembro", GL, 5, "real", zoom=(1.0, 1.08), fit=True, texto="24 · 09 · 2182", som=("hit", -12)),
    C("o nome dele", GL, 40, "real", zoom=(1.0, 1.1), fit=True, texto="BENNU"),
    C("quase quinhentos", GL, 70, "real", zoom=(1.0, 1.12), conta=(0, 490, " M"), som=("hit", -14)),
    C("mais alto que", "pb_b_empire.mp4", 2, "real", zoom=(1.0, 1.12), texto="EMPIRE STATE · 443 M"),
    C("a nasa mandou", TG, 51, "anim", zoom=(1.0, 1.12)),
    C("ela encostou", MK, 33.5, "real", zoom=(1.0, 1.1), flash=True, texto="OUT/2020: O TOQUE"),
    C("recolheu pedacos", BR, 44, "real", zoom=(1.0, 1.12)),
    C("a capsula pousou", BR, 221, "real", zoom=(1.0, 1.12), texto="24 · 09 · 2023"),
    C("em 2023", BR, 265, "real", zoom=(1.0, 1.12)),
    C("com isso", GL, 90, "real", zoom=(1.0, 1.15)),
    C("precisao absurda", BR, 354, "real", zoom=(1.0, 1.12)),
    C("e a conta deu", GL, 100, "real", zoom=(1.0, 1.1), fit=True, texto="1 EM 1.750", som=("hit", -12)),
    C("so naquele dia", "pb_s6_calendario.mp4", 6, "anim", zoom=(1.05, 1.15), texto="24/09/2182: 1 EM 2.700", som=("hit", -12)),
    C("se bater", "pb_s6_asteroide.mp4", 4, "anim", zoom=(1.0, 1.15), rgb=True, texto="NÃO É EXTINÇÃO"),
    C("mas pode devastar", "pb_cidade_aerea.mp4", 3, "real", zoom=(1.0, 1.15), shake=8, texto="DANO REGIONAL"),
    C("a boa noticia", "pb_s6_radiotelescopio.mp4", 8, "real", zoom=(1.0, 1.12)),
    C("sao mais de", GL, 20, "real", zoom=(1.0, 1.12), conta=(0, 99.9, "% DE CHANCE DE ERRAR")),
    C("e ate la", DR, 54, "real", zoom=(1.0, 1.08), crop=(820, 205, 338, 600), texto="DART · 2022"),
    C("e a parte mais", AM, 60, "real", zoom=(1.0, 1.12), rgb=True),
    C("dentro das amostras", AM, 150, "real", zoom=(1.0, 1.15)),
    C("encontraram ingredientes", BR, 441, "real", zoom=(1.0, 1.15), texto="AMINOÁCIDOS"),
])
