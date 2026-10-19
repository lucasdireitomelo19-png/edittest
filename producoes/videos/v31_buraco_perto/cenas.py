import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 42.4
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
SAIDA = "short_buraco_perto.mp4"
CREDITO = "NOIRLab/NSF/AURA · NASA Goddard · Pixabay"
GA = "nl_gaia_a.mp4"   # NOIRLab: estrela parecida com o Sol orbitando Gaia BH1 (animação)
GC = "nl_gaia_c.mp4"   # NOIRLab: zoom real no céu até Gaia BH1 (0–43 s) e ilustração do buraco negro (47–57 s)
PK = "na_parker.mp4"   # NASA Goddard: trailer da Parker Solar Probe
CENAS = montar(AQUI, [
    C("", GC, 48, "ilus", crop=(1150, 0, 608, 1080), zoom=(1.0, 1.15)),
    C("e daria pra chegar", "pb_estrelas_tl.mp4", 2, "real", zoom=(1.0, 1.12)),
    C("o campeao se chama", "a2_gaia.mp4", 1, "anim", zoom=(1.1, 1.2), fixo=True, texto="GAIA BH1"),
    C("fica a mil", GC, 2, "real", zoom=(1.0, 1.12), conta=(0, 1560, " ANOS-LUZ"), som=("hit", -14)),
    C("na constelacao", GC, 20, "real", zoom=(1.0, 1.15), texto="OFIÚCO"),
    C("tem quase dez", GC, 50, "ilus", crop=(1150, 0, 608, 1080), zoom=(1.05, 1.2), texto="~10× A MASSA DO SOL"),
    C("e e completamente", GC, 54, "ilus", crop=(1150, 0, 608, 1080), zoom=(1.2, 1.35), apaga=0.5),
    C("ele foi descoberto", "a2_gaia.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True, texto="DESCOBERTO EM 2022"),
    C("dancando em torno", "a2_gaia.mp4", 2.5, "anim", zoom=(1.2, 1.3), fixo=True),
    C("agora a viagem", PK, 11, "anim", zoom=(1.0, 1.12), flash=True),
    C("a nave mais rapida", PK, 28, "anim", zoom=(1.0, 1.12), texto="PARKER SOLAR PROBE"),
    C("probe quase", PK, 40, "anim", zoom=(1.05, 1.2), conta=(0, 692000, " KM/H"), som=("hit", -14)),
    C("nessa velocidade", "pb_estrelas_tl.mp4", 8, "real", zoom=(1.0, 1.15), vel=2.0),
    C("levaria uns dois", GC, 30, "real", zoom=(1.0, 1.15), conta=(0, 2.4, " MILHÕES DE ANOS")),
    C("a voyager um", "pb_via_lactea_v.mp4", 6, "real", zoom=(1.0, 1.15), texto="VOYAGER 1", conta=(0, 27, " MILHÕES DE ANOS")),
    C("entao por enquanto", "pb_s6_radiotelescopio.mp4", 20, "real", zoom=(1.0, 1.15)),
    C("e talvez existam", "a2_gaia_revela.mp4", 0, "anim", zoom=(1.0, 1.08), fixo=True, rgb=True),
    C("escondidos no escuro", GC, 52, "ilus", crop=(1150, 0, 608, 1080), zoom=(1.1, 1.3), apaga=0.6),
])
