import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
SAIDA = "short_sinal_wow_61s.mp4"
CREDITO = "Imagens: ESO · NASA · Animações: Lado Sombrio do Universo"
FINAL = "VÍDEO COMPLETO\\NNO CANAL"
S = "eso_esocast203a.mp4"
CENAS = montar(os.path.dirname(os.path.abspath(__file__)), [
    ("", dict(src="an_wow.mp4", ss=2.5, tag="ilus", punch=1, zoom=(1.3, 1.4))),
    ("vindo do espaco", dict(src="eso_almatimelapse12f.mp4", ss=2, tag="real")),
    ("e ate hoje ninguem sabe", dict(src=S, ss=172, tag="real", flash=1)),
    ("o radiotelescopio big ear", dict(src="eso_almatimelapse12i.mp4", ss=2, tag="real", texto="OHIO · 1977")),
    ("varria o ceu em busca", dict(src="eso_paotrailer-notext.mp4", ss=129, tag="real")),
    ("dias depois o astronomo", dict(src="an_wow.mp4", ss=0, tag="ilus", zoom=(1.0, 1.15))),
    ("e encontrou uma sequencia", dict(src="an_wow.mp4", ss=0.5, tag="ilus", zoom=(1.5, 1.9), pan=(0.62, 0.5), texto="6EQUJ5")),
    ("era um sinal fortissimo", dict(src="eso_eso2208-eht-mwb.mp4", ss=12, tag="real", shake=4)),
    ("perto da frequencia do hidrogenio", dict(src=S, ss=384, tag="real", texto="1420 MHz · HIDROGÊNIO")),
    ("justamente onde os cientistas", dict(src="eso_almatimelapse12d.mp4", ss=4, tag="real")),
    ("ehman circulou a sequencia", dict(src="an_wow.mp4", ss=1.8, tag="ilus", zoom=(1.3, 1.5), pan=(0.55, 0.45))),
    ("o sinal durou setenta e dois", dict(src="an_wow.mp4", ss=4, tag="ilus", zoom=(1.15, 1.3), pan=(0.6, 0.5), texto="72 SEGUNDOS")),
    ("e os astronomos voltaram", dict(src="eso_almatimelapse12f.mp4", ss=8, tag="real")),
    ("dezenas de vezes", dict(src="eso_paotrailer-notext.mp4", ss=85, tag="real")),
    ("nada", dict(src="an_apagando.mp4", ss=0, tag="anim", flash=1)),
    ("ele nunca mais se repetiu", dict(src="an_apagando.mp4", ss=3, tag="anim", zoom=(1.2, 1.4))),
    ("talvez tenha sido uma interferencia", dict(src=S, ss=398, tag="real")),
    ("ou talvez alguem tenha falado", dict(src="an_floresta_olhos.mp4", ss=0, tag="ilus")),
    ("e depois aprendido a ficar", dict(src="an_floresta_calma.mp4", ss=1, tag="ilus", zoom=(1.0, 1.25))),
])
