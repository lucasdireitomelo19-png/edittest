# Gerado por gerar_cenas.py a partir de plano.py. Ver producoes/23_andromeda_longo.md.
FIM = 393.83
SAIDA = "andromeda_longo.mp4"
FINAL = ""
MAX_PLANO = 7.0
MUSICA = "musica.wav"
MUSICA_DB = -14
ANIM_PAGE = "andro.html"

CENAS = [
    ('nossa galaxia esta em rota', {'ss': 24.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 1 As duas galáxias se aproximando (simulação NASA)
    ('e nao tem como desviar', {'src': 'anim:a_rota', 'tag': 'anim'}),  # 2 Via Láctea e Andrômeda ligadas por uma reta vermelha: ROTA DE COLISÃO
    ('ela tem um trilhao de estrelas', {'ss': 10.0, 'src': 'sv_14762_andromeda.mp4', 'crop': [422, 108, 1074, 604], 'tag': 'real', 'credito': 'NASA/ESA/Hubble'}),  # 3 Andrômeda real: milhões de estrelas no mosaico do Hubble
    ('e esta vindo direto pra ca', {'src': 'anim:a_numeros', 'tag': 'anim'}),  # 4 1 TRILHÃO DE ESTRELAS · 400.000 KM/H
    ('o nome dela e andromeda', {'ss': 114.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'real', 'credito': 'NASA/ESA/STScI'}),  # 5 Andrômeda real, mosaico do Hubble (NASA/ESA)
    ('e os cientistas ja simularam', {'src': 'anim:a_passos', 'tag': 'anim'}),  # 6 A simulação em 3 passos: céu muda → impacto → galáxia só
    ('o ceu que voce conhece', {'src': 'fm_169951.mp4', 'tag': 'real', 'credito': 'Pixabay/Kanenori'}),  # 7 A Via Láctea real sobre as montanhas (timelapse)
    ('o sol vai ser arrancado', {'ss': 60.0, 'src': 'na_sdo_ano7.mp4', 'crop': [0, 0, 1074, 1080], 'tag': 'real', 'credito': 'NASA/SDO'}),  # 8 O Sol real visto pelo SDO (NASA)
    ('e a via lactea a nossa casa', {'ss': 6.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 9 A Via Láctea vista de fora (simulação NASA)
    ('mas no meio do caminho', {'src': 'anim:a_virada', 'tag': 'anim'}),  # 10 2012 → 2025 → 2026: A CIÊNCIA MUDOU DE IDEIA
    ('primeiro vamos conhecer', {'src': 'fm_14955.mp4', 'tag': 'real', 'credito': 'Pixabay/adege'}),  # 11 Céu estrelado real sobre uma montanha (timelapse)
    ('olha pro ceu numa noite escura', {'p': {'num': 1, 'titulo': 'ELA JÁ ESTÁ VINDO', 'cont': 'HOJE', 'cor': '#4cc9f0', 'c1': '#0a1428', 'seed': 5}, 'capitulo': '1 · Ela já está vindo', 'src': 'anim:a_cap', 'tag': 'anim'}),  # 12 Cartão: CAPÍTULO 1 · ELA JÁ ESTÁ VINDO · HOJE
    ('longe da cidade', {'src': 'fm_22555.mp4', 'tag': 'real', 'credito': 'Pixabay/adege'}),  # 13 O dia virando noite sobre a montanha (timelapse real)
    ('perto da constelacao de andromeda', {'src': 'anim:a_constelacao', 'tag': 'anim'}),  # 14 Mapa do céu: constelação de Andrômeda e a mancha circulada
    ('parece uma nuvem pequena', {'src': 'fm_10339.mp4', 'tag': 'real', 'credito': 'Pixabay/5239640'}),  # 15 Céu estrelado real sobre um lago (timelapse)
    ('nao e uma nuvem', {'src': 'anim:a_nuvem', 'tag': 'anim'}),  # 16 A mancha cresce: NÃO É UMA NUVEM, É UMA GALÁXIA INTEIRA
    ('por muito tempo ninguem sabia', {'src': 'fm_145428.mp4', 'tag': 'real', 'credito': 'Pixabay/Sang_Soi'}),  # 17 Estudante anotando sob a luz da luminária
    ('ate que em outubro de 1923', {'src': 'anim:a_1923', 'tag': 'anim'}),  # 18 Placa fotográfica de 1923, Monte Wilson: a estrela que pisca (reconstituição)
    ('esse tipo de estrela funciona', {'src': 'anim:a_cefeida', 'tag': 'anim'}),  # 19 Cefeida: o brilho sobe e desce num RITMO FIXO
    ('pelo ritmo da pra calcular', {'src': 'anim:a_regua', 'tag': 'anim'}),  # 20 Ritmo → brilho real → distância: UMA RÉGUA NO CÉU
    ('e a conta deu um numero', {'src': 'anim:a_longe', 'tag': 'anim'}),  # 21 Via Láctea ↔ Andrômeda: ~2,5 MILHÕES DE ANOS-LUZ, OUTRA GALÁXIA
    ('hoje a gente sabe', {'ss': 42.0, 'src': 'sv_14762_andromeda.mp4', 'crop': [422, 108, 1074, 604], 'tag': 'real', 'credito': 'NASA/ESA/Hubble'}),  # 22 Andrômeda real: o núcleo brilhante (Hubble)
    ('a luz que voce ve', {'src': 'anim:a_luz', 'tag': 'anim'}),  # 23 A luz viajando 2,5 milhões de anos; Homo sapiens só ~300 mil
    ('ela tem cerca de um trilhao', {'ss': 75.0, 'src': 'sv_14762_andromeda.mp4', 'crop': [422, 108, 1074, 604], 'tag': 'real', 'credito': 'NASA/ESA/Hubble'}),  # 24 Andrômeda real: estrelas uma a uma (Hubble)
    ('e esta se aproximando', {'src': 'anim:a_aproxima', 'tag': 'anim'}),  # 25 Contador ao vivo: +110 km por segundo
    ('enquanto voce assistiu', {'src': 'fm_181014.mp4', 'tag': 'real', 'credito': 'Pixabay/atsushi1984'}),  # 26 Via Láctea real com um meteoro riscando (timelapse)
    ('saber que ela vem', {'p': {'num': 2, 'titulo': 'O DIA EM QUE A NASA FEZ AS CONTAS', 'cont': '1923 → 2012', 'cor': '#7cc98a', 'c1': '#0c1a12', 'seed': 10}, 'capitulo': '2 · O dia em que a nasa fez as contas', 'src': 'anim:a_cap', 'tag': 'anim'}),  # 27 Cartão: CAPÍTULO 2 · O DIA EM QUE A NASA FEZ AS CONTAS · 1923 → 2012
    ('pra isso nao basta', {'src': 'fm_66121.mp4', 'tag': 'real', 'credito': 'Pixabay/danydory'}),  # 28 Observador real com uma lente gigante apontada
    ('se andromeda estiver deslizando', {'src': 'anim:a_lado', 'tag': 'anim'}),  # 29 De lado ou de frente: passa raspando × colisão
    ('esse movimento e minusculo', {'src': 'anim:a_minusculo', 'tag': 'anim'}),  # 30 Estrelas se deslocando um tiquinho entre fotos (ilustração)
    ('durante anos os astronomos', {'ss': 31.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'ilus', 'credito': 'NASA/ESA/STScI'}),  # 31 Hubble e Gaia no espaço (ilustração NASA)
    ('em 2012 a nasa anunciou', {'src': 'anim:a_anuncio', 'tag': 'anim'}),  # 32 NASA, 31/05/2012: A VIA LÁCTEA ESTÁ DESTINADA A UMA COLISÃO DE FRENTE
    ('data prevista do choque', {'src': 'anim:a_4bi', 'tag': 'anim'}),  # 33 Linha do tempo: HOJE → 4 BI DE ANOS: O CHOQUE
    ('e a partir dai', {'src': 'anim:a_simulou', 'tag': 'anim'}),  # 34 O céu da Terra, passo a passo (ilustração)
    ('simularam o ceu da terra', {'ss': 40.5, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 35 O céu da Terra hoje, com Andrômeda pequena (simulação NASA/STScI 2012)
    ('por bilhoes de anos nada parece', {'p': {'num': 3, 'titulo': 'O CÉU VAI MUDAR', 'cont': '+3,75 BI DE ANOS', 'cor': '#ffd166', 'c1': '#1a1408', 'seed': 15}, 'capitulo': '3 · O céu vai mudar', 'src': 'anim:a_cap', 'tag': 'anim'}),  # 36 Cartão: CAPÍTULO 3 · O CÉU VAI MUDAR · +3,75 BI
    ('andromeda continua sendo uma mancha', {'ss': 44.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 37 Andrômeda maior no céu da Terra (simulação NASA/STScI 2012)
    ('cada vez maior', {'src': 'anim:a_cresce', 'tag': 'anim'}),  # 38 A mancha crescendo bilhão por bilhão (ilustração)
    ('ate que daqui a uns tres bilhoes', {'src': 'na_ceu_andromeda_375.jpg', 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 39 O céu da Terra em 3,75 bilhões de anos (simulação NASA/STScI 2012)
    ('uma espiral gigante', {'ss': 48.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 40 Andrômeda de horizonte a horizonte (simulação NASA/STScI 2012)
    ('e ai a via lactea comeca', {'src': 'anim:a_deforma', 'tag': 'anim'}),  # 41 A Via Láctea se deforma: OS BRAÇOS SE ESTICAM
    ('uns cem milhoes de anos depois', {'ss': 52.5, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 42 O céu em chamas de estrelas novas (simulação NASA/STScI 2012)
    ('quando as duas galaxias se aproximam', {'src': 'anim:a_gas', 'tag': 'anim'}),  # 43 Nuvens de gás esmagadas: GÁS ESMAGADO = ESTRELAS NOVAS
    ('e onde o gas e esmagado', {'ss': 33.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 44 As galáxias brilhando ao se aproximar (simulação NASA)
    ('muitas por toda parte', {'src': 'anim:a_fogo', 'tag': 'anim'}),  # 45 O céu cheio de estrelas nascendo: +3,85 BI DE ANOS (ilustração)
    ('se alguem estiver olhando', {'src': 'anim:a_ninguem_viu', 'tag': 'anim'}),  # 46 Um céu que nenhum ser humano viu: BRILHANTE, VIVO, FORA DE CONTROLE
    ('daqui a uns quatro bilhoes de anos vem', {'p': {'num': 4, 'titulo': 'O IMPACTO', 'cont': '+4 BI DE ANOS', 'cor': '#ff3b3b', 'c1': '#200a0e', 'seed': 20}, 'capitulo': '4 · O impacto', 'src': 'anim:a_cap', 'tag': 'anim'}),  # 47 Cartão: CAPÍTULO 4 · O IMPACTO · +4 BI
    ('duas galaxias se atravessando', {'ss': 36.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 48 O primeiro choque (simulação NASA)
    ('centenas de bilhoes de estrelas', {'src': 'anim:a_contas', 'tag': 'anim'}),  # 49 Centenas de bilhões × ~1 trilhão
    ('e aqui vem a parte', {'ss': 39.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 50 Os discos se atravessando (simulação NASA)
    ('as estrelas quase nao se tocam', {'src': 'anim:a_nao_tocam', 'tag': 'anim'}),  # 51 Duas nuvens de estrelas se cruzam sem bater
    ('parece impossivel', {'src': 'fm_48115.mp4', 'tag': 'real', 'credito': 'Pixabay/NickyPe'}),  # 52 Bolas de gude reais sobre a madeira
    ('se o sol fosse do tamanho', {'src': 'anim:a_gude', 'tag': 'anim'}),  # 53 Sol = bola de gude; a estrela mais perto a CENTENAS DE QUILÔMETROS
    ('duas galaxias se cruzando sao como', {'src': 'fm_116854.mp4', 'tag': 'real', 'credito': 'Pixabay/NickyPe'}),  # 54 Enxame de abelhas real num galho
    ('que passam um pelo outro', {'src': 'anim:a_enxame', 'tag': 'anim'}),  # 55 Dois enxames se cruzando sem se encostar (analogia)
    ('so que a gravidade nao perdoa', {'ss': 42.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 56 Os braços arrancados pela gravidade (simulação NASA)
    ('as orbitas de todas', {'src': 'anim:a_orbitas', 'tag': 'anim'}),  # 57 ÓRBITAS EMBARALHADAS
    ('e o nosso sol', {'src': 'anim:a_sol_fora', 'tag': 'anim'}),  # 58 O Sol arremessado pra longe do centro
    ('com a terra junto', {'src': 'anim:a_sistema', 'tag': 'anim'}),  # 59 O Sistema Solar inteiro viajando junto
    ('a boa noticia', {'ss': 30.0, 'src': 'na_iss_terra.mp4', 'tag': 'real', 'credito': 'NASA'}),  # 60 A Terra real vista da Estação Espacial (NASA)
    ('a nasa diz que a terra', {'src': 'anim:a_seguro', 'tag': 'anim'}),  # 61 NASA: A TERRA NÃO CORRE RISCO DE SER DESTRUÍDA
    ('a ma noticia', {'src': 'anim:a_ceu_outro', 'tag': 'anim'}),  # 62 Um céu que não é mais o dela (ilustração)
    ('depois do primeiro choque', {'p': {'num': 5, 'titulo': 'UMA GALÁXIA SÓ', 'cont': '+6 BI DE ANOS', 'cor': '#ffb36b', 'c1': '#1c1208', 'seed': 25}, 'capitulo': '5 · Uma galáxia só', 'src': 'anim:a_cap', 'tag': 'anim'}),  # 63 Cartão: CAPÍTULO 5 · UMA GALÁXIA SÓ · +6 BI
    ('mas nao vao longe', {'ss': 45.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 64 As galáxias se afastando (simulação NASA)
    ('elas voltam', {'src': 'anim:a_ida_volta', 'tag': 'anim'}),  # 65 Ida e volta: 1º choque, 2º, 3º…
    ('ate os dois centros', {'ss': 50.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 66 Os dois núcleos se juntando (simulação NASA)
    ('uns dois bilhoes de anos depois', {'ss': 60.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 67 A galáxia fundida (simulação NASA)
    ('ela nao tem bracos', {'src': 'anim:a_espiral_eliptica', 'tag': 'anim'}),  # 68 Espiral → elíptica: SEM BRAÇOS, SEM ESPIRAL
    ('o que os astronomos chamam', {'src': 'hb_eliptica.jpg', 'tag': 'real', 'credito': 'ESA/Hubble & NASA'}),  # 69 Galáxia elíptica real NGC 3610 (ESA/Hubble), exemplo
    ('a via lactea com os bracos', {'ss': 68.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 70 A elíptica girando devagar (simulação NASA)
    ('e pode ter um terceiro', {'src': 'sv_m33.jpg', 'tag': 'real', 'credito': 'NASA/ESA/Hubble'}),  # 71 A galáxia do Triângulo (M33) real, mosaico do Hubble
    ('pode entrar na briga', {'src': 'anim:a_triangulo', 'tag': 'anim'}),  # 72 M33 entrando na fusão; chance pequena de bater na gente primeiro
    ('essa foi a historia contada', {'p': {'num': 6, 'titulo': 'E SE ELA ERRAR?', 'cont': '2025–2026', 'cor': '#ff7ab0', 'c1': '#1a0a16', 'seed': 30}, 'capitulo': '6 · E se ela errar?', 'src': 'anim:a_cap', 'tag': 'anim'}),  # 73 Cartão: CAPÍTULO 6 · E SE ELA ERRAR? · 2025–2026
    ('estava em documentario', {'src': 'anim:a_consenso', 'tag': 'anim'}),  # 74 Documentário, livro, escola: "VAI BATER EM ANDRÔMEDA"
    ('ate 2025', {'src': 'fm_12564.mp4', 'tag': 'real', 'credito': 'Pixabay/ARTXROOM'}),  # 75 Uma moeda real girando e parando
    ('uma equipe liderada', {'src': 'anim:a_sawala', 'tag': 'anim'}),  # 76 Nature Astronomy 2025: Till Sawala e equipe, Universidade de Helsinque
    ('juntou os dados', {'ss': 34.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'ilus', 'credito': 'NASA/ESA/STScI'}),  # 77 Hubble e Gaia (ilustração NASA)
    ('e rodou milhares', {'src': 'anim:a_milhares', 'tag': 'anim'}),  # 78 Milhares de simulações: um leque de caminhos
    ('o resultado saiu', {'ss': 9.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 79 Uma das simulações de 2025 (simulação NASA)
    ('so uns cinquenta por cento', {'src': 'anim:a_cara_coroa', 'tag': 'anim'}),  # 80 ~50% DE CHANCE DE FUSÃO EM 10 BI DE ANOS: CARA OU COROA
    ('o motivo dois vizinhos', {'src': 'anim:a_vizinhos', 'tag': 'anim'}),  # 81 O Triângulo empurra, a Grande Nuvem de Magalhães puxa
    ('mas a grande nuvem', {'ss': 69.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'ilus', 'credito': 'NASA/ESA/STScI'}),  # 82 A Grande Nuvem de Magalhães no céu (ilustração NASA)
    ('e a historia nao acabou', {'ss': 84.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 83 Galáxias pequenas dançando em volta das grandes (simulação NASA)
    ('em 2026 outra equipe', {'src': 'anim:a_2026', 'tag': 'anim'}),  # 84 2026: ~90%, fusão por volta de 6,5 bi de anos, PRÉ-PUBLICAÇÃO
    ('com a fusao por volta', {'ss': 19.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'sim', 'credito': 'NASA/ESA/STScI'}),  # 85 Outra simulação de fusão (simulação NASA)
    ('so que esse estudo', {'src': 'anim:a_grafico', 'tag': 'anim'}),  # 86 2012 de frente · 2025 ~50% · 2026 ~90%*
    ('entao hoje a resposta honesta', {'src': 'anim:a_honesta', 'tag': 'anim'}),  # 87 ELA PROVAVELMENTE VEM. MAS NINGUÉM PODE GARANTIR.
    ('agora a parte que quase ninguem', {'p': {'num': 7, 'titulo': 'QUEM VAI ESTAR AQUI PRA VER', 'cont': '+1 BI / +5 BI', 'cor': '#ff8a3d', 'c1': '#200c06', 'seed': 35}, 'capitulo': '7 · Quem vai estar aqui pra ver', 'src': 'anim:a_cap', 'tag': 'anim'}),  # 88 Cartão: CAPÍTULO 7 · QUEM VAI ESTAR AQUI PRA VER · +1 BI / +5 BI
    ('enquanto andromeda se aproxima', {'src': 'na_sdo_erupcao.mp4', 'tag': 'real', 'credito': 'NASA/SDO'}),  # 89 O Sol real em erupção (NASA/SDO)
    ('a cada bilhao de anos', {'src': 'anim:a_sol_brilha', 'tag': 'anim'}),  # 90 +10% DE BRILHO A CADA BILHÃO DE ANOS
    ('em mais ou menos um bilhao', {'src': 'anim:a_oceanos', 'tag': 'anim'}),  # 91 ~1 BILHÃO DE ANOS: OS OCEANOS FERVEM
    ('e em uns cinco bilhoes', {'ss': 101.0, 'src': 'sv_14847_wide.mp4', 'crop': [114, 74, 1650, 928], 'tag': 'ilus', 'credito': 'NASA/ESA/STScI'}),  # 92 O Sol inchando em gigante vermelha (animação NASA)
    ('muito antes de a fusao', {'src': 'anim:a_gigante', 'tag': 'anim'}),  # 93 Linha do tempo: oceanos +1 · choque +4 · gigante vermelha +5 · fusão +6
    ('ou seja se andromeda chegar', {'src': 'fm_328726.mp4', 'tag': 'real', 'credito': 'Pixabay/NguyenTham_NTB'}),  # 94 Deserto seco real, sem água
    ('sem oceanos', {'src': 'anim:a_terra_seca', 'tag': 'anim'}),  # 95 Andrômeda sobre uma Terra seca (ilustração)
    ('o ceu mais bonito', {'src': 'anim:a_vazio', 'tag': 'anim'}),  # 96 UM PLANETA VAZIO sob a galáxia nova
    ('nossa galaxia esta em rota de colisao a colisao', {'ss': 30.0, 'src': 'sv_30955_colisao.mp4', 'crop': [96, 54, 1496, 842], 'tag': 'sim', 'credito': 'NASA'}),  # 97 As galáxias chegando (simulação NASA)
    ('so nao vai ter ninguem', {'ss': 125.0, 'src': 'sv_14762_andromeda.mp4', 'crop': [422, 108, 1074, 604], 'tag': 'real', 'credito': 'NASA/ESA/Hubble'}),  # 98 Andrômeda real, inteira, ao longe (Hubble)
    ('a nao ser que', {'ss': 14.0, 'src': 'na_artemis2_lanc40.mp4', 'crop': [384, 0, 1152, 648], 'tag': 'real', 'credito': 'NASA'}),  # 99 Lançamento real da Artemis II (NASA, 2026)
]
CANTO = [(132.99, 280.42, 'SIMULAÇÃO NASA (2012)'), (327.09, 344.2, 'ESTUDO DE 2026: PRÉ-PUBLICAÇÃO')]
