import os, sys; sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from ancoras import montar
AQUI = os.path.dirname(os.path.abspath(__file__))
FINAL = "SIGA PARA MAIS"
FIM = 50.3
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
SAIDA = "short_elevador.mp4"
CREDITO = "NASA · Pixabay"
EL = "a2_elevador.mp4"        # animação própria: cabo do equador até além da órbita geoestacionária
CENAS = montar(AQUI, [
    C("", "pb_s3_burj_v.mp4", 2, "real", zoom=(1.0, 1.15)),
    C("o espaco comeca", "pb_s3_foguete.mp4", 6, "real", zoom=(1.0, 1.12), conta=(0, 100, " KM"), som=("hit", -14)),
    C("o predio mais alto", "pb_s3_burj.mp4", 2, "real", zoom=(1.0, 1.12), conta=(0, 828, " M")),
    C("seria preciso empilhar", "pb_s3_burj_v.mp4", 12, "real", zoom=(1.1, 1.3), conta=(0, 121, " PRÉDIOS"), som=("hit", -14)),
    C("mas chegar", "pb_s3_nuvens_cima.mp4", 4, "real", zoom=(1.0, 1.12)),
    C("la em cima voce", "na_iss_terra.mp4", 400, "real", zoom=(1.0, 1.12), texto="97% DA GRAVIDADE"),
    C("pra ficar em orbita", EL, 0, "anim", zoom=(1.0, 1.04), fixo=True, conta=(0, 36000, " KM"), som=("hit", -14)),
    C("e ai a ideia muda", EL, 4.7, "anim", zoom=(1.05, 1.12), fixo=True, flash=True, texto="UM CABO"),
    C("preso no equador", EL, 1.2, "anim", zoom=(1.12, 1.2), fixo=True, texto="PRESO NO EQUADOR"),
    C("esticado pela rotacao", "na_iss_terra.mp4", 600, "real", zoom=(1.0, 1.12), vel=2.0),
    C("com um contrapeso", EL, 6, "anim", zoom=(1.0, 1.1), fixo=True, texto="CONTRAPESO"),
    C("um elevador espacial", "pb_s3_elevador.mp4", 3, "real", zoom=(1.0, 1.15), texto="ELEVADOR ESPACIAL"),
    C("subindo a duzentos", "a2_elevador_cabine.mp4", 0, "anim", zoom=(1.0, 1.06), fixo=True, conta=(0, 200, " KM/H")),
    C("a viagem ate la", "a2_elevador_cabine.mp4", 2.5, "anim", zoom=(1.0, 1.08), fixo=True, texto="+7 DIAS DE VIAGEM"),
    C("o problema", "pb_s3_laboratorio.mp4", 3, "real", zoom=(1.0, 1.12)),
    C("nenhum material", "pb_s3_cabo_ponte.mp4", 2, "real", zoom=(1.0, 1.15)),
    C("um cabo de aco", "a2_elevador_rompe.mp4", 0, "anim", zoom=(1.0, 1.06), fixo=True, rgb=True, flash=True, texto="AÇO: ROMPE"),
    C("os nanotubos", "pb_s3_nano.mp4", 2, "anim", zoom=(1.0, 1.15), texto="NANOTUBOS DE CARBONO"),
    C("mas ate hoje", "pb_s3_laboratorio.mp4", 12, "real", zoom=(1.1, 1.25), texto="RECORDE: MEIO METRO"),
])
