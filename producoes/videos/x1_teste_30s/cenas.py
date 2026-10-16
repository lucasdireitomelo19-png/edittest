import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "pipeline"))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FIM = 30.0
FINAL = "VOCÊ VÊ O PASSADO"
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_teste_30s.mp4"
CREDITO = "Vídeos: Pixabay/Kanenori · adege · Bernhard_Schuermann · ChristianBodhi"
VL, TL, LUA, SOL, CEU, AND = ("pb_via_lactea_v.mp4", "pb_estrelas_tl.mp4", "pb_lua_nuvens.mp4",
                              "pb_por_do_sol.mp4", "pb_ceu_estrelas.mp4", "pb_andromeda_cgi.mp4")
CENAS = montar(AQUI, [
    C("", VL, 2, "real", punch=1, zoom=(1.05, 1.25)),
    C("a luz demora", TL, 3, "real", zoom=(1.1, 1.3)),
    C("a luz da lua", LUA, 4, "real", texto="LUA: 1,3 s"),
    C("a do sol", SOL, 3, "real", texto="SOL: ~8 MIN"),
    C("se o sol apagasse", SOL, 9, "real", zoom=(1.2, 1.5), sat=0.6),
    C("voce so saberia", CEU, 2, "real", flash=1),
    C("a estrela mais proxima", CEU, 8, "real", zoom=(1.3, 1.6), texto="+4 ANOS-LUZ"),
    C("e a galaxia de andromeda", AND, 3, "anim", punch=1),
    C("esta a dois milhoes", AND, 10, "anim", zoom=(1.2, 1.5), texto="2,5 MILHÕES DE ANOS-LUZ"),
    C("a luz que chega dela", VL, 12, "real", zoom=(1.1, 1.35)),
    C("antes da nossa especie", VL, 18, "real", zoom=(1.35, 1.6), shake=3),
])
