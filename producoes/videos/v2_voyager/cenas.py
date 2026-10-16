SAIDA = "voyager1_61s.mp4"
CREDITO = "Imagens: NASA/JPL-Caltech · ESA/Hubble"
FINAL = "NÓS EXISTIMOS."
PBD = (790, 364, 700, 1244)        # recorte centrado no Pálido Ponto Azul
CONCEITO = (245, 0, 893, 1587)     # Voyager sobre a Via Láctea
CENAS = [
    dict(t=0.0,  src="vgi_concept.jpg",    crop=CONCEITO, tag="ilus", punch=1, shake=3, zoom=(1.1, 1.3)),
    dict(t=1.5,  src="vg_5things.mp4",     ss=135.0, tag="anim", texto="26 BILHÕES DE KM"),
    dict(t=3.2,  src="vgi_dsn.jpg",        crop=(1100, 0, 810, 1440), tag="real", zoom=(1.05, 1.25)),
    dict(t=6.0,  src="vgi_model.jpg",      fit=1, tag="ilus", zoom=(1.0, 1.25)),
    dict(t=7.6,  src="vgi_launch.jpg",     tag="real", pan=(0.5, 0.25), texto="1977", shake=3),
    dict(t=9.8,  src="vgi_concept.jpg",    crop=CONCEITO, tag="ilus", zoom=(1.6, 1.9), pan=(0.45, 0.3), texto="MENOS QUE UM CELULAR"),
    dict(t=12.6, src="vg_jupiter.mp4",     ss=0.0, tag="real", texto="JÚPITER"),
    dict(t=13.9, src="vgi_saturn.jpg",     fit=1, tag="real", zoom=(1.0, 1.15), texto="SATURNO"),
    dict(t=14.8, src="vg_chase.mp4",       ss=125.0, tag="anim"),
    dict(t=16.4, src="vgi_interstellar.jpg", crop=(982, 0, 608, 1080), tag="ilus", texto="1990"),
    dict(t=19.0, src="vgi_pbd.jpg",        crop=PBD, tag="real", zoom=(1.0, 1.8)),
    dict(t=21.9, src="vgi_pbd.jpg",        crop=PBD, tag="real", zoom=(2.2, 3.2), texto="ESSA É A TERRA", circulo=1),
    dict(t=23.6, src="vg_spedup.mp4",      ss=80.0, tag="anim", texto="2012"),
    dict(t=26.4, src="vg_5things.mp4",     ss=38.0, tag="anim"),
    dict(t=29.3, src="vgi_dsn.jpg",        crop=(0, 0, 810, 1440), tag="real", zoom=(1.25, 1.05), texto="QUASE 24 H"),
    dict(t=32.7, src="vgi_concept.jpg",    crop=CONCEITO, tag="ilus", zoom=(1.3, 1.6), pan=(0.4, 0.25), texto="22 WATTS"),
    dict(t=35.3, src="vg_team.mp4",        ss=2.0, tag="real", sat=0.7, texto="2023"),
    dict(t=37.4, src="vg_team.mp4",        ss=8.0, tag="real", sat=0.7, zoom=(1.3, 1.5), pan=(0.3, 0.5)),
    dict(t=39.3, src="vg_team.mp4",        ss=14.6, tag="real", flash=1),
    dict(t=41.1, src="vg_team.mp4",        ss=29.0, tag="real", pan=(0.6, 0.5)),
    dict(t=42.9, src="vgi_concept.jpg",    crop=CONCEITO, tag="ilus", sat=0.5, zoom=(1.3, 1.05)),
    dict(t=45.2, src="vg_5things.mp4",     ss=135.5, tag="anim", sat=0.6, vel=0.6),
    dict(t=47.6, src="vgi_record.jpg",     fit=1, tag="real", zoom=(1.05, 1.3)),
    dict(t=49.5, src="vg_5things.mp4",     ss=120.5, tag="real", texto="55 LÍNGUAS"),
    dict(t=52.8, src="vg_5things.mp4",     ss=82.0, tag="anim", texto="40.000 ANOS"),
    dict(t=54.4, src="hd_zoom.mp4",        ss=44.0, tag="anim"),
    dict(t=56.7, src="vgi_pbd.jpg",        crop=PBD, tag="real", zoom=(3.0, 1.0)),
]
