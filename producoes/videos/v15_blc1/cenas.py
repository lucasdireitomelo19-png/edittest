import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 45.0
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_blc1.mp4"
CREDITO = "ESO/M. Kornmesser, B. Tafreshi · NASA · Pixabay"
ALMA = "es_almatimelapse12f.mp4"   # antenas do ALMA sob a Lua e as Nuvens de Magalhães (ESO)
PB = "es_eso1629b.mp4"            # Proxima b (ESO/M. Kornmesser, ilustração)
PS = "es_eso1629c.mp4"            # superfície de Proxima b (ilustração)
PZ = "es_eso1629d.mp4"            # chegando a Proxima Centauri (ilustração)
PC = "es_eso1629e.mp4"            # Proxima Centauri na Via Láctea (ilustração)
ES = "an_l_espectro.mp4"          # espectrograma com o sinal estreito (animação própria)
CENAS = montar(AQUI, [
    C("", ALMA, 0, "real", zoom=(1.0, 1.15), texto="2019"),
    C("vindo da direcao", PZ, 20, "ilus", zoom=(1.0, 1.15), texto="DA ESTRELA MAIS PRÓXIMA"),
    C("e ele parecia", ES, 0, "anim", zoom=(1.0, 1.0), texto="ARTIFICIAL?"),
    C("o telescopio parkes", PC, 6, "ilus", zoom=(1.0, 1.15), texto="PROXIMA CENTAURI"),
    C("a quatro virgula", PC, 16, "ilus", zoom=(1.0, 1.15), texto="4,2 ANOS-LUZ"),
    C("uma estrela que tem", PB, 4, "ilus", zoom=(1.0, 1.15), texto="PROXIMA b"),
    C("na zona habitavel", PS, 3, "ilus", zoom=(1.0, 1.15), texto="ZONA HABITÁVEL"),
    C("entre os dados", "an_l_ruido.mp4", 0, "anim", zoom=(1.0, 1.0)),
    C("um sinal estreito", ES, 0.5, "anim", zoom=(1.0, 1.1), texto="UMA ÚNICA FREQUÊNCIA"),
    C("exatamente o tipo", ALMA, 10, "real", zoom=(1.0, 1.15)),
    C("e que a nossa tecnologia", "pb_circuito_tunel.mp4", 4, "anim", zoom=(1.0, 1.1), texto="TECNOLOGIA"),
    C("ele ganhou um nome", ES, 1.5, "anim", zoom=(1.1, 1.2), texto="BLC1"),
    C("candidato numero um", PZ, 23, "ilus", zoom=(1.0, 1.2), texto="BREAKTHROUGH LISTEN"),
    C("a noticia vazou", "pb_binario.mp4", 5, "anim", zoom=(1.0, 1.1), texto="2020: VAZOU"),
    C("mas os cientistas", ALMA, 4, "real", zoom=(1.0, 1.15)),
    C("tentaram derrubar", ES, 2.5, "anim", zoom=(1.0, 1.1), texto="TESTE ATRÁS DE TESTE"),
    C("em 2021", "pb_glitch_codigo.mp4", 2, "anim", zoom=(1.0, 1.1), texto="INTERFERÊNCIA HUMANA"),
    C("nao era um ola", PB, 20, "ilus", zoom=(1.0, 1.15), texto="NÃO ERA UM “OLÁ”"),
    C("mas mostrou uma coisa", "sv_terra_girando.mp4", 10, "anim", zoom=(1.3, 1.45)),
    C("o planeta inteiro", "sv_terra_girando.mp4", 40, "anim", zoom=(1.3, 1.45), texto="O PLANETA INTEIRO VAI SABER"),
])
