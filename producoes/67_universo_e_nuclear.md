# 67 · Short do universo (lado-115) + longo da guerra nuclear (lado-116)

Roteiros aprovados pelo dono em 16/11/2026 (branch `claude/practical-cannon-ly7fw1`, commit 0bf928d). A ordem do dono foi o Short primeiro e o longo depois.

## lado-115 · Short "QUAL O TAMANHO REAL DO UNIVERSO? 🌌"
- **Composição:** `Universo`, 57 s, 14 cenas em Remotion 3D. Não tem thumb.
- **Zoom-out em etapas:** pessoa ("VOCÊ ESTÁ AQUI" e seta) → Terra → Sistema Solar → Via Láctea → teia cósmica → esfera observável → algo maior.
- **Canto:** régua de distância: 1,7 m → 12.700 km → 1,4 milhão de km → 100 mil anos-luz → 93 bilhões de anos-luz.
- **Trilha:** sintetizada (`public/universo/musica.mp3`), passando do agudo ao grave ao longo do vídeo.
- **Peças novas:** `Teia` (nós + filamentos) e `Esfera` (universo observável com borda brilhante, em shader).
- **Atenção:** o render passou de 19,5 MB com crf 24 (partículas). Reencodei com `-b:v 2400k`.

## lado-116 · Longo POV "VOCÊ SOBREVIVEU A UMA GUERRA NUCLEAR: DO DIA 1 AO DIA 365"
- **Composição:** `Nuclear`, 6:21, 68 cenas em Remotion 3D. Voz Brian, com 2,2 s antes de cada um dos 9 capítulos. Trilha com semente 116.
- **Canto:** marcador "T − 30 MIN → T + 0 → T + 10 S → T + 10 MIN → T + 24 H → T + 2 SEMANAS → T + 1 MÊS → T + 1 ANO". É âmbar antes do clarão e vermelho depois. Congela em cinza (❚❚) no "Mas espera".
- **Regra de ouro:** sem bandeira, país atacante ou política. O arco do míssil não tem origem e nada é gráfico; as pessoas são silhuetas sem rosto. Os únicos nomes em neon são ARGENTINA, AUSTRÁLIA e NOVA ZELÂNDIA.
- **Cartão de capítulo:** anéis vermelhos de alerta pulsando, em cinza na virada.
- **Thumb:** "DIA 1 A 365", com uma cidade apagada sob céu alaranjado, uma silhueta de costas e a faixa vermelha "VOCÊ SOBREVIVEU À BOMBA…". A cena é o Still `ThumbNuclear`, e o texto entra depois com PIL.
- **Render:** 4 partes. Um reinício do servidor matou a parte 1, e o render foi refeito do zero.
