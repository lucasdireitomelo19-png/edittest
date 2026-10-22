# 20 · Você é a ÚLTIMA pessoa da Terra: hora por hora, até o fim (lado-51, longo)

- Vídeo longo 1920x1080, 7:04 · voz Brian (ElevenLabs vel 1.1, sem atempo) · 97 cenas (26 reais / 71 animações próprias, nenhuma repetida) · −14 LUFS.
- Roteiro: `roteiros/longo_todo_mundo_sumiu.md` (outra sessão, aprovado). Legendas de postagem: `roteiros/longo_todo_mundo_sumiu_legendas.md` (capítulos corrigidos para os tempos reais abaixo).
- Animações: `pipeline/anim/ultima.html` (cenas `u_*`). Plano: `videos/v42_ultima_pessoa/plano.py` → `gerar_cenas.py` → `cenas.py` → `motor_h.py`.
- Visual: a saturação cai a cada capítulo (1 → 0,85 → 0,7 → 0,55 → 0,45 → 0,35) e volta inteira em "Mas espera…". Marcador fixo no canto "POPULAÇÃO: 1 · HORA 1 / DIA 1 / …" (`CANTO` no motor_h).
- Reais: Pixabay (cidade vazia, estrada, carro, estádio, usinas, barragem, celular, metrô, Via Láctea, rádio, incêndio, cervo, casa abandonada, Pripyat, lobo, pirâmides, praia, radiotelescópio) + NASA (Lua/Apollo 17, Terra vista da ISS, reentrada e paraquedas da Orion; missão não confirmada, o texto diz só "ORION · NASA").
- Trilha própria (`musica.wav`): fundo tenso no gancho, trilha animada na HORA 1 cortada seco em "Mas o mundo não funciona sozinho", fundo grave, silêncio + chiado em "Só chiado… Nenhuma voz", tema esperançoso a partir de "Mas espera".
- Thumbnail escolhida pelo dono: `videos/v42_ultima_pessoa/thumb_a.jpg` ("8 BILHÕES SUMIRAM", Terra apagada com um ponto aceso = VOCÊ). Alternativa: `thumb_b.jpg`.
- Lição técnica: `ctx.filter` no canvas deixava cada quadro ~50× mais lento; a dessaturação das animações agora é feita no ffmpeg (`p.sat` → `eq=saturation` no motor_h).

Capítulos: 0:00 Acordar sozinho · 0:24 Hora 1: o mundo é seu · 1:10 Dia 1: o apagão · 2:24 Noite 1: o silêncio · 3:22 Semanas depois · 4:19 Ano 1: a natureza volta · 5:20 Séculos: o que fica · 6:09 Mas espera…
