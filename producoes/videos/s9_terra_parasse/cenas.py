import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False   # sem as etiquetas IMAGEM REAL / ANIMAÇÃO / ILUSTRAÇÃO neste vídeo
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_terra_parasse_61s.mp4"
CREDITO = "NASA (SVS e ISS) · vídeos Pixabay (créditos na descrição)"
TERRA = "sv_terra_girando.mp4"     # Terra girando com nuvens (NASA SVS 5570)
# animação 3D da rua (pipeline/anim/rua3d.html, renderizada por render_rua.js)
HEL = "nl_furacao_helene.mp4"      # furacão Helene visto da ISS (NASA)
CENAS = montar(AQUI, [
    C("", TERRA, 0, "anim", zoom=(1.3, 1.45)),
    C("mil e quinhentos", "pb_trafego.mp4", 2, "real", vel=1.5, texto="+1.500 KM/H"),
    C("e nem percebe", "pb_cidade_v.mp4", 4, "real", zoom=(1.0, 1.1)),
    C("e a terra girando", TERRA, 2, "anim", zoom=(1.5, 1.65), pan=(0.5, 0.58), texto="BRASIL: +1.500 KM/H"),
    C("no equador", TERRA, 8, "anim", zoom=(1.3, 1.4), texto="EQUADOR: 1.670 KM/H"),
    C("agora imagina que ela pare", "an_rua_pov.mp4", 0, "anim", zoom=(1.0, 1.0)),
    C("continua indo para o leste", "an_rua_baixa.mp4", 0, "anim", zoom=(1.0, 1.0), texto="PARA O LESTE"),
    C("pessoas", "an_rua_pessoas.mp4", 0, "anim", zoom=(1.0, 1.0)),
    C("carros", "an_rua_carros.mp4", 0, "anim", zoom=(1.0, 1.0)),
    C("arvores", "an_rua_arvores.mp4", 0, "anim", zoom=(1.0, 1.0)),
    C("quase o dobro", "pb_aviao.mp4", 3, "real", zoom=(1.0, 1.1), texto="2× UM AVIÃO"),
    C("o ar tambem", "pb_vento_arvores.mp4", 18, "real", zoom=(1.1, 1.2)),
    C("a atmosfera vira", HEL, 100, "real", zoom=(1.1, 1.2), texto="VENTOS DE +1.000 KM/H"),
    C("o furacao mais forte", HEL, 130, "real", zoom=(1.2, 1.3)),
    C("nao chega nem perto", "pb_tornado.mp4", 5, "real", zoom=(1.0, 1.1)),
    C("e os oceanos", "pb_ondas_tempestade.mp4", 3, "real", zoom=(1.05, 1.15)),
    C("em ondas gigantes", "pb_ondas.mp4", 4, "real", zoom=(1.0, 1.1)),
    C("e nao para por ai", TERRA, 20, "anim", zoom=(1.3, 1.4)),
    C("sem girar", "pb_por_do_sol.mp4", 3, "real", zoom=(1.0, 1.1), texto="1 DIA = 6 MESES"),
    C("e a noite", "pb_ceu_estrelas.mp4", 3, "real", zoom=(1.1, 1.2), texto="1 NOITE = 6 MESES"),
    C("com o tempo", "pb_icebergs.mp4", 10, "real", zoom=(1.05, 1.15), texto="ÁGUA NOS POLOS"),
    C("e no meio do planeta", "pb_deserto.mp4", 2, "real", zoom=(1.0, 1.1), texto="UM SUPERCONTINENTE"),
    C("a boa noticia", TERRA, 40, "anim", zoom=(1.3, 1.4)),
    C("a terra esta desacelerando", TERRA, 60, "anim", zoom=(1.4, 1.55), texto="~2 MILÉSIMOS DE SEGUNDO POR SÉCULO"),
    C("segue o perfil", "pb_via_lactea_v.mp4", 15, "real", zoom=(1.0, 1.1), texto="SIGA O PERFIL"),
])
