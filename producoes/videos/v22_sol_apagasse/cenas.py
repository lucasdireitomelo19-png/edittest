import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 43.4
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
SAIDA = "short_sol_apagasse.mp4"
CREDITO = "NASA SDO · NASA/JPL-Caltech · Pixabay"
SDO = "na_sdo_ano7.mp4"          # Sol em luz visível, SDO (NASA), disco à esquerda do quadro
EU = "na_europa_ciencia.mp4"     # NASA/JPL: Terra vista da órbita (0 s), oceano sob gelo (32 s), fontes hidrotermais reais (40–55 s)
CENAS = montar(AQUI, [
    C("", SDO, 70, "real", zoom=(1.0, 1.12), crop=(200, 0, 608, 1080), apaga=0.45),
    C("voce so ia", "pb_s1_praia_por_sol.mp4", 4, "real", zoom=(1.0, 1.1), texto="8 MIN 20 S", som=("hit", -14)),
    C("e o tempo que", EU, 1, "real", zoom=(1.0, 1.15), pan=(0.5, 0.5)),
    C("e a gravidade", "a2_tangente_g.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True),
    C("por oito minutos", "a2_tangente.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True, texto="8 MINUTOS"),
    C("a lua sumiria", "pb_s1_lua_noite.mp4", 6, "real", zoom=(1.1, 1.25), apaga=0.35, flash=True),
    C("as plantas", "pb_s1_floresta_raios.mp4", 2, "real", zoom=(1.0, 1.12)),
    C("fotossintese", "pb_s1_folhas_copa.mp4", 6, "real", zoom=(1.05, 1.15), apaga=0.4),
    C("em uma semana", "pb_s1_geada.mp4", 3, "real", zoom=(1.0, 1.12), conta=(15, -18, " °C"), texto="1 SEMANA · ESTIMATIVA", som=("hit", -14)),
    C("em um ano", "pb_s1_nevasca.mp4", 4, "real", zoom=(1.0, 1.12), conta=(-18, -70, " °C"), texto="1 ANO · ESTIMATIVA", som=("hit", -14)),
    C("os oceanos", "pb_s1_baia_congelada.mp4", 10, "real", zoom=(1.0, 1.12)),
    C("mas embaixo", "pb_s1_gelo_crosta.mp4", 3, "real", zoom=(1.0, 1.15), flash=True),
    C("a agua ficaria", EU, 32, "ilus", zoom=(1.1, 1.2), pan=(0.5, 0.6)),
    C("aquecida pelo", "pb_s1_vulcao.mp4", 3, "real", zoom=(1.0, 1.12)),
    C("e nas fontes", EU, 40.5, "real", zoom=(1.0, 1.12), rgb=True, texto="FONTES HIDROTERMAIS"),
    C("existe vida", EU, 47, "real", zoom=(1.0, 1.12)),
    C("ela continuaria", EU, 51, "real", zoom=(1.0, 1.15)),
])
