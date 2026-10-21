# Gerado por gerar_cenas.py a partir de plano.py. Ver producoes/15_fim_do_mundo.md.
FIM = 506.0
SAIDA = "fim_do_mundo.mp4"
FINAL = ""
MAX_PLANO = 9.0
MUSICA = "musica.wav"
MUSICA_DB = -14
ANIM_PAGE = "mundo.html"

CENAS = [
    ('sessenta e seis milhoes de anos atras', {'src': 'fm_148042.mp4', 'tag': 'real', 'credito': 'Pixabay/digifinio', 'texto': '66 MILHÕES DE ANOS ATRÁS'}),  # 1 Floresta tropical vista de cima: uma tarde qualquer
    ('o mundo acabou', {'src': 'anim:ab_risco', 'tag': 'anim'}),  # 2 Céu do Cretáceo: um ponto de luz riscando por cima das samambaias
    ('uma pedra do tamanho de uma cidade', {'src': 'anim:ab_escala', 'tag': 'anim'}),  # 3 Rocha de 10 km ao lado do Everest e de uma cidade
    ('e tres de cada quatro especies', {'src': 'anim:ab_especies', 'tag': 'anim'}),  # 4 100 pontos, 75 se apagam
    ('nao foi a primeira vez', {'src': 'fm_347276.mp4', 'tag': 'ilus', 'credito': 'Pixabay/kykr'}),  # 5 Esqueleto fóssil de T. rex (ilustração 3D)
    ('e nao vai ser a ultima', {'src': 'fm_308799.mp4', 'tag': 'real', 'credito': 'Pixabay/Solarselle77'}),  # 6 Borda da Terra vista do espaço
    ('neste video voce vai conhecer', {'src': 'anim:ab_titulo', 'tag': 'anim'}),  # 7 Título: 5 MANEIRAS DE O MUNDO ACABAR
    ('uma delas dorme debaixo de um parque', {'src': 'fm_239481.mp4', 'tag': 'real', 'credito': 'Pixabay/Cal_Captures'}),  # 8 Rio de Yellowstone com névoa
    ('outra e garantida', {'ss': 60.0, 'src': 'na_sdo_ano7.mp4', 'crop': [0, 0, 1074, 1080], 'tag': 'real', 'credito': 'NASA/SDO'}),  # 9 O Sol real (SDO/NASA), cortado sem o gráfico
    ('e a ultima e tao estranha', {'src': 'anim:ab_teaser', 'tag': 'anim'}),  # 10 Uma bolha estranha no céu, com '?'
    ('vamos em contagem regressiva', {'src': 'anim:ab_contagem', 'tag': 'anim'}),  # 11 5 4 3 2 1 com os ícones
    ('comecando debaixo dos nossos pes', {'src': 'fm_165042.mp4', 'tag': 'real', 'credito': 'Pixabay/Gylfi'}),  # 12 Lava de perto
    ('numero cinco o supervulcao', {'p': {'num': 5, 'titulo': 'SUPERVULCÃO', 'tema': 'vulcao', 'c1': '#3a1a10'}, 'capitulo': '5 · Supervulcão', 'src': 'anim:cap', 'tag': 'anim'}),  # 13 Cartão do capítulo 5 (cinza caindo)
    ('um vulcao comum explode', {'src': 'fm_152085.mp4', 'tag': 'real', 'credito': 'Pixabay/Gylfi'}),  # 14 Erupção na Islândia
    ('um supervulcao e outra coisa', {'src': 'fm_151217.mp4', 'tag': 'real', 'credito': 'Pixabay/lithepictures'}),  # 15 Cratera vulcânica coberta de floresta (vista aérea)
    ('e uma camara de magma tao grande', {'src': 'anim:v_camara', 'tag': 'anim'}),  # 16 Corte: câmara de magma esvazia e o chão afunda (caldeira)
    ('o mais famoso fica embaixo', {'src': 'anim:v_mapa', 'tag': 'anim'}),  # 17 Mapa real: zoom até Yellowstone
    ('os geiseres e as piscinas coloridas', {'src': 'anim:v_geiser', 'tag': 'anim'}),  # 18 Corte: gêiseres e piscinas aquecidos pelo magma
    ('e yellowstone ja teve tres', {'src': 'fm_283718.mp4', 'tag': 'real', 'credito': 'Pixabay/coldwindsofsorrow', 'texto': 'YELLOWSTONE'}),  # 19 Yellowstone real (Gibbon Falls)
    ('ha dois milhoes e cem mil', {'p': {'ts': [0.15, 1.85, 3.86]}, 'src': 'anim:v_linha', 'tag': 'anim'}),  # 20 Linha do tempo: 2,1 mi · 1,3 mi · 640 mil anos
    ('o problema de uma supererupcao', {'src': 'fm_97289.mp4', 'tag': 'real', 'credito': 'Pixabay/VP68'}),  # 21 Erupção noturna (La Palma)
    ('e a cinza', {'src': 'fm_311626.mp4', 'tag': 'real', 'credito': 'Pixabay/doktorkleinmusic'}),  # 22 Coluna de cinza saindo de um vulcão
    ('ela cobriria boa parte', {'src': 'anim:v_cinza', 'tag': 'anim'}),  # 23 Mapa: nuvem de cinza se espalhando pelos EUA (ilustrativo)
    ('e o enxofre jogado', {'src': 'fm_37079.mp4', 'tag': 'real', 'credito': 'Pixabay/Ronin_Studio_Munich'}),  # 24 Cratera do Ijen com gases de enxofre
    ('bloquearia parte da luz', {'src': 'fm_2106.mp4', 'tag': 'real', 'credito': 'Pixabay/janeb13'}),  # 25 Nuvens escuras cobrindo o céu
    ('seria um inverno vulcanico', {'src': 'fm_63281.mp4', 'tag': 'real', 'credito': 'Pixabay/Simon'}),  # 26 Nevasca nas montanhas
    ('anos mais frios e colheitas', {'src': 'fm_43760.mp4', 'tag': 'real', 'credito': 'Pixabay/NickyPe'}),  # 27 Plantação de cevada ao vento
    ('a gente ja teve uma amostra disso', {'src': 'anim:v_tambora', 'tag': 'anim'}),  # 28 Mapa real: zoom até o Tambora, 1815
    ('e ele nem era um supervulcao', {'src': 'fm_38361.mp4', 'tag': 'real', 'credito': 'Pixabay/Ronin_Studio_Munich'}),  # 29 Vulcões da Indonésia ao entardecer (contexto)
    ('mesmo assim no ano seguinte', {'src': 'fm_1225.mp4', 'tag': 'real', 'credito': 'Pixabay/TBIT'}),  # 30 Neve caindo sobre campo
    ('e a europa passou fome', {'src': 'anim:v_1816', 'tag': 'anim'}),  # 31 Calendário de junho de 1816 com neve: O ANO SEM VERÃO
    ('ha uns setenta e quatro mil anos', {'src': 'fm_254367.mp4', 'tag': 'real', 'credito': 'Pixabay/Akhira_Fajar', 'texto': 'LAGO TOBA · INDONÉSIA'}),  # 32 Lago Toba hoje (a caldeira do supervulcão)
    ('fez uma erupcao muitas vezes maior', {'src': 'anim:v_volume', 'tag': 'anim'}),  # 33 Esferas: Tambora x Toba (ilustrativo)
    ('por muito tempo se achou', {'src': 'fm_257593.mp4', 'tag': 'real', 'credito': 'Pixabay/JoshuaWoroniecki'}),  # 34 Fogueira à noite
    ('hoje escavacoes na africa do sul', {'src': 'fm_243399.mp4', 'tag': 'real', 'credito': 'Pixabay/CanopyFalls'}),  # 35 Caverna no litoral (como a de Pinnacle Point)
    ('comendo frutos do mar', {'src': 'fm_153849.mp4', 'tag': 'real', 'credito': 'Pixabay/Kmeel_com'}),  # 36 Conchas na areia
    ('e yellowstone o servico geologico', {'src': 'fm_125806.mp4', 'tag': 'real', 'credito': 'Pixabay/Gylfi'}),  # 37 Fumarola e fontes termais
    ('em uma em setecentos e trinta mil', {'src': 'anim:v_chance', 'tag': 'anim'}),  # 38 1 EM 730.000 POR ANO
    ('e os cientistas nem tem certeza', {'src': 'fm_168670.mp4', 'tag': 'real', 'credito': 'Pixabay/Gylfi'}),  # 39 Fonte termal com vapor
    ('um supervulcao pode derrubar', {'src': 'fm_343478.mp4', 'tag': 'real', 'credito': 'Pixabay/monirulislam_bd'}),  # 40 Cidade vista de cima ao entardecer
    ('pra isso a ameaca precisa vir de cima', {'src': 'fm_31569.mp4', 'tag': 'real', 'credito': 'Pixabay/Relaxing_Guru'}),  # 41 Céu estrelado com a Via Láctea
    ('numero quatro o asteroide', {'p': {'num': 4, 'titulo': 'O ASTEROIDE', 'tema': 'rocha', 'c1': '#2a1a2a'}, 'capitulo': '4 · O Asteroide', 'src': 'anim:cap', 'tag': 'anim'}),  # 42 Cartão do capítulo 4 (riscos de meteoro)
    ('voltando aquela tarde', {'src': 'fm_234735.mp4', 'tag': 'real', 'credito': 'Pixabay/Axwax666'}),  # 43 Selva e montanhas
    ('uma rocha de uns dez quilometros', {'src': 'anim:a_mapa', 'tag': 'anim'}),  # 44 Mapa real: impacto em Chicxulub, Iucatã
    ('a uns vinte quilometros por segundo', {'src': 'anim:a_veloc', 'tag': 'anim'}),  # 45 Velocímetro: 20 km/s ≈ 72.000 km/h
    ('o impacto libera uma energia', {'src': 'anim:a_energia', 'tag': 'anim'}),  # 46 Contador até 1 bilhão de bombas de Hiroshima
    ('abre uma cratera', {'src': 'anim:a_cratera', 'tag': 'anim'}),  # 47 Mapa: anéis da cratera de 180 km
    ('rochas derretidas sobem', {'src': 'anim:a_ejecta', 'tag': 'anim'}),  # 48 Globo real: detritos caindo pelo planeta todo
    ('aquecendo o ceu como um forno', {'src': 'fm_225244.mp4', 'tag': 'real', 'credito': 'Pixabay/DancingSky'}),  # 49 Céu alaranjado de incêndio
    ('depois vem a fuligem', {'src': 'fm_197995.mp4', 'tag': 'real', 'credito': 'Pixabay/DancingSky'}),  # 50 Fumaça escura cobrindo o céu
    ('uns setenta e cinco por cento', {'src': 'anim:a_75', 'tag': 'anim'}),  # 51 Anel: 75% das espécies
    ('entre elas todos os dinossauros', {'src': 'fm_85715.mp4', 'tag': 'real', 'credito': 'Pixabay/RoyBuri'}),  # 52 Cegonha voando (aves são os dinossauros que sobraram)
    ('e isso nao e coisa so do passado', {'src': 'anim:a_chelia', 'tag': 'anim'}),  # 53 Mapa real: Tcheliabinsk, 15/02/2013
    ('uma rocha de uns vinte metros', {'src': 'anim:a_rastro', 'tag': 'anim'}),  # 54 Rastro no céu sobre a cidade e o clarão
    ('a onda de choque quebrou janelas', {'src': 'fm_273108.mp4', 'tag': 'real', 'credito': 'Pixabay/iwsky'}),  # 55 Vidro estilhaçando
    ('e feriu cerca de mil', {'src': 'anim:a_1500', 'tag': 'anim'}),  # 56 ≈ 1.500 FERIDOS
    ('ninguem viu ela chegar', {'src': 'fm_225775.mp4', 'tag': 'real', 'credito': 'Pixabay/Kaffeesüchtig'}),  # 57 Nuvens escuras à noite
    ('a boa noticia e que hoje', {'src': 'fm_179775.mp4', 'tag': 'real', 'credito': 'Pixabay/Matthias_Groeneveld'}),  # 58 Radiotelescópio
    ('mapeiam os asteroides', {'src': 'anim:a_neo', 'tag': 'anim'}),  # 59 Órbitas de asteroides próximos da Terra (ilustrativo)
    ('e a nasa estima', {'src': 'anim:a_90', 'tag': 'anim'}),  # 60 +90% dos asteroides com mais de 1 km encontrados
    ('nenhum deles tem rota de colisao', {'src': 'fm_324681.mp4', 'tag': 'real', 'credito': 'Pixabay/ghasoub'}),  # 61 Telescópio apontado para o céu
    ('e pela primeira vez na historia', {'ss': 37.0, 'src': 'na_dart_recap.mp4', 'tag': 'real', 'credito': 'NASA/Johns Hopkins APL', 'texto': 'DART · 2021'}),  # 62 Lançamento real da DART (2021)
    ('a nasa jogou a nave dart', {'ss': 57.0, 'src': 'na_dart_recap.mp4', 'crop': [518, 129, 960, 540], 'tag': 'real', 'credito': 'NASA/Johns Hopkins APL', 'texto': 'DIMORPHOS · 26/09/2022'}),  # 63 Aproximação real: câmera da DART chegando em Dimorphos (recorte sem texto)
    ('a orbita dele encurtou', {'src': 'anim:a_orbita', 'tag': 'anim'}),  # 64 Órbita de Dimorphos: 11h55 → 11h23
    ('foi a primeira vez que a humanidade', {'ss': 37.0, 'src': 'sv_14215_DART_WIDE_MP4.mp4', 'crop': [518, 129, 960, 540], 'tag': 'real', 'credito': 'NASA/ESA/Hubble', 'texto': 'HUBBLE · 2022'}),  # 65 Hubble: detritos depois do impacto (imagem real)
    ('os dinossauros nao tinham', {'src': 'fm_236.mp4', 'tag': 'ilus', 'credito': 'Pixabay/NASA-Imagery'}),  # 66 Foguete da NASA na plataforma (animação NASA)
    ('mas tem ameaca que nao da pra desviar', {'src': 'fm_10339.mp4', 'tag': 'real', 'credito': 'Pixabay/5239640'}),  # 67 Via Láctea
    ('numero tres a explosao de raios gama', {'p': {'num': 3, 'titulo': 'RAIOS GAMA', 'tema': 'raio', 'c1': '#1a1238'}, 'capitulo': '3 · Raios Gama', 'src': 'anim:cap', 'tag': 'anim'}),  # 68 Cartão do capítulo 3 (feixe de luz)
    ('quando certas estrelas gigantes', {'src': 'sv_Gamma-ray_Burst_Animation_MkII_1080.mp4', 'tag': 'ilus', 'credito': 'NASA Goddard'}),  # 69 Explosão de raios gama (animação NASA)
    ('o nucleo desaba', {'src': 'anim:g_colapso', 'tag': 'anim'}),  # 70 Núcleo colapsa em buraco negro e lança dois jatos
    ('as vezes nesse colapso', {'src': 'sv_Gamma_Ray_Burst_Two_Component_Jet_Stream_1920x1080.mp4', 'tag': 'ilus', 'credito': 'NASA Goddard'}),  # 71 Os dois jatos (animação NASA)
    ('em poucos segundos', {'src': 'anim:g_energia', 'tag': 'anim'}),  # 72 Balança: poucos segundos x 10 bilhões de anos de Sol
    ('em outubro de 2022', {'src': 'sv_14634_Fermi_GRB_Emission_Line_Best.mp4', 'tag': 'real', 'credito': 'NASA', 'texto': 'FERMI · 9/10/2022'}),  # 73 Céu em raios gama do Fermi com o BOAT (dados reais)
    ('os astronomos apelidaram', {'src': 'anim:g_boat', 'tag': 'anim'}),  # 74 BOAT · 9/10/2022
    ('ela aconteceu a uns dois bilhoes', {'src': 'anim:g_dist', 'tag': 'anim'}),  # 75 Linha Terra → galáxia: 2 bilhões de anos-luz
    ('mesmo de tao longe', {'src': 'fm_90877.mp4', 'tag': 'real', 'credito': 'Pixabay/6696758'}),  # 76 Aurora: a alta atmosfera
    ('agora imagina uma dessas', {'src': 'anim:g_mira', 'tag': 'anim'}),  # 77 Jato apontado para a Terra e o ozônio se rompendo
    ('mas destruiriam boa parte', {'ss': 43.8, 'src': 'sv_11182025_Ozone_Update_Final_Horizontal.mp4', 'tag': 'real', 'credito': 'NASA Goddard'}),  # 78 Camada de ozônio medida por satélite (NASA, sem texto)
    ('sem ela a radiacao ultravioleta', {'src': 'fm_153976.mp4', 'tag': 'real', 'credito': 'Pixabay/adege'}),  # 79 Sol forte sobre o mar
    ('mataria o plancton', {'src': 'fm_191084.mp4', 'tag': 'real', 'credito': 'Pixabay/Kmeel_com'}),  # 80 Plâncton no oceano
    ('a base da cadeia alimentar', {'src': 'fm_40742.mp4', 'tag': 'real', 'credito': 'Pixabay/RoyBuri'}),  # 81 Cardume de peixes
    ('alguns cientistas suspeitam', {'src': 'fm_263254.mp4', 'tag': 'real', 'credito': 'Pixabay/Jackdrafahl'}),  # 82 Recife de coral
    ('ha uns quatrocentos e quarenta', {'src': 'anim:g_ordov', 'tag': 'anim'}),  # 83 Linha do tempo: extinção do Ordoviciano, 445 mi
    ('uma das hipoteses', {'src': 'fm_26818.mp4', 'tag': 'real', 'credito': 'Pixabay/RoyBuri'}),  # 84 Água-viva no escuro
    ('e nao haveria aviso', {'src': 'fm_304.mp4', 'tag': 'real', 'credito': 'Pixabay/Vimeo-Free-Videos'}),  # 85 Relâmpago
    ('a vantagem e que essas explosoes', {'src': 'fm_169951.mp4', 'tag': 'real', 'credito': 'Pixabay/Kanenori'}),  # 86 Céu estrelado sobre montanhas
    ('e a maioria acontece', {'src': 'anim:g_anas', 'tag': 'anim'}),  # 87 Galáxias pequenas e distantes
    ('ate aqui tudo e questao de chance', {'src': 'fm_26452.mp4', 'tag': 'real', 'credito': 'Pixabay/MattHrusc'}),  # 88 Ampulheta
    ('ela vai acontecer com certeza', {'src': 'fm_15615.mp4', 'tag': 'real', 'credito': 'Pixabay/Matthias_Groeneveld'}),  # 89 Relógio correndo
    ('numero dois o sol', {'p': {'num': 2, 'titulo': 'O SOL', 'tema': 'sol', 'c1': '#2e1606'}, 'capitulo': '2 · O Sol', 'src': 'anim:cap', 'tag': 'anim'}),  # 90 Cartão do capítulo 2 (brilho do Sol)
    ('o sol e o motivo de existir vida', {'src': 'fm_62390.mp4', 'tag': 'real', 'credito': 'Pixabay/JoshuaWoroniecki'}),  # 91 Trigo ao nascer do Sol
    ('e tambem vai ser o motivo', {'src': 'na_sdo_erupcao.mp4', 'tag': 'real', 'credito': 'NASA/SDO'}),  # 92 Erupção solar real (SDO/NASA)
    ('ele funciona queimando hidrogenio', {'src': 'anim:s_nucleo', 'tag': 'anim'}),  # 93 Corte do Sol: fusão H → He no núcleo
    ('conforme envelhece', {'src': 'anim:s_brilho', 'tag': 'anim'}),  # 94 Gráfico: +10% de brilho a cada bilhão de anos
    ('parece pouco', {'src': 'fm_328726.mp4', 'tag': 'real', 'credito': 'Pixabay/NguyenTham_NTB'}),  # 95 Seca: chão rachado
    ('os oceanos comecam a evaporar', {'src': 'fm_2114.mp4', 'tag': 'real', 'credito': 'Pixabay/janeb13'}),  # 96 Nuvens se formando (evaporação)
    ('o vapor prende ainda mais calor', {'src': 'anim:s_estufa', 'tag': 'anim'}),  # 97 Calor entra e não consegue sair
    ('a terra vira um deserto quente', {'src': 'anim:s_venus', 'tag': 'anim'}),  # 98 Globo real virando um planeta tipo Vênus
    ('e a vida complexa acaba', {'src': 'fm_89769.mp4', 'tag': 'real', 'credito': 'Pixabay/Amirirani'}),  # 99 Rio seco
    ('daqui a uns cinco bilhoes', {'src': 'fm_282513.mp4', 'tag': 'real', 'credito': 'Pixabay/doktorkleinmusic'}),  # 100 Deserto ao pôr do sol
    ('o sol incha e vira uma gigante', {'src': 'anim:s_gigante', 'tag': 'anim'}),  # 101 Sol crescendo ×200
    ('engole mercurio', {'src': 'anim:s_engole', 'tag': 'anim'}),  # 102 Vista de cima: órbitas de Mercúrio e Vênus engolidas
    ('depois ele solta as camadas', {'src': 'fm_64099.mp4', 'tag': 'ilus', 'credito': 'Pixabay/miracoronarium'}),  # 103 Nebulosa (ilustração)
    ('uma ana branca', {'src': 'anim:s_ana', 'tag': 'anim'}),  # 104 Anã branca do tamanho da Terra
    ('essa e a unica das cinco', {'src': 'anim:s_check', 'tag': 'anim'}),  # 105 Cinco cartões: só o Sol é GARANTIDO
    ('ha um bilhao de anos', {'src': 'fm_15333.mp4', 'tag': 'real', 'credito': 'Pixabay/5001074'}),  # 106 Algas no fundo do mar
    ('se a nossa especie ainda existir', {'src': 'na_iss_terra.mp4', 'tag': 'real', 'credito': 'NASA'}),  # 107 A Terra vista da ISS
    ('so que existe uma ultima maneira', {'src': 'fm_134252.mp4', 'tag': 'real', 'credito': 'Pixabay/adege'}),  # 108 Estrelas girando no céu noturno
    ('numero um o decaimento do vacuo', {'p': {'num': 1, 'titulo': 'O VÁCUO', 'tema': 'vacuo', 'c1': '#06101e'}, 'capitulo': '1 · O Vácuo', 'src': 'anim:cap', 'tag': 'anim'}),  # 109 Cartão do capítulo 1 (bolha escura)
    ('essa e a mais estranha', {'src': 'fm_375594.mp4', 'tag': 'real', 'credito': 'Pixabay/adege'}),  # 110 Via Láctea refletida num lago
    ('tudo no universo cada atomo', {'src': 'fm_21782.mp4', 'tag': 'real', 'credito': 'Pixabay/SAHN_VIT'}),  # 111 Pessoas andando na rua
    ('depende de um campo invisivel', {'src': 'anim:x_campo', 'tag': 'anim'}),  # 112 Malha do campo de Higgs com partículas
    ('foi ele que o acelerador', {'src': 'anim:x_lhc', 'tag': 'anim'}),  # 113 Mapa real: anel de 27 km do LHC na fronteira França–Suíça
    ('quando encontrou o boson', {'src': 'anim:x_colisao', 'tag': 'anim'}),  # 114 Ilustração de colisão de partículas
    ('o problema e que medindo', {'src': 'fm_6173.mp4', 'tag': 'real', 'credito': 'Pixabay/philippgadow'}),  # 115 Câmara de nuvens no CERN (partículas reais)
    ('pensa numa bola parada', {'src': 'anim:x_bola1', 'tag': 'anim'}),  # 116 Bola num buraquinho no alto do morro
    ('um empurrao bem dado', {'src': 'anim:x_bola2', 'tag': 'anim'}),  # 117 O empurrão: a bola rola morro abaixo
    ('se em algum ponto do universo', {'src': 'anim:x_bolha', 'tag': 'anim'}),  # 118 Nasce uma bolha de vácuo novo
    ('e essa bolha cresce', {'src': 'anim:x_cresce', 'tag': 'anim'}),  # 119 A bolha engole galáxias
    ('dentro dela as leis da fisica', {'src': 'anim:x_atomos', 'tag': 'anim'}),  # 120 Átomo se desfazendo
    ('voce nao veria ela chegando', {'src': 'fm_7093.mp4', 'tag': 'real', 'credito': 'Pixabay/Hans'}),  # 121 Lua cheia no céu escuro
    ('num instante esta tudo normal', {'src': 'fm_31822.mp4', 'tag': 'real', 'credito': 'Pixabay/FeDesafiante'}),  # 122 Rua movimentada
    ('no instante seguinte', {'src': 'anim:x_void', 'tag': 'anim'}),  # 123 Uma frente apaga a cidade e as estrelas
    ('parece o fim mais assustador', {'src': 'fm_204006.mp4', 'tag': 'real', 'credito': 'Pixabay/D-GM'}),  # 124 Nuvens douradas ao entardecer
    ('essa ideia ainda e uma hipotese', {'src': 'fm_262188.mp4', 'tag': 'real', 'credito': 'Pixabay/Kost9n4'}),  # 125 Cientista no laboratório
    ('e mesmo que seja verdade', {'src': 'anim:x_numero', 'tag': 'anim'}),  # 126 10^790 com zeros correndo
    ('o universo inteiro tem so', {'src': 'anim:x_escala', 'tag': 'anim'}),  # 127 Barras: idade do universo x 10^790
    ('entao da pra fazer as contas', {'p': {'ts': [1.97, 5.32, 9.1, 13.24, 16.19]}, 'src': 'anim:f_recap', 'tag': 'anim'}),  # 128 Placar: as 5 ameaças e o veredito de cada uma
    ('o mais curioso e que o maior risco', {'src': 'fm_3134.mp4', 'tag': 'real', 'credito': 'Pixabay/Life-Of-Vids'}),  # 129 Cidade à noite
    ('esta em nos', {'src': 'fm_3630.mp4', 'tag': 'real', 'credito': 'Pixabay/Coverr-Free-Footage'}),  # 130 Multidão atravessando a rua
    ('mas essa ja e outra historia', {'src': 'fm_343968.mp4', 'tag': 'ilus', 'credito': 'Pixabay/BlenderTimer'}),  # 131 Nascer do Sol visto da órbita (ilustração 3D)
    ('se voce curtiu essa viagem', {'src': 'anim:f_final', 'tag': 'anim'}),  # 132 QUAL DESSAS TE ASSUSTOU MAIS? · INSCREVA-SE
]
