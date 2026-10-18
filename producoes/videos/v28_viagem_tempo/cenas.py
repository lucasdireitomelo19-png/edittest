import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 47.9
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
SAIDA = "short_viagem_tempo.mp4"
CREDITO = "NASA · Pixabay"
IT = "na_iss_terra.mp4"     # NASA: Terra vista da Estação Espacial (sem música)
ID = "na_iss_dentro.mp4"    # NASA: passeio dentro da Estação Espacial (versão limpa)
CENAS = montar(AQUI, [
    C("", "pb_s7_maquina_tempo.mp4", 3, "anim", zoom=(1.0, 1.15), rgb=True),
    C("e tem gente", ID, 270, "real", zoom=(1.0, 1.12)),
    C("einstein mostrou", "pb_s7_engrenagem.mp4", 1, "anim", zoom=(1.0, 1.15), texto="EINSTEIN · RELATIVIDADE"),
    C("quanto mais rapido", "pb_pov_rua.mp4", 2, "real", zoom=(1.0, 1.12), vel=2.0),
    C("mais devagar o seu", "pb_s7_relogio_parede.mp4", 10, "real", zoom=(1.1, 1.3), vel=0.4),
    C("na estacao espacial", IT, 1700, "real", zoom=(1.0, 1.1)),
    C("os astronautas", ID, 22, "real", zoom=(1.0, 1.12)),
    C("volta na terra", IT, 1760, "real", zoom=(1.0, 1.12), texto="1 VOLTA A CADA 90 MIN"),
    C("a vinte e oito mil", IT, 1820, "real", zoom=(1.0, 1.15), vel=2.0, conta=(0, 28000, " KM/H"), som=("hit", -14)),
    C("resultado", ID, 248, "real", zoom=(1.05, 1.2), flash=True),
    C("eles envelhecem", "pb_s7_relogio_parede.mp4", 3, "real", zoom=(1.0, 1.15), vel=0.6),
    C("o cosmonauta", IT, 2200, "real", zoom=(1.0, 1.12), texto="SERGEI KRIKALEV"),
    C("passou mais de", "pb_s7_ampulheta.mp4", 2, "real", zoom=(1.0, 1.15), conta=(0, 803, " DIAS NO ESPAÇO"), som=("hit", -14)),
    C("ele voltou cerca", "pb_s7_engrenagem.mp4", 5, "anim", zoom=(1.2, 1.4), flash=True, texto="+0,02 S NO FUTURO"),
    C("parece pouco", "a2_gps.mp4", 0, "anim", zoom=(1.0, 1.05), fixo=True),
    C("e por isso o relogio", "a2_gps.mp4", 4.3, "anim", zoom=(1.05, 1.12), fixo=True),
    C("se ninguem corrigisse", "pb_s7_celular.mp4", 3, "real", zoom=(1.0, 1.12)),
    C("o gps do seu", "pb_cidade_aerea.mp4", 3, "real", zoom=(1.0, 1.12), conta=(0, 10, " KM DE ERRO POR DIA"), som=("hit", -14)),
    C("entao sim", "pb_s7_buraco_minhoca.mp4", 4, "anim", zoom=(1.0, 1.15), texto="VIAGEM PRO FUTURO: REAL"),
    C("o problema e a volta", "pb_s7_relogio_volta.mp4", 1, "real", zoom=(1.0, 1.12), rgb=True),
    C("pro passado", "pb_s7_relogio_volta.mp4", 4, "real", zoom=(1.15, 1.3), apaga=0.6, texto="PRO PASSADO: SEM PASSAGEM"),
])
