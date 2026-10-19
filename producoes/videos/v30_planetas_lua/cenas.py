import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 41.0
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
SAIDA = "short_planetas_lua.mp4"
CREDITO = "NASA · ESO/G. Hüdepohl · Pixabay"
CENAS = montar(AQUI, [
    C("", "a2_planetas_todos.mp4", 0, "anim", zoom=(1.0, 1.04), fixo=True),
    C("cabem entre", "na_iss_terra.mp4", 1780, "real", zoom=(1.0, 1.12)),
    C("parece mentira", "pb_s1_lua_noite.mp4", 8, "real", zoom=(1.0, 1.15)),
    C("a distancia media", "pb_s5_lua_nasce.mp4", 10, "real", zoom=(1.0, 1.12), conta=(0, 384400, " KM"), som=("hit", -14)),
    C("agora enfileira", "a2_planetas.mp4", 0, "anim", zoom=(1.0, 1.03), fixo=True, vel=1.25),
    C("somando os diametros", "a2_planetas_todos.mp4", 0, "anim", zoom=(1.0, 1.04), fixo=True, conta=(0, 380010, " KM"), som=("hit", -14)),
    C("sobram uns", "a2_planetas_todos.mp4", 1.5, "anim", zoom=(1.05, 1.1), fixo=True, texto="SOBRAM ~4.400 KM"),
    C("da ate pra", "pb_via_lactea_v.mp4", 8, "real", zoom=(1.0, 1.15), texto="CABE ATÉ PLUTÃO"),
    C("mas tem dois", "pb_estrelas_tl.mp4", 5, "real", zoom=(1.0, 1.12), flash=True),
    C("primeiro saturno", "na_saturno_aneis.mp4", 5, "anim", zoom=(1.0, 1.12)),
    C("com eles nao cabe", "a2_planetas_aneis.mp4", 0, "anim", zoom=(1.0, 1.04), fixo=True, rgb=True, texto="COM ANÉIS: NÃO CABE"),
    C("segundo a orbita", "pb_s1_lua_noite.mp4", 4, "real", zoom=(1.1, 1.3)),
    C("quando ela chega", "a2_planetas_perigeu.mp4", 0, "anim", zoom=(1.0, 1.04), fixo=True, conta=(384400, 356500, " KM"), som=("hit", -14)),
    C("os planetas nao cabem", "a2_planetas_perigeu.mp4", 2, "anim", zoom=(1.05, 1.1), fixo=True, texto="NO PERIGEU: NÃO CABE"),
    C("entao a resposta", "pb_s6_calendario.mp4", 3, "anim", zoom=(1.0, 1.12), texto="DEPENDE DO DIA"),
    C("e a luz", "es_laser.mp4", 200, "real", zoom=(1.0, 1.15), texto="LUZ: ~1,3 S"),
])
