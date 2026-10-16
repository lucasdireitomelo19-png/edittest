import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FIM = 30.0
FINAL = ""
def C(anc, src, tag="real", **k):
    return (anc, dict(src=src, tag=tag, **k))
SAIDA = "short_sol_emagrecendo_30s.mp4"
# Imagens do Openverse: NASA Goddard Photo and Video (Flickr, CC BY 2.0) — crédito obrigatório
CREDITO = "Imagens: NASA Goddard Photo and Video (CC BY 2.0) via Openverse"
CENAS = montar(AQUI, [
    C("", "ov_xflare.jpg", punch=1, zoom=(1.15, 1.45)),
    C("e rapido", "ov_flares.jpg", zoom=(1.3, 1.6), shake=4),
    C("no nucleo dele", "ov_ano.jpg", zoom=(1.1, 1.4)),
    C("cerca de seiscentos milhoes", "ov_flare2.jpg", zoom=(1.2, 1.45), texto="600 MILHÕES DE TONELADAS/S"),
    C("mas a conta nao fecha", "ov_love.jpg", zoom=(1.2, 1.4)),
    C("somem quatro milhoes", "ov_xflare.jpg", zoom=(1.6, 2.0), flash=1, texto="-4 MILHÕES DE TONELADAS"),
    C("por segundo", "ov_flares.jpg", zoom=(2.0, 2.4), shake=6, texto="POR SEGUNDO"),
    C("essa massa virou energia", "ov_cme.jpg", zoom=(1.05, 1.3)),
    C("e dela que vem a luz do sol", "ov_solterra.jpg", tag="ilus", zoom=(1.05, 1.2), pan=(0.25, 0.5)),
    C("e mesmo assim", "ov_terra.jpg", zoom=(1.0, 1.15)),
    C("o sol perdeu menos", "ov_sol_disco.jpg", zoom=(1.15, 1.35), texto="MENOS DE 0,1%"),
    C("ele e tao gigante", "ov_lua.jpg", zoom=(1.45, 1.3), pan=(0.5, 0.3)),
])
