import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
SAIDA = "short_nos_gritamos_61s.mp4"
CREDITO = "Imagens: ESO · NASA · Animações: Lado Sombrio do Universo"
FINAL = "VÍDEO COMPLETO\\NNO CANAL"
S = "eso_esocast203a.mp4"
CENAS = montar(os.path.dirname(os.path.abspath(__file__)), [
    ("", dict(src="an_floresta_fogueira.mp4", ss=1, tag="ilus", punch=1)),
    ("e foi de proposito", dict(src="an_binario.mp4", ss=4, tag="ilus", flash=1, zoom=(1.2, 1.4))),
    ("em 1974", dict(src=S, ss=53, tag="real", texto="1974")),
    ("disparou uma mensagem", dict(src="an_binario.mp4", ss=2.5, tag="ilus")),
    ("mil seiscentos e setenta", dict(src="an_binario.mp4", ss=3, tag="ilus", zoom=(1.4, 1.7), texto="1.679 BITS")),
    ("apontados para um aglomerado", dict(src=S, ss=477, tag="real", texto="25.000 ANOS-LUZ")),
    ("dentro dela o desenho", dict(src="hdi_earth.jpg", tag="real", zoom=(1.0, 1.2))),
    ("e a posicao da terra", dict(src="ns_earth_spin.mp4", ss=20)),
    ("tres anos depois as sondas voyager", dict(src="vg_5things.mp4", ss=135, tag="anim", texto="1977")),
    ("com discos de ouro", dict(src="vgi_record.jpg", fit=1, tag="real")),
    ("e um mapa para encontrar", dict(src="vg_5things.mp4", ss=120.5, tag="real")),
    ("e as nossas transmissoes", dict(src="an_bolha.mp4", ss=0, tag="ilus", zoom=(1.1, 1.0))),
    ("ha mais de cem anos", dict(src="an_bolha.mp4", ss=4, tag="ilus", texto="+100 ANOS-LUZ")),
    ("mas e se quem receber", dict(src="an_floresta_muitos.mp4", ss=0, tag="ilus")),
    ("em 2010 stephen hawking", dict(src="fl_hawking.jpg", fit=1, tag="real", texto="STEPHEN HAWKING")),
    ("como a chegada de colombo", dict(src="an_floresta_olhos.mp4", ss=2, tag="ilus")),
    ("e isso nao terminou bem", dict(src="an_floresta_tiro.mp4", ss=0.6, tag="ilus")),
    ("existe ate uma teoria assustadora", dict(src="an_floresta_calma.mp4", ss=0, tag="ilus")),
    ("cheia de cacadores em silencio", dict(src="an_floresta_muitos.mp4", ss=2, tag="ilus", zoom=(1.2, 1.35))),
    ("e que ate agora o unico", dict(src="an_floresta_fogueira.mp4", ss=2, tag="ilus", zoom=(1.0, 1.3))),
])
