FIM = 600.0
SAIDA = "dentro_buraco_negro_10min.mp4"
FINAL = "O QUE EXISTE LÁ DENTRO?"
MAX_PLANO = 7.0
MUSICA = "musica.wav"   # trilha original gerada por musica.py (sem direitos de terceiros)

PL = "bh_plunge.mp4"       # NASA 2024: mergulho no buraco negro
FB = "bh_flyby.mp4"        # NASA 2024: voo rasante
AP = "bd_approach.mp4"     # NASA 2024: aproximação com disco
OR = "bd_orbit.mp4"
PB = "bd_pullback.mp4"
UC = "bd_upclose.mp4"
GR = "bd_grid.mp4"         # com grade do espaço-tempo
GF = "bd_gridfly.mp4"
DC = "bd_diskc.mp4"        # NASA 2019: disco de acreção
DK = "bd_disk360.mp4"
SZ = "bd_sizes.mp4"        # NASA: comparação de tamanhos (sem texto)
SH = "bh_shred.mp4"        # estrela rasgada (até 37 s; depois tem logotipo)
TI = "bh_tidal.mp4"
EH = "bd_eso2208a.mp4"     # ESO: documentário EHT (só trechos sem texto)
MW = "eso_eso2208-eht-mwb.mp4"
S = "eso_esocast203a.mp4"  # céu (ESO)
TERRA = "ns_earth_spin.mp4"
M87, SGR, M87P = "bdi_m87.jpg", "bdi_sgra.jpg", "bdi_m87pol.jpg"
HAW = "fl_hawking.jpg"

def A(nome, **p): return dict(src="anim:" + nome, p=p)
def cap(num, titulo, nome): return dict(src="anim:capitulo", p=dict(num=num, titulo=titulo), capitulo=nome)
def V(src, ss, tag="sim", **k): return dict(src=src, ss=ss, tag=tag, **k)
def I(src, tag="real", **k): return dict(src=src, tag=tag, **k)
def Q(texto, autor=None): return A("citacao", texto=texto, **({"autor": autor} if autor else {}))

CENAS = [
    # ---------------- ABERTURA ----------------
    ("imagine que voce esta numa nave", V(AP, 0, zoom=(1.0, 1.1))),
    ("la embaixo um disco de gas", V(OR, 0)),
    ("e no centro dele uma escuridao", V(UC, 0, zoom=(1.0, 1.15))),
    ("agora imagine que voce desliga", V(PL, 0)),
    ("e comeca a cair", V(PL, 14, shake=2)),
    ("o que voce veria", V(FB, 4)),
    ("o que sentiria", V(PL, 30)),
    ("e o mais importante", V(FB, 30)),
    ("depois do ponto sem volta", V(UC, 6, zoom=(1.1, 1.3))),
    ("essa e uma das perguntas", V(EH, 152.5)),
    ("e a resposta mais honesta", Q("Ninguém sabe.")),
    ("mas a gente sabe muito", V(GR, 0)),
    ("e esse caminho e mais estranho", V(GF, 0)),
    ("hoje a gente vai fazer essa viagem", A("capitulo", num="LADO SOMBRIO DO UNIVERSO", titulo="DENTRO DO BURACO NEGRO")),
    ("do lado de fora", V(PB, 0)),
    # ---------------- 1 ----------------
    ("tudo comeca com uma estrela", cap("CAPÍTULO 1", "COMO NASCE UM MONSTRO", "Como nasce um buraco negro")),
    ("uma estrela passa a vida", V(S, 543, "real")),
    ("a gravidade puxa tudo", V(SZ, 0, zoom=(1.0, 1.2))),
    ("mas um dia o combustivel acaba", V(S, 106, "real")),
    ("quando uma estrela com muito mais massa", dict(A("colapso"), tag="anim")),
    ("isso e um buraco negro", V(DC, 0)),
    ("e materia esmagada", V(GR, 5)),
    ("a versao moderna dessa ideia", Q("1916", "Karl Schwarzschild · físico alemão")),
    ("estava servindo na primeira guerra", V(S, 556, "real")),
    ("quando resolveu as equacoes", V(GR, 9, texto="RELATIVIDADE GERAL")),
    ("schwarzschild morreu naquele mesmo ano", V(MW, 0, "real")),
    ("para ter uma ideia do quanto", dict(A("tamanho"), tag="ilus")),
    # ---------------- 2 ----------------
    ("e eles existem muitos", cap("CAPÍTULO 2", "MONSTROS DE TODOS OS TAMANHOS", "Monstros de todos os tamanhos")),
    ("os astronomos estimam", V(EH, 312, "anim", texto="~100 MILHÕES SÓ NA VIA LÁCTEA")),
    ("a maioria completamente invisivel", V(TI, 0)),
    ("um dos primeiros a ser identificado", V(DK, 0, texto="CYGNUS X-1")),
    ("em 1974 stephen hawking", I(HAW, crop=(100, 330, 860, 484), texto="STEPHEN HAWKING", credito="NASA/Paul E. Alers (foto de 2008)", zoom=(1.0, 1.12))),
    ("em 1990 hawking admitiu", Q("1990:|Hawking admite a derrota")),
    ("mas os buracos negros de estrelas", V(SZ, 15)),
    ("no centro de quase toda grande galaxia", V(EH, 318, "anim")),
    ("o da via lactea se chama", V(MW, 10, "real", texto="SAGITÁRIO A*")),
    ("ele tem cerca de quatro milhoes", V(MW, 30, "real", texto="4 MILHÕES DE SÓIS")),
    ("e ele nem e dos maiores", V(SZ, 40)),
    ("o buraco negro da galaxia m87", I(M87, texto="M87* · 6,5 BILHÕES DE SÓIS", zoom=(1.0, 1.15))),
    ("o horizonte dele engoliria", V(SZ, 50)),
    ("e alguns gigantes", V(SZ, 70)),
    # ---------------- 3 ----------------
    ("agora de volta a nossa nave", cap("CAPÍTULO 3", "O PONTO SEM VOLTA", "O ponto sem volta")),
    ("vamos cair", V(PL, 2)),
    ("a medida que voce se aproxima", V(AP, 4)),
    ("o disco de gas aparece distorcido", V(OR, 5)),
    ("e entao voce chega a fronteira", V(UC, 0, texto="HORIZONTE DE EVENTOS")),
    ("ele nao e uma superficie", V(GR, 0)),
    ("e apenas a distancia", V(GF, 0)),
    ("e nada vai mais rapido", V(EH, 15)),
    ("mas aqui acontece uma coisa estranha", dict(A("relogio"), tag="ilus")),
    ("isso acontece porque perto", V(EH, 156, texto="O TEMPO PASSA MAIS DEVAGAR")),
    ("nao e ilusao", V(GR, 7)),
    ("os relogios dos satelites de gps", V(TERRA, 20, None, texto="GPS: 38 MICROSSEGUNDOS POR DIA")),
    ("ja para voce que esta caindo", V(PL, 26)),
    ("e voce cruza o horizonte", V(PL, 40)),
    ("isso claro se voce ainda", V(UC, 8)),
    # ---------------- 4 ----------------
    ("porque existe um problema", cap("CAPÍTULO 4", "ESPAGUETIFICAÇÃO", "Espaguetificação")),
    ("a gravidade fica mais forte", dict(A("espaguete", texto="ESPAGUETIFICAÇÃO"), tag="ilus")),
    ("e aqui vem a parte contraintuitiva", Q("Quanto menor o buraco negro,|pior.")),
    ("num buraco negro de estrela", V(TI, 4)),
    ("mas num supermassivo", V(FB, 18)),
    ("em 2024 a nasa criou", V(PL, 0, texto="SIMULAÇÃO DA NASA · 2024")),
    ("uma camera cai em direcao", V(PL, 8)),
    ("ela leva cerca de tres horas", V(PL, 20, texto="~3 HORAS ATÉ O HORIZONTE")),
    ("quando atravessa", V(PL, 42, texto="12,8 SEGUNDOS")),
    ("e isso nao acontece so em simulacoes", V(SH, 12)),
    ("uma parte do gas cai", V(SH, 22)),
    # ---------------- 5 ----------------
    ("mas e se voce sobrevivesse", cap("CAPÍTULO 5", "DO LADO DE DENTRO", "Do lado de dentro")),
    ("aqui a fisica fica realmente estranha", V(PL, 48)),
    ("do lado de fora voce pode andar", V(DK, 0)),
    ("dentro do horizonte segundo a relatividade", V(UC, 3)),
    ("o centro do buraco negro deixa de ser", Q("O centro deixa de ser um lugar|e vira um momento no seu futuro")),
    ("ou seja tentar fugir", V(PL, 50)),
    ("nao importa para onde voce vire", V(EH, 159)),
    ("ate a luz da sua lanterna", V(PL, 53)),
    # ---------------- 6 ----------------
    ("e esse centro tem um nome", cap("CAPÍTULO 6", "A SINGULARIDADE", "A singularidade")),
    ("pelas equacoes de einstein", V(DC, 3, texto="DENSIDADE INFINITA?")),
    ("um lugar onde o espaco e o tempo", V(GR, 3)),
    ("mas quase nenhum fisico acredita", V(EH, 152.5)),
    ("quando uma equacao da infinito", Q("Quando a equação dá infinito,|ela chegou ao limite.")),
    ("a relatividade geral explica", V(EH, 312, "anim", texto="RELATIVIDADE: O MUITO GRANDE")),
    ("a mecanica quantica explica", Q("Mecânica quântica:|o muito pequeno")),
    ("no centro de um buraco negro algo", V(DC, 6)),
    ("so que elas nao se encaixam", V(GF, 5)),
    ("para entender a singularidade", Q("Falta uma teoria:|a gravidade quântica")),
    ("foi tentando juntar essas duas pecas", I(HAW, crop=(100, 330, 860, 484), texto="STEPHEN HAWKING", credito="NASA/Paul E. Alers (foto de 2008)", zoom=(1.12, 1.0))),
    ("buracos negros nao sao totalmente negros", dict(A("hawking", titulo="RADIAÇÃO DE HAWKING · 1974"), tag="ilus")),
    ("um buraco negro com a massa do sol", dict(A("hawking", texto="10⁶⁷ ANOS PARA EVAPORAR"), tag="ilus")),
    ("o universo inteiro tem so", V(S, 172, "real", texto="UNIVERSO: 13,8 BILHÕES DE ANOS")),
    ("mas essa descoberta criou", V(EH, 156)),
    ("pela fisica quantica a informacao", V(DK, 5)),
    ("esse e o paradoxo da informacao", Q("O paradoxo da informação", "em aberto há 50 anos")),
    ("e e uma das maiores brigas", V(UC, 10)),
    # ---------------- 7 ----------------
    ("entao o que existe dentro", cap("CAPÍTULO 7", "PORTAS PARA OUTRO LUGAR?", "Portas para outro lugar?")),
    ("sem uma teoria completa", V(EH, 15)),
    ("e importante deixar claro", Q("HIPÓTESES|nenhuma comprovada")),
    ("a mais famosa e o buraco de minhoca", dict(A("minhoca", texto="PONTE DE EINSTEIN-ROSEN · 1935"), tag="ilus")),
    ("e nunca se encontrou", V(S, 556, "real")),
    ("outra ideia e ainda mais ousada", V(EH, 316, "anim")),
    ("e ha quem va alem", V(S, 106, "real")),
    ("mas existe um detalhe", V(GR, 10)),
    ("o big bang tambem e", V(S, 543, "real", texto="BIG BANG: OUTRA SINGULARIDADE")),
    ("talvez entender o centro", V(PB, 0)),
    # ---------------- 8 ----------------
    ("durante decadas os buracos negros", cap("CAPÍTULO 8", "A PRIMEIRA FOTO", "A primeira foto")),
    ("ate que em 2019", I(M87, texto="2019", zoom=(1.25, 1.0))),
    ("o event horizon telescope uniu", V(EH, 88, "real")),
    ("do havai ao polo sul", V(EH, 167.5, "real")),
    ("para formar um telescopio virtual", dict(A("eht", texto="UM TELESCÓPIO DO TAMANHO DA TERRA"), tag="ilus")),
    ("o alvo foi o buraco negro", I(M87, texto="M87* · 55 MILHÕES DE ANOS-LUZ", zoom=(1.0, 1.2))),
    ("um anel de gas brilhante", I(M87P, fit=1, zoom=(1.0, 1.1))),
    ("em 2022 veio a foto", I(SGR, fit=1, texto="SAGITÁRIO A* · 2022", zoom=(1.0, 1.1))),
    ("aquela sombra no meio", I(SGR, zoom=(1.3, 1.8))),
    ("tudo o que entra ali", V(UC, 0)),
    ("e e isso que torna", V(OR, 0)),
    ("eles guardam um segredo", V(PL, 36)),
    ("la dentro existe uma resposta", I(M87, zoom=(1.0, 1.35), escurecer=1, inteiro=1)),
]
