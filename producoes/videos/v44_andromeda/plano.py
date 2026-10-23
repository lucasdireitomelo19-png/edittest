# Short "A Via Láctea está em ROTA DE COLISÃO" (vertical). Roteiro do agente Roteirista, pré-aprovado pelo dono (v4):
# producoes/roteiros/lote_2026-10-23_andromeda.md #1 (branch claude/practical-cannon-ly7fw1).
# Base visual: simulação científica da NASA (SVS 30955, Milky Way & Andromeda), ilustração NASA/STScI de 2012 do céu em 3,75 bi de anos,
# mosaico real de Andrômeda do Hubble e uma elíptica real (NGC 3610). A chance da colisão (50–90%) fica fixa no canto a partir do impacto.
SV = "30955_colisao.mp4"; C = "#c=0.39,0,0.316,1"   # recorte vertical do centro, sem os textos em inglês dos cantos
PLANO = [
    ("nossa galaxia esta em rota", f"svs:{SV}@31{C}", "As duas galáxias se aproximando (simulação NASA)"),
    ("e nao tem como desviar", "mg:vn_rota", "Via Láctea e Andrômeda ligadas por uma linha vermelha: SEM DESVIO"),
    ("o nome dela e andromeda", "svs:14847_vert.mp4@111#topo", "Andrômeda real, mosaico do Hubble (NASA/ESA)"),
    ("um trilhao de estrelas", "mg:vn_trilhao", "Contador: 1.000.000.000.000 ESTRELAS"),
    ("a quatrocentos mil", "mg:vn_velo", "400.000 KM/H, ≈110 km por segundo"),
    ("hoje ela e so uma mancha", "mg:vn_mancha", "Céu da Terra hoje: Andrômeda é uma manchinha circulada"),
    ("mas ela esta crescendo", "mg:vn_cresce", "Andrômeda crescendo no céu, +0 → +3 BI DE ANOS (ilustração)"),
    ("ate o dia em que ela toma", "src:na_ceu_andromeda_375.jpg", "Céu da Terra em 3,75 bilhões de anos (simulação NASA/STScI, 2012)"),
    ("ai vem o impacto", f"svs:{SV}@37{C}", "O primeiro choque das galáxias (simulação NASA)"),
    ("duas galaxias se rasgando", f"svs:{SV}@43.5{C}", "Os discos se deformando, braços arrancados (simulação NASA)"),
    ("o ceu pega fogo", "mg:vn_fogo", "O céu explode em estrelas novas (ilustração)"),
    ("nas simulacoes o sol", "mg:vn_sol", "O Sol arremessado pra fora do disco"),
    ("com a terra junto", "mg:vn_terra", "Sol e Terra viajando juntos"),
    ("e o mais estranho", "mg:vn_estrelas", "Duas nuvens de estrelas se atravessando sem bater"),
    ("o espaco entre elas", "mg:vn_espaco", "Sol → Próxima Centauri: 4,2 ANOS-LUZ"),
    ("no fim sobra uma galaxia so", f"svs:{SV}@60{C}", "A galáxia fundida, sem braços (simulação NASA)"),
    ("gigante sem bracos", "src:hb_eliptica.jpg", "Galáxia elíptica real NGC 3610 (Hubble), exemplo"),
    ("a via lactea a nossa casa", "mg:vn_casa", "A espiral da Via Láctea some: DEIXA DE EXISTIR"),
    ("a terra ate sobrevive", "mg:vn_terra_ok", "A Terra intacta, com check verde"),
    ("mas a essa altura", "mg:vn_oceano", "Sol mais brilhante, oceanos evaporando em ~1 bi de anos"),
    ("a colisao vem", "mg:vn_fim", "A galáxia nova brilhando sobre uma Terra vazia"),
]
TEXTOS = {"ate o dia em que ela toma": "+3,75 BI DE ANOS", "ai vem o impacto": "+4 BI DE ANOS", "no fim sobra uma galaxia so": "+6 BI DE ANOS",
          "gigante sem bracos": "EXEMPLO DE GALÁXIA ELÍPTICA"}
DIAS_ANC = [("ai vem o impacto", "SIMULAÇÃO NASA · CHANCE ESTIMADA: 50–90%")]
DIAS_TAM = 30
ETIQUETAS = "videos"
SONS = {"ai vem o impacto": ("hit", -9)}
