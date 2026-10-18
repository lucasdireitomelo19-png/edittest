import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 48.6
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
SAIDA = "short_aneis_terra.mp4"
CREDITO = "NASA Goddard · Pixabay · anel no céu: ilustração"
SA = "na_saturno_aneis.mp4"   # NASA Goddard: visualização dos anéis de Saturno (de perfil em 86–91 s)
CENAS = montar(AQUI, [
    C("", SA, 5, "anim", zoom=(1.0, 1.12)),
    C("como saturno", SA, 13, "anim", zoom=(1.05, 1.2)),
    C("do brasil voce", "pb_s4_sp_predios.mp4", 3, "real", zoom=(1.0, 1.08), sobre="ov_arco.png"),
    C("cruzando o ceu", "pb_s4_praia_drone.mp4", 6, "real", zoom=(1.0, 1.08), sobre="ov_arco.png"),
    C("brilhante ate de dia", "pb_s4_ceu_dia.mp4", 3, "real", zoom=(1.0, 1.08), sobre="ov_arco.png", texto="ATÉ DE DIA"),
    C("a noite", "pb_s4_cidade_noite.mp4", 4, "real", zoom=(1.0, 1.08), sobre="ov_arco_noite.png", texto="A SOMBRA DA TERRA"),
    C("mas quem morasse", "a2_anel.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True),
    C("quase nao veria", "a2_anel_lado.mp4", 0, "anim", zoom=(1.0, 1.06), fixo=True, texto="NO EQUADOR: UMA LINHA"),
    C("os aneis de saturno", SA, 61, "anim", zoom=(1.0, 1.12), conta=(0, 280000, " KM"), som=("hit", -14)),
    C("e so uns dez", SA, 86.8, "anim", zoom=(1.1, 1.3), texto="~10 M DE ESPESSURA"),
    C("pra terra ganhar", "a2_lua_vem.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True),
    C("a gravidade rasgaria", "a2_lua_rasga.mp4", 0, "anim", zoom=(1.0, 1.06), fixo=True, flash=True),
    C("e aqui vem", "pb_s4_meteoro.mp4", 1, "anim", zoom=(1.0, 1.15), rgb=True),
    C("em 2024", "a2_anel.mp4", 2, "anim", zoom=(1.08, 1.15), fixo=True, texto="HIPÓTESE · 2024"),
    C("ha uns quatrocentos", "pb_s4_agua_viva.mp4", 2, "real", zoom=(1.0, 1.12), conta=(0, 466, " MILHÕES DE ANOS"), som=("hit", -14)),
    C("a pista", "a2_anel_crateras.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True, conta=(0, 21, " CRATERAS")),
    C("como se pedras", "pb_s4_meteoro.mp4", 4, "anim", zoom=(1.1, 1.25)),
    C("ainda e uma hipotese", "a2_anel.mp4", 3.5, "anim", zoom=(1.1, 1.2), fixo=True, texto="AINDA É HIPÓTESE"),
    C("mas os animais", "pb_s4_agua_viva.mp4", 10, "real", zoom=(1.0, 1.15)),
])
