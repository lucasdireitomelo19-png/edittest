# Short "Esse asteroide tem 19% de chance de acertar a Terra… e NÃO EXISTE" (vertical).
# Roteiro do agente Roteirista, pré-aprovado pelo dono: producoes/roteiros/lote_2026-10-22_pdc27.md (#1, branch claude/practical-cannon-ly7fw1).
# O PDC27 é fictício: toda imagem dele é animação/ilustração e o canto mostra "EXERCÍCIO · FICTÍCIO" durante o trecho dele.
PLANO = [
    ("oitenta metros", "mg:va_80m", "Pedra de 80 m caindo ao lado de um prédio de ~25 andares (ilustração)"),
    ("dezenove por cento", "mg:va_19", "Medidor enchendo até 19%: CHANCE DE IMPACTO"),
    ("dez de julho", "mg:va_data", "Calendário: 10 de julho de 2038"),
    ("so tem um detalhe", "mg:va_carimbo", "A ficha do asteroide leva o carimbo vermelho FICTÍCIO"),
    ("ele se chama", "mg:va_nome", "Órbita do 2026 PDC27: cenário de treino da NASA"),
    ("e um treino", "mg:va_mesa", "Cientistas e governos em volta da mesa, telão SIMULAÇÃO"),
    ("como avisar a populacao", "mg:va_alerta", "Celular com alerta de impacto: simulação, NÃO É REAL"),
    ("da pra desviar", "mg:va_desvio", "Um empurrão desvia a rota da Terra"),
    ("parece exagero", "px:179777", "Radiotelescópios reais"),
    ("em 2025 um asteroide de verdade", "mg:va_yr4", "Gráfico real do 2024 YR4 subindo até 3,1%"),
    ("recorde para o tamanho", "mg:va_recorde", "3,1%: RECORDE para um asteroide de ~53 a 67 m"),
    ("so foi descartado", "mg:va_zero", "A chance despenca para ≈0% em 5 dias"),
    ("e em 2013", "mg:va_ru", "Mapa real: zoom até Chelyabinsk, Rússia, 15/02/2013"),
    ("uma pedra de so vinte metros", "mg:va_rastro", "Bola de fogo riscando o céu da manhã: 20 m (animação)"),
    ("e feriu mil e quinhentas", "mg:va_feridos", "Janelas estilhaçando: ~1.500 feridos, ~7.200 prédios"),
    ("a boa noticia", "svs:14215_DART_WIDE_MP4.mp4@11.3#c=0.43,0.22,0.183,0.58", "Imagens reais da câmera da DART chegando em Dimorphos (NASA, recorte sem texto)"),
    ("e mudou a orbita dele", "mg:va_orbita", "Órbita de Dimorphos encolhe: −32 min"),
    ("a ma noticia", "px:285663", "Via Láctea real sobre uma cabana (timelapse)"),
    ("dos asteroides grandes", "mg:va_metade", "100 pontos, menos da metade acesos: ≥140 m encontrados"),
    ("o pdc27 e de mentira", "mg:va_mentira", "O PDC27 se desfaz em pixels, carimbo FICTÍCIO"),
    ("o proximo pode ser", "mg:va_proximo", "Um ponto vermelho vindo em direção à Terra: O PRÓXIMO"),
]
DIAS_ANC = [("ele se chama", "EXERCÍCIO · FICTÍCIO"), ("parece exagero", "")]
SONS = {"so tem um detalhe": ("hit", -10)}
