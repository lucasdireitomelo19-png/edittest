import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
def C(anc, src, ss=0, tag=None, **k):
    d = dict(src=src, **k)
    if not src.endswith(".jpg"): d["ss"] = ss
    if tag: d["tag"] = tag
    return (anc, d)
SAIDA = "short_buraco_terra_61s.mp4"
CREDITO = "Animações: Lado Sombrio do Universo"
# todas as cenas são animações de pipeline/anim/buraco.html (render_anim.js ... buraco.html 1080 1920)
def A(anc, nome, z=(1.0, 1.06), **k):
    return C(anc, f"an_b_{nome}.mp4", 0, "anim", zoom=z, **k)
CENAS = montar(AQUI, [
    A("", "intro", texto="UM BURACO ATRAVÉS DA TERRA"),
    A("e voce pula", "pula"),
    A("nos primeiros segundos", "tunel_inicio"),
    A("mas voce nao para", "tunel_acelera", texto="ACELERANDO"),
    A("e tem um detalhe", "flutua"),
    A("sem peso nenhum", "flutua2", texto="SEM PESO"),
    A("la embaixo", "tunel_quente", texto="+5.000 °C"),
    A("tao quente quanto", "centro", texto="COMO A SUPERFÍCIE DO SOL"),
    A("e a pressao", "pressao", texto="3 MILHÕES × A PRESSÃO"),
    A("mas digamos", "flutua_quente"),
    A("voce passa pelo centro", "tunel_centro", texto="~29.000 KM/H"),
    A("e ai a gravidade", "puxa"),
    A("voce vai freando", "freando"),
    A("trinta e oito minutos", "38min", texto="38 MINUTOS"),
    A("mas voce nao fica la", "volta"),
    A("e vai e volta", "vaivem", texto="PARA SEMPRE"),
    A("na vida real", "amortece", texto="O AR TE FREIA"),
    A("e tem mais", "rotacao", texto="A TERRA GIRA"),
    A("a nao ser que", "intro", texto="SÓ DE POLO A POLO"),
    A("segue o perfil", "final", texto="SIGA O PERFIL"),
])
