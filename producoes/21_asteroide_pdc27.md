# 21 · Esse asteroide tem 19% de chance de acertar a Terra… e NÃO EXISTE ☄️ (lado-52)

- Short vertical, 52 s · voz Brian (ElevenLabs vel 1.2) · 21 cenas / 28 cortes (maior plano 2,6 s) · −14 LUFS · sem música, impacto seco em "Só tem um detalhe".
- Roteiro: agente Roteirista, pré-aprovado pelo dono (`roteiros/lote_2026-10-22_pdc27.md` #1, branch claude/practical-cannon-ly7fw1). Fatos conferidos em `fatos.md` ("Asteroides e impactos").
- Animações `va_*` em `pipeline/anim/vert.html`; plano em `videos/v43_pdc27/plano.py`.
- Honestidade: o 2026 PDC27 é fictício (cenário de treino da NASA). Selo "EXERCÍCIO · FICTÍCIO" no canto de "Ele se chama" até "Parece exagero?", carimbo FICTÍCIO na virada e no fim, etiquetas ANIMAÇÃO/ILUSTRAÇÃO. Data da Hera fora (fontes divergem).
- Reais: radiotelescópios (Pixabay/Matthias_Groeneveld), imagens da câmera da DART chegando em Dimorphos (NASA, recorte de `sv_14215_DART_WIDE_MP4.mp4` sem texto), Via Láctea (Pixabay/Kanenori).
- Central: lado-52, Pronto, com as 6 legendas do subagente `legendas` (`videos/v43_pdc27/legendas.json`), descrição sem fontes.
- Técnica: `gerar_short.py` aceita recorte `#c=x,y,w,h` (frações do quadro); `SAT` agora é aplicado no ffmpeg; `DIAS` com rótulo vazio deixa o canto limpo.
