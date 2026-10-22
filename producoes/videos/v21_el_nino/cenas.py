import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 46.0
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_el_nino.mp4"
CREDITO = "NASA Goddard · Pixabay"
N3 = "na_elnino3d.mp4"        # dados de satélite: água quente do El Niño 2015 cruzando o Pacífico (NASA Goddard)
CENAS = montar(AQUI, [
    C("", "pb_en_pacifico.mp4", 2, "real", zoom=(1.0, 1.12)),
    C("esta mais de dois", "pb_en_mar_sol.mp4", 6, "real", zoom=(1.0, 1.1), texto="+2 °C"),
    C("e isso pode secar", "pb_en_rio_seco.mp4", 3, "real", zoom=(1.0, 1.1)),
    C("alagar o sul", "pb_en_poa.mp4", 8, "real", zoom=(1.0, 1.1), texto="PORTO ALEGRE · 2024"),
    C("o nome veio", "pb_en_lima.mp4", 3, "real", zoom=(1.0, 1.1), texto="PERU"),
    C("perto do natal", "pb_en_vela.mp4", 2, "real", zoom=(1.0, 1.08)),
    C("o mar esquentava", "pb_en_pescador.mp4", 5, "real", zoom=(1.0, 1.1)),
    C("chamaram de", "pb_en_presepio.mp4", 3, "real", zoom=(1.0, 1.15), texto="EL NIÑO = O MENINO"),
    C("os ventos", "pb_en_palmeiras.mp4", 4, "real", zoom=(1.0, 1.08), vel=0.7),
    C("ela volta", N3, 4, "anim", zoom=(1.0, 1.1), pan=(0.85, 0.5), vel=1.5),
    C("em 1998", "pb_en_coral.mp4", 3, "real", zoom=(1.0, 1.12), texto="1998"),
    C("dezesseis por cento", "pb_en_coral3.mp4", 4, "real", zoom=(1.05, 1.2), sat=0.35, texto="16% DOS CORAIS DO MUNDO"),
    C("em 2023", "pb_en_amazonia2.mp4", 6, "real", zoom=(1.0, 1.12), texto="2023"),
    C("ao nivel mais baixo", "pb_en_rio_seco2.mp4", 4, "real", zoom=(1.0, 1.12), texto="MENOR NÍVEL DESDE 1902"),
    C("agora a noaa", "pb_en_servidores.mp4", 8, "real", zoom=(1.1, 1.25), texto="83% DE CHANCE", som=("hit", -12)),
    C("de este ser", N3, 12, "anim", zoom=(1.0, 1.1), pan=(0.75, 0.5), texto="O MAIS FORTE DESDE 1950"),
    C("e ele ainda", "pb_en_tempestade_mar.mp4", 10, "real", zoom=(1.0, 1.1)),
])
