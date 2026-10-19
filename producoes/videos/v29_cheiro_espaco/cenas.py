import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 42.8
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
SAIDA = "short_cheiro_espaco.mp4"
CREDITO = "NASA · ESO/ALMA · Pixabay"
CW = "na_caminhada.mp4"         # NASA: caminhada espacial (planos sem texto: 0–8 s e 90–100 s)
ID = "na_iss_dentro.mp4"        # NASA: dentro da Estação Espacial
GC = "es_quimica_centro.mp4"    # ESO/ALMA: nuvens moleculares no centro da galáxia
CENAS = montar(AQUI, [
    C("", CW, 1, "real", zoom=(1.0, 1.15)),
    C("e nao e o que", "pb_estrelas_tl.mp4", 3, "real", zoom=(1.0, 1.12)),
    C("no vacuo", CW, 92, "real", zoom=(1.0, 1.12), texto="NO VÁCUO, NENHUM CHEIRO"),
    C("mas quando os astronautas", CW, 4, "real", zoom=(1.1, 1.25)),
    C("e tiram o capacete", ID, 560, "real", zoom=(1.0, 1.12)),
    C("uns descrevem", "pb_s8_bife.mp4", 3, "real", zoom=(1.0, 1.15), texto="CARNE GRELHADA"),
    C("outros metal", "pb_s8_solda.mp4", 8, "real", zoom=(1.0, 1.15), texto="METAL QUENTE · SOLDA", flash=True),
    C("um deles disse", "pb_s8_biscoito.mp4", 4, "real", zoom=(1.0, 1.15), texto="BISCOITO DE AMÊNDOA QUEIMADO"),
    C("a hipotese mais citada", "pb_atomo.mp4", 2, "anim", zoom=(1.0, 1.15), texto="HIPÓTESE: OXIGÊNIO"),
    C("e reagem quando", ID, 300, "real", zoom=(1.0, 1.12)),
    C("na lua", "na_lua_apollo17.mp4", 2, "real", zoom=(1.0, 1.12), rgb=True),
    C("os astronautas da apollo", "na_lua_apollo17.mp4", 16, "real", zoom=(1.0, 1.15), texto="POEIRA LUNAR"),
    C("cheiro de polvora", "pb_s8_fumaca.mp4", 6, "real", zoom=(1.0, 1.15), texto="PÓLVORA QUEIMADA", som=("hit", -14)),
    C("e perto do centro", GC, 27, "real", zoom=(1.0, 1.15), texto="CENTRO DA GALÁXIA"),
    C("com uma molecula", GC, 50, "real", zoom=(1.1, 1.25)),
    C("framboesa", "pb_s8_framboesa.mp4", 2, "real", zoom=(1.0, 1.15), texto="FRAMBOESA + RUM"),
    C("e o aroma do rum", "pb_s8_copo.mp4", 10, "real", zoom=(1.0, 1.15)),
    C("a nasa levou", ID, 22, "real", zoom=(1.0, 1.12)),
    C("uma fragrancia", "pb_s8_perfume.mp4", 1, "real", zoom=(1.0, 1.15), texto="FRAGRÂNCIA DO ESPAÇO"),
    C("hoje ate da", "pb_s8_perfume.mp4", 5, "real", zoom=(1.15, 1.3)),
])
