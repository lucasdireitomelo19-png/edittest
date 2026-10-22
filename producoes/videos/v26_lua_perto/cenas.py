import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 44.6
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
SAIDA = "short_lua_perto.mp4"
CREDITO = "ESO/G. Hüdepohl · NASA · Pixabay"
LV = "a2_lua_vem.mp4"      # animação própria: Lua se aproximando da Terra
CENAS = montar(AQUI, [
    C("", "pb_s5_lua_nasce.mp4", 6, "real", zoom=(1.0, 1.15)),
    C("hoje ela esta", "pb_lua_cheia.mp4", 4, "real", zoom=(1.0, 1.12), conta=(0, 384000, " KM"), som=("hit", -14)),
    C("se viesse pra metade", LV, 0, "anim", zoom=(1.0, 1.05), fixo=True, texto="METADE DA DISTÂNCIA"),
    C("as mares seriam", "pb_ondas_tempestade.mp4", 3, "real", zoom=(1.0, 1.15), texto="8× MAIS MARÉ", som=("hit", -14)),
    C("o mar invadiria", "pb_en_poa.mp4", 8, "real", zoom=(1.0, 1.12)),
    C("duas vezes por dia", "pb_en_poa2.mp4", 5, "real", zoom=(1.0, 1.12), texto="2× POR DIA"),
    C("mais perto ainda", LV, 1.8, "anim", zoom=(1.05, 1.12), fixo=True),
    C("a propria crosta", "pb_s5_casas_terremoto.mp4", 6, "real", zoom=(1.05, 1.15), shake=12),
    C("terremotos e vulcoes", "pb_s1_vulcao.mp4", 8, "real", zoom=(1.0, 1.15), shake=10, flash=True),
    C("e a uns dez mil", LV, 1.5, "anim", zoom=(1.2, 1.3), fixo=True, conta=(0, 10000, " KM")),
    C("a gravidade da terra", "a2_lua_rasga.mp4", 0, "anim", zoom=(1.0, 1.06), fixo=True, rgb=True),
    C("ela viraria um anel", "a2_anel.mp4", 1, "anim", zoom=(1.0, 1.08), fixo=True, texto="ANEL DE ROCHAS"),
    C("parece ficcao", "pb_s5_lua_nasce.mp4", 16, "real", zoom=(1.0, 1.15)),
    C("mas logo depois", "pb_lava.mp4", 3, "real", zoom=(1.0, 1.15)),
    C("a lua estava muito", LV, 1.2, "anim", zoom=(1.25, 1.35), fixo=True, texto="GIGANTE NO CÉU"),
    C("e desde entao", "pb_s1_lua_noite.mp4", 2, "real", zoom=(1.3, 1.05)),
    C("tres virgula oito", "es_laser.mp4", 46, "real", zoom=(1.0, 1.12), conta=(0, 3.8, " CM POR ANO"), som=("hit", -14)),
    C("a gente sabe disso", "es_laser.mp4", 140, "real", zoom=(1.0, 1.15)),
    C("astronautas da apollo", "pb_lua_cheia.mp4", 15, "real", zoom=(1.5, 1.7), texto="ESPELHOS DA APOLLO NA LUA"),
    C("ate hoje disparamos", "es_lasers_paranal.mp4", 300, "real", zoom=(1.0, 1.15), flash=True),
    C("um dia", "na_eclipse.mp4", 33.5, "real", zoom=(1.0, 1.12)),
    C("eclipses totais", "na_eclipse.mp4", 37.5, "real", zoom=(1.05, 1.2), apaga=0.6, texto="ADEUS, ECLIPSE TOTAL"),
])
