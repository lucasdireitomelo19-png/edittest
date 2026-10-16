import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
SAIDA = "short_floresta_escura_61s.mp4"
CREDITO = "Imagens: ESO · Animações: Lado Sombrio do Universo"
FINAL = "VÍDEO COMPLETO\\NNO CANAL"
S = "eso_esocast203a.mp4"
CENAS = montar(os.path.dirname(os.path.abspath(__file__)), [
    ("", dict(src="an_floresta_olhos.mp4", ss=1, tag="ilus", punch=1, shake=3)),
    ("por que nunca encontramos", dict(src="an_apagando.mp4", ss=1, tag="anim")),
    ("e ela e aterrorizante", dict(src="an_floresta_tiro.mp4", ss=1.0, tag="ilus")),
    ("imagina uma floresta escura", dict(src="an_floresta_calma.mp4", ss=0, tag="ilus")),
    ("dentro dela cacadores armados", dict(src="an_floresta_olhos.mp4", ss=3, tag="ilus")),
    ("cada um sabe que nao esta sozinho", dict(src="an_floresta_muitos.mp4", ss=1, tag="ilus")),
    ("mas ninguem sabe quem sao", dict(src="an_floresta_muitos.mp4", ss=4, tag="ilus", zoom=(1.3, 1.5), pan=(0.3, 0.6))),
    ("se voce encontrar alguem", dict(src="an_floresta_olhos.mp4", ss=5, tag="ilus", zoom=(1.2, 1.4))),
    ("ele pode ser pacifico", dict(src="an_floresta_olhos.mp4", ss=4, tag="ilus", zoom=(1.4, 1.7), pan=(0.25, 0.6), texto="AMIGO OU INIMIGO?")),
    ("uma mensagem entre duas", dict(src="eso_esocast203a.mp4", ss=570, tag="anim", texto="SÉCULOS")),
    ("e nesse tempo quem era", dict(src=S, ss=504, tag="real")),
    ("por isso segundo essa ideia", dict(src="eso_eso2208-eht-mwb.mp4", ss=14, tag="real")),
    ("se esconder", dict(src="an_apagando.mp4", ss=2.5, tag="anim", texto="SE ESCONDER")),
    ("e se encontrar outra", dict(src="an_floresta_tiro.mp4", ss=1.0, tag="ilus", flash=1, texto="ELIMINAR PRIMEIRO")),
    ("e a teoria da floresta negra", dict(src="an_floresta_calma.mp4", ss=3, tag="ilus", texto="TEORIA DA FLORESTA NEGRA")),
    ("no livro que inspirou", dict(src=S, ss=133, tag="real")),
    ("e so uma hipotese", dict(src=S, ss=543, tag="real")),
    ("nao e que nao exista", dict(src="eso_paotrailer-notext.mp4", ss=41, tag="real")),
    ("e que todos aprenderam", dict(src="an_apagando.mp4", ss=4, tag="anim")),
    ("todos menos nos", dict(src="an_floresta_fogueira.mp4", ss=1, tag="ilus", zoom=(1.0, 1.3))),
])
