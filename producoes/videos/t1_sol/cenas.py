import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FIM = 30.0
FINAL = ""
def C(anc, src, tag="real", **k):
    return (anc, dict(src=src, tag=tag, **k))
SAIDA = "short_sol_emagrecendo_30s.mp4"
# Imagens do Openverse: NASA Goddard Photo and Video (Flickr, CC BY 2.0) — crédito obrigatório
CREDITO = "Vídeos: NASA/SDO · Imagens: NASA Goddard (CC BY 2.0) via Openverse"
FL, F3, F1, A3, A1, A131 = "sv_flare131.mp4", "sv_feb304.mp4", "sv_feb171.mp4", "sv_304.mp4", "sv_171.mp4", "sv_131.mp4"
def Vd(anc, src, ss, **k): return C(anc, src, ss=ss, **k)
CENAS = montar(AQUI, [
    Vd("", FL, 4.5, punch=1, zoom=(1.2, 1.5)),
    Vd("e rapido", F3, 100, zoom=(1.5, 1.8), shake=4),
    Vd("no nucleo dele", F1, 50, zoom=(1.15, 1.4)),
    Vd("cerca de seiscentos milhoes", A131, 10, zoom=(1.6, 1.9), texto="600 MILHÕES DE TONELADAS/S"),
    Vd("mas a conta nao fecha", A1, 20, zoom=(1.5, 1.8)),
    Vd("somem quatro milhoes", FL, 5.6, zoom=(1.9, 2.3), texto="-4 MILHÕES DE TONELADAS"),
    Vd("por segundo", A3, 30, zoom=(2.0, 2.4), shake=6, texto="POR SEGUNDO"),
    C("essa massa virou energia", "ov_cme.jpg", zoom=(1.05, 1.3)),
    C("e dela que vem a luz do sol", "ov_solterra.jpg", tag="ilus", zoom=(1.05, 1.2), pan=(0.25, 0.5)),
    C("e mesmo assim", "ov_terra.jpg", zoom=(1.0, 1.15)),
    Vd("o sol perdeu menos", F3, 250, zoom=(1.15, 1.35), texto="MENOS DE 0,1%"),
    Vd("ele e tao gigante", F1, 280, zoom=(1.05, 1.2)),
])
