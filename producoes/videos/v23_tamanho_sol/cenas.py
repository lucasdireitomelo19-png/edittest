import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 41.6
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
SAIDA = "short_tamanho_sol.mp4"
CREDITO = "NASA SDO · ESO/M. Kornmesser, N. Risinger · NASA Goddard · Pixabay"
SDO = "na_sdo_ano7.mp4"          # Sol em luz visível (SDO), disco recortado
ER = "na_sdo_erupcao.mp4"        # SDO: erupção de 2014 (close 17–50 s, disco inteiro 52–58 s)
ZOOM = "es_eso2109d.mp4"         # zoom de Órion até Betelgeuse (ESO)
TAM = "an_l_tamanho.mp4"         # Betelgeuse no lugar do Sol, passando da órbita de Marte (animação própria)
SOLC = dict(crop=(200, 0, 608, 1080))
CENAS = montar(AQUI, [
    C("", ER, 52.5, "real", zoom=(1.0, 1.15)),
    C("dentro dele caberiam", ER, 18, "real", zoom=(1.0, 1.12), conta=(0, 1300000, " TERRAS"), som=("hit", -14)),
    C("ele sozinho tem", SDO, 120, "real", zoom=(1.0, 1.1), **SOLC, conta=(0, 99.8, "% DA MASSA")),
    C("um aviao comercial", "pb_aviao.mp4", 1, "real", zoom=(1.0, 1.12)),
    C("dar uma volta nele", ER, 30, "real", zoom=(1.1, 1.25), texto="+6 MESES SEM PARAR"),
    C("agora olha", ZOOM, 1, "real", zoom=(1.0, 1.12), texto="ÓRION"),
    C("aquele ponto vermelho", ZOOM, 6, "real", zoom=(1.0, 1.2), texto="BETELGEUSE", flash=True),
    C("se ela estivesse", TAM, 0, "anim", zoom=(1.0, 1.04), fixo=True),
    C("a luz da uma volta", ER, 40, "real", zoom=(1.0, 1.15), texto="LUZ: 15 S", som=("hit", -14)),
    C("pra contornar", TAM, 6, "anim", zoom=(1.0, 1.06), fixo=True, texto="LUZ: ~3 HORAS", som=("hit", -14)),
    C("e ela nem e a maior", "pb_via_lactea_v.mp4", 4, "real", zoom=(1.0, 1.15)),
    C("perto dessas gigantes", "es_eso2003d.mp4", 10, "real", zoom=(1.0, 1.15)),
    C("o nosso sol", SDO, 150, "real", zoom=(1.0, 1.1), **SOLC, texto="ESTRELA MEDIANA"),
    C("e e exatamente", "na_iss_terra.mp4", 1650, "real", zoom=(1.0, 1.12)),
    C("estrelas gigantes", "sv_supernova_pulsar.mp4", 6, "anim", zoom=(1.0, 1.15), flash=True),
    C("o sol tem combustivel", SDO, 180, "real", zoom=(1.0, 1.15), **SOLC, conta=(0, 5, " BILHÕES DE ANOS")),
])
