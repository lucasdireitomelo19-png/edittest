# Gerado por gerar_cenas.py a partir de plano.py. Ver producoes/20_ultima_pessoa.md.
FIM = 423.87
SAIDA = "ultima_pessoa.mp4"
FINAL = ""
MAX_PLANO = 7.0
MUSICA = "musica.wav"
MUSICA_DB = -14
ANIM_PAGE = "ultima.html"

CENAS = [
    ('voce acorda', {'src': 'anim:u_despertador', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 1 Despertador 07:00, quarto em penumbra
    ('nenhum barulho de carro', {'src': 'anim:u_mapa_vazio', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 2 Mapa da cidade: os pontinhos dos carros somem
    ('o celular nao tem', {'src': 'anim:u_celular', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 3 Celular: 0 mensagens novas
    ('voce sai na rua', {'src': 'fm_344098.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'Pixabay/Cordo'}),  # 4 Avenida de cidade completamente vazia
    ('voce liga pra sua familia', {'src': 'anim:u_chamando', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 5 Chamando MÃE... sem resposta
    ('oito bilhoes de pessoas', {'src': 'anim:u_contador', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 6 Contador 8.000.000.000 → 1, pontos somem do globo
    ('sobrou so voce', {'src': 'fm_130.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'Pixabay/Coverr-Free-Footage'}),  # 7 Estrada vazia até o horizonte
    ('e a pergunta e', {'src': 'anim:u_titulo', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 8 Título: A ÚLTIMA PESSOA DA TERRA
    ('nas primeiras horas', {'p': {'titulo': 'HORA 1', 'sub': 'O mundo é seu', 'cor': '#ffb347', 'c1': '#3a2410', 'seed': 7, 'glitch': False, 'sat': 1.0}, 'capitulo': 'Hora 1 · O mundo é seu', 'src': 'anim:u_cap', 'tag': 'anim'}),  # 9 Cartão HORA 1
    ('o mundo inteiro e seu', {'src': 'anim:u_mundo_seu', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 10 Mapa-múndi real dourado: O MUNDO INTEIRO É SEU
    ('voce entra no shopping', {'src': 'anim:u_carrinho', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 11 Carrinho enchendo, etiquetas R$ 0,00
    ('voce escolhe a casa', {'src': 'anim:u_cobertura', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 12 Prédio com vista pro mar no pôr do sol
    ('a chave', {'src': 'anim:u_chave', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 13 Porta se abrindo: SEM CHAVE
    ('na garagem de uma concessionaria', {'src': 'fm_11490.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'Pixabay/invisiblepower'}),  # 14 Carro esportivo na estrada ao pôr do sol (drone)
    ('voce pega a avenida', {'src': 'anim:u_velo', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 15 Velocímetro 0 → 200 km/h, avenida vazia
    ('sem transito sem radar', {'src': 'anim:u_semaforo', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 16 Semáforos riscados: sem trânsito, radar, sinal
    ('voce janta no melhor', {'src': 'anim:u_jantar', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 17 Mesa posta pra um, taça de vinho
    ('voce entra no estadio', {'src': 'fm_208387.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'Pixabay/ThomaLutfpv'}),  # 18 Estádio vazio visto de drone
    ('e grita', {'src': 'anim:u_eco', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 19 Ondas do grito batendo nas arquibancadas: EEEEI!
    ('sem chefe', {'src': 'anim:u_livre', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 20 Sem chefe, sem boletos, sem horário
    ('e por algumas horas', {'src': 'fm_12591.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'Pixabay/Matthias_Groeneveld'}),  # 21 Pôr do sol dourado
    ('mas o mundo nao funciona', {'p': {'titulo': 'DIA 1', 'sub': 'O apagão', 'cor': '#e63946', 'c1': '#2a1018', 'seed': 14, 'glitch': True, 'sat': 0.85}, 'capitulo': 'Dia 1 · O apagão', 'src': 'anim:u_cap', 'tag': 'anim'}),  # 22 Cartão DIA 1 (música corta seco)
    ('neste exato momento', {'src': 'fm_29413.mp4', 'tag': 'real', 'sat': 0.95, 'credito': 'Pixabay/adege'}),  # 23 Torres de resfriamento de usina
    ('ninguem olhando os paineis', {'src': 'anim:u_painel', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 24 Sala de controle: 0 OPERADORES, alarmes
    ('a rede eletrica vai caindo', {'src': 'anim:u_cascata', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 25 Mapa real: as luzes do mundo apagando em cascata
    ('algumas hidreletricas', {'src': 'fm_1077.mp4', 'tag': 'real', 'sat': 0.95, 'credito': 'Pixabay/Vimeo-Free-Videos'}),  # 26 Barragem de hidrelétrica
    ('a internet cai', {'src': 'anim:u_servidor', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 27 Racks de servidores apagando: SEM INTERNET
    ('aquele aparelho', {'src': 'fm_169445.mp4', 'tag': 'real', 'sat': 0.95, 'credito': 'Pixabay/magicmore'}),  # 28 Celular aceso no escuro
    ('agora so serve', {'src': 'anim:u_bateria', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 29 Bateria do celular caindo: só serve pra ver as horas
    ('a agua que chega', {'src': 'anim:u_agua', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 30 Bomba d'água: ENERGIA OFF, cano seca
    ('em nova york', {'src': 'fm_9005.mp4', 'tag': 'real', 'sat': 0.95, 'credito': 'Pixabay/tiburi', 'texto': 'NOVA YORK'}),  # 31 Túnel de metrô
    ('que tiram milhoes', {'src': 'anim:u_metro', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 32 50 milhões de litros/dia bombeados no metrô de NY
    ('sem elas em uns dois dias', {'src': 'anim:u_alaga', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 33 Túnel enchendo de água: ~2 dias
    ('no mundo existem mais de', {'src': 'anim:u_reatores', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 34 Mapa real: +440 reatores nucleares
    ('quando algo da errado', {'src': 'anim:u_scram', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 35 Barras de controle descem: DESLIGAMENTO AUTOMÁTICO
    ('mas o combustivel usado', {'src': 'anim:u_piscina', 'tag': 'anim', 'p': {'sat': 0.85}}),  # 36 Piscina de combustível + gerador a diesel: dias, não anos
    ('e voce nao quer estar perto', {'src': 'fm_197758.mp4', 'tag': 'real', 'sat': 0.95, 'credito': 'Pixabay/adege'}),  # 37 Usina nuclear soltando vapor, em preto e branco
    ('ai chega a primeira noite', {'p': {'titulo': 'NOITE 1', 'sub': 'O silêncio', 'cor': '#4cc9f0', 'c1': '#0a1428', 'seed': 21, 'glitch': False, 'sat': 0.7}, 'capitulo': 'Noite 1 · O silêncio', 'src': 'anim:u_cap', 'tag': 'anim'}),  # 38 Cartão NOITE 1
    ('voce olha pela janela', {'src': 'anim:u_janela', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 39 Janela: cidade toda apagada, NENHUMA LUZ
    ('e entao voce olha pra cima', {'src': 'anim:u_ceu', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 40 A Via Láctea aparece sobre os prédios escuros
    ('a via lactea inteira', {'src': 'fm_75635.mp4', 'tag': 'real', 'sat': 0.78, 'credito': 'Pixabay/josefgadermaier'}),  # 41 Via Láctea real sobre a floresta (timelapse)
    ('hoje mais de um terco', {'src': 'anim:u_terco', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 42 1 em cada 3 pessoas nunca vê a Via Láctea
    ('voce esta vendo', {'src': 'anim:u_sozinho', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 43 Silhueta: NINGUÉM PRA QUEM MOSTRAR
    ('voce procura pilhas', {'src': 'fm_171435.mp4', 'tag': 'real', 'sat': 0.78, 'credito': 'Pixabay/Sertmidia'}),  # 44 Rádio antigo, mão girando o botão
    ('so chiado', {'src': 'anim:u_chiado', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 45 Dial de rádio: SÓ CHIADO (silêncio na trilha)
    ('nenhuma voz em lugar', {'src': 'anim:u_mudo', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 46 Globo escuro: NENHUMA VOZ
    ('o silencio nao e mais paz', {'src': 'anim:u_balao', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 47 Balão de fala vazio
    ('deixa a tv', {'src': 'anim:u_tv', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 48 TV: SEM SINAL
    ('os seres humanos sao feitos', {'src': 'anim:u_grupo', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 49 Pessoas em grupo somem, sobra VOCÊ
    ('estudos mostram', {'src': 'anim:u_saude', 'tag': 'anim', 'p': {'sat': 0.7}}),  # 50 Solidão prolongada: sono, coração, mente
    ('depois de algumas semanas', {'p': {'titulo': 'SEMANAS DEPOIS', 'sub': 'Sem ninguém cuidando', 'cor': '#ff8a3d', 'c1': '#2a1408', 'seed': 28, 'glitch': False, 'sat': 0.55}, 'capitulo': 'Semanas Depois · Sem ninguém cuidando', 'src': 'anim:u_cap', 'tag': 'anim'}),  # 51 Cartão SEMANAS DEPOIS
    ('vazamentos de gas', {'src': 'fm_44187.mp4', 'tag': 'real', 'sat': 0.62, 'credito': 'Pixabay/FernandoChile'}),  # 52 Incêndio real
    ('bairros inteiros', {'src': 'anim:u_incendios', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 53 Mapa da cidade com focos: NINGUÉM PRA APAGAR
    ('nas fazendas', {'src': 'anim:u_fazenda', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 54 Fazenda, alguns animais escapam pela cerca
    ('os caes que eram', {'src': 'anim:u_matilha', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 55 Silhuetas de cães em bando
    ('o lixo que ninguem', {'src': 'anim:u_lixo', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 56 Lixo acumulando, ratos se multiplicam
    ('a comida nao e o seu', {'src': 'anim:u_despensa', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 57 Prateleiras: enlatados, arroz, mel: COMIDA PRA ANOS
    ('o seu maior problema e o seu proprio', {'src': 'anim:u_corpo', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 58 Corpo: dente, corte, apêndice piscando
    ('coisas que hoje se resolvem', {'src': 'anim:u_hospital', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 59 Hospital apagado: SEM MÉDICO
    ('pela primeira vez voce entende', {'src': 'anim:u_juntos', 'tag': 'anim', 'p': {'sat': 0.55}}),  # 60 Roda de pessoas ligadas: a gente sobrevive porque tem os outros
    ('um ano depois', {'p': {'titulo': 'ANO 1', 'sub': 'A natureza volta', 'cor': '#7bc67b', 'c1': '#10200f', 'seed': 35, 'glitch': False, 'sat': 0.45}, 'capitulo': 'Ano 1 · A natureza volta', 'src': 'anim:u_cap', 'tag': 'anim'}),  # 61 Cartão ANO 1
    ('a gasolina dos postos', {'src': 'anim:u_posto', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 62 Bomba de gasolina: validade em meses
    ('a ferrari vira', {'src': 'anim:u_ferrari', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 63 Carro coberto de folhas: VIRA ESCULTURA
    ('o mato rompe', {'src': 'anim:u_asfalto', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 64 Mato rompendo o asfalto
    ('trepadeiras sobem', {'src': 'anim:u_fachada', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 65 Trepadeiras subindo pelos prédios
    ('animais selvagens comecam', {'src': 'fm_15246.mp4', 'tag': 'real', 'sat': 0.5, 'credito': 'Pixabay/Joyvideo123'}),  # 66 Cervo andando na cidade
    ('a gente sabe como', {'src': 'fm_42057.mp4', 'tag': 'real', 'sat': 0.5, 'credito': 'Pixabay/Matthias_Groeneveld'}),  # 67 Casa abandonada tomada pelo mato
    ('em 1986', {'src': 'anim:u_pripyat', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 68 Mapa real: zoom até Pripyat, Ucrânia, 1986
    ('quase cinquenta mil', {'src': 'anim:u_49mil', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 69 ~50.000 pontos somem: 0 MORADORES
    ('hoje pripyat e uma floresta', {'src': 'fm_139030.mp4', 'tag': 'real', 'sat': 0.5, 'credito': 'Pixabay/blackmarketmusic', 'texto': 'PRIPYAT HOJE'}),  # 70 Pripyat real: brinquedo abandonado no meio do mato
    ('arvores crescem nas salas', {'src': 'fm_137272.mp4', 'tag': 'real', 'sat': 0.5, 'credito': 'Pixabay/blackmarketmusic'}),  # 71 Pripyat real: prédio tomado pelas árvores
    ('lobos', {'src': 'fm_100593.mp4', 'tag': 'real', 'sat': 0.5, 'credito': 'Pixabay/NickyPe'}),  # 72 Lobo
    ('e assim que o resto', {'src': 'anim:u_verde', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 73 Globo ficando verde: POUCAS DÉCADAS
    ('e la em cima no espaco', {'src': 'anim:u_satelites', 'tag': 'anim', 'p': {'sat': 0.45}}),  # 74 Satélites perdendo altura, um risco de fogo
    ('onde queimam como', {'ss': 11.8, 'src': 'fm_23832.mp4', 'tag': 'real', 'sat': 0.5, 'credito': 'Pixabay/NicholasDeloitteMedia'}),  # 75 Céu estrelado sobre o mar (timelapse real)
    ('se voce pudesse avancar', {'p': {'titulo': 'SÉCULOS', 'sub': 'O que fica', 'cor': '#c9b8ff', 'c1': '#141026', 'seed': 42, 'glitch': False, 'sat': 0.35}, 'capitulo': 'Séculos · O que fica', 'src': 'anim:u_cap', 'tag': 'anim'}),  # 76 Cartão SÉCULOS
    ('as casas de madeira', {'src': 'anim:u_linha', 'tag': 'anim', 'p': {'sat': 0.35}}),  # 77 Linha do tempo: madeira, pontes de aço, arranha-céus
    ('o concreto parece eterno', {'src': 'anim:u_concreto', 'tag': 'anim', 'p': {'sat': 0.35}}),  # 78 Corte do concreto: água → ferrugem → rachadura
    ('em alguns seculos', {'src': 'anim:u_colina', 'tag': 'anim', 'p': {'sat': 0.35}}),  # 79 Cidade vira colina coberta de floresta
    ('as piramides', {'src': 'fm_223565.mp4', 'tag': 'real', 'sat': 0.39, 'credito': 'Pixabay/Peggy_Marco'}),  # 80 Pirâmides de Gizé
    ('e alguns plasticos', {'src': 'anim:u_plastico', 'tag': 'anim', 'p': {'sat': 0.35}}),  # 81 Garrafa plástica que não some
    ('na lua onde nao tem', {'src': 'na_lua_apollo17.mp4', 'tag': 'real', 'sat': 0.39, 'credito': 'NASA', 'texto': 'LUA · APOLLO 17'}),  # 82 Superfície da Lua, Apollo 17 (NASA)
    ('as pegadas dos astronautas', {'src': 'anim:u_pegada', 'tag': 'anim', 'p': {'sat': 0.35}}),  # 83 Pegada: sem vento, sem chuva, 1.000.000 anos (ou mais)
    ('e la longe', {'src': 'anim:u_voyager', 'tag': 'anim', 'p': {'sat': 0.35}}),  # 84 Voyager fora do Sistema Solar
    ('carregando um disco', {'src': 'anim:u_disco', 'tag': 'anim', 'p': {'sat': 0.35}}),  # 85 Disco de ouro, 1977
    ('mas espera', {'src': 'anim:u_rebobina', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 86 Rebobinar: ESPERA... (a cor volta)
    ('quando todo mundo do planeta', {'src': 'anim:u_sobe', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 87 Câmera sobe da Terra escura: ainda tinha gente fora dele
    ('la em cima a quatrocentos', {'ss': 90.0, 'src': 'na_iss_terra.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'NASA'}),  # 88 A Terra vista da Estação Espacial (NASA)
    ('olhando pela janela', {'src': 'anim:u_cupula', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 89 Cúpula da estação, a 400 km de altura
    ('e eles tem como voltar', {'src': 'anim:u_capsula', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 90 Cápsula se soltando da estação
    ('talvez um dia voce esteja', {'ss': 1.0, 'src': 'fm_23832.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'Pixabay/NicholasDeloitteMedia'}),  # 91 Praia de dia (timelapse real)
    ('um ponto de fogo', {'ss': 2.0, 'src': 'na_orion_splash.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'NASA', 'texto': 'REENTRADA DA ORION · NASA'}),  # 92 Reentrada em chamas vista da janela da Orion (Artemis II, NASA)
    ('uma capsula descendo', {'ss': 578.0, 'src': 'na_orion_splash.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'NASA', 'texto': 'PARAQUEDAS DA ORION · NASA'}),  # 93 Paraquedas da Orion abertos (Artemis II, NASA)
    ('e pela primeira vez em meses', {'src': 'anim:u_voz', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 94 Onda de voz humana
    ('enquanto isso as nossas transmissoes', {'src': 'anim:u_bolha', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 95 Bolha de rádio: +100 anos-luz
    ('se alguem la fora', {'src': 'fm_40041.mp4', 'tag': 'real', 'sat': 1.12, 'credito': 'Pixabay/Matthias_Groeneveld'}),  # 96 Radiotelescópio apontado pro céu
    ('talvez o fim do mundo', {'src': 'anim:u_final', 'tag': 'anim', 'p': {'sat': 1.0}}),  # 97 Terra azul pequena: quando não sobra ninguém pra dividir
]
CANTO = [(17.42, 24.24, 'POPULAÇÃO DA TERRA: 1'), (24.24, 70.01, 'POPULAÇÃO: 1 · HORA 1'), (70.01, 144.56, 'POPULAÇÃO: 1 · DIA 1'), (144.56, 202.01, 'POPULAÇÃO: 1 · NOITE 1'), (202.01, 259.41, 'POPULAÇÃO: 1 · SEMANA 3'), (259.41, 320.49, 'POPULAÇÃO: 1 · ANO 1'), (320.49, 369.39, 'POPULAÇÃO: 1 · +100 ANOS')]
