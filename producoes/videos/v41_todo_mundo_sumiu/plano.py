# Short POV "E se você ACORDASSE e todo mundo tivesse sumido?" (vertical). Roteiro: producoes/roteiros/short_pov_todo_mundo_sumiu.md (v2).
# Pedido: 80% motion graphics / 20% vídeo real. Cores quentes na euforia, dessaturando depois da virada (p.sat nas animações).
PLANO = [
    ("voce acorda", "mg:vz_acorda", "Despertador e celular: 0 mensagens"),
    ("e todo mundo do planeta sumiu", "mg:vz_globo", "Contador de pessoas na Terra: 8 bilhões → 1"),
    ("so voce", "px:3149@0.3", "Cidade vista de drone ao amanhecer, ponte vazia"),
    ("no comeco e um sonho", "mg:vz_loja", "Prateleiras esvaziando no carrinho: TUDO GRÁTIS"),
    ("escolhe uma mansao", "mg:vz_mansao", "Chave girando e a mansão acendendo"),
    ("dirige uma ferrari", "px:73801@2", "Carro numa estrada vazia (ilustração 3D)"),
    ("sem ninguem na rua", "mg:vz_velo", "Velocímetro 0 → 200 km/h"),
    ("o mundo inteiro e seu", "mg:vz_seu", "Globo com coroa: O MUNDO É SEU"),
    ("mas ai os problemas comecam", "mg:vz_mas", "Glitch e corte seco: MAS…"),
    ("nao tem ninguem nas usinas", "mg:vz_usina", "Usina sem operadores, alertas vermelhos"),
    ("em poucas horas", "mg:vz_luzes", "Terra à noite apagando por regiões"),
    ("a internet cai", "mg:vz_wifi", "Wi-Fi caindo, celular sem sinal"),
    ("sem energia as bombas param", "mg:vz_torneira", "Torneira parando e caixa d'água esvaziando"),
    ("a comida da geladeira", "mg:vz_geladeira", "Comida estragando (estilizado) e pilha de latas"),
    ("se voce se machucar", "mg:vz_medico", "Cruz de hospital apagando, alerta INFECÇÃO (ícone)"),
    ("e o pior vem a noite", "px:94978", "Rua estreita e escura à noite"),
    ("nenhum som", "mg:vz_silencio", "Onda sonora ficando plana: 0 dB (silêncio total)"),
    ("a natureza comeca", "mg:vz_mato", "Mato rachando o asfalto, trepadeira subindo o prédio"),
    ("como em pripyat", "px:139015", "Pripyat hoje: prédio no meio das árvores"),
    ("abandonada desde 1986", "px:137271", "Sala abandonada em Pripyat, com musgo no chão"),
    ("mas tem um detalhe", "mg:vz_sobe", "Câmera sobe da Terra escura até a órbita"),
    ("la em cima na estacao espacial", "src:na_iss_terra.mp4@20", "A Terra vista da Estação Espacial (NASA, real)"),
    ("olhando pra uma terra", "mg:vz_escura", "Terra apagada e o pontinho da ISS"),
]
SAT = {"mas ai os problemas comecam": 0.75, "nao tem ninguem nas usinas": 0.6, "em poucas horas": 0.55, "a internet cai": 0.5, "sem energia as bombas param": 0.45,
       "a comida da geladeira": 0.4, "se voce se machucar": 0.35, "nenhum som": 0.2, "a natureza comeca": 0.4, "mas tem um detalhe": 0.5, "olhando pra uma terra": 0.4}
DIAS_ANC = [("voce acorda", "DIA 1"), ("a internet cai", "DIA 2"), ("a comida da geladeira", "DIA 7"), ("a natureza comeca", "1 ANO")]
SONS = {"mas ai os problemas comecam": ("hit", -10)}
