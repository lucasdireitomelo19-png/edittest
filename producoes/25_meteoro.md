# 25 · Um meteoro vai explodir em cima da sua cidade ☄️ (lado-56)

- Short vertical POV, ~46 s · Remotion (`remotion/src/videos/Meteoro.tsx`, composição `Meteoro`) · voz Brian (ElevenLabs vel 1.2, pausa 0.12) · 31 cenas + card SIGA PARA MAIS.
- Roteiro: agente Roteirista, pré-aprovado pelo dono (lote_2026-10-24_pov_catastrofes.md, Short #1). Storyboard aprovado pelo dono; ele dispensou a prévia ("manda direto").
- Visual: 3 clipes reais Pixabay de cidades ilustrativas (r303665 skyline, r2165 trânsito, r199 rua), com etiqueta; mapa real Natural Earth da Rússia com pino em Chelyabinsk (`dados/russia.json`); globo com `dados/mundo.json`; reconstrução animada da entrada, explosão no céu e onda de choque marcada ANIMAÇÃO · RECONSTRUÇÃO.
- Tela: "15/02/2013 · CHELYABINSK, RÚSSIA", "~20 M", "7.200 PRÉDIOS", "1.500 FERIDOS · NENHUMA MORTE", gráfico antes 120–150 anos × agora 30–40 anos, "1 A CADA 30–40 ANOS" + "NO MUNDO" (obrigatório). Vidro quebrando sem pessoas feridas.
- Técnica: primeiro vídeo com `remotion/src/comum.tsx` (peças comuns + `montar()`): as cenas começam em frases-âncora do roteiro, então trocar a narração provisória do edge-tts pela do Brian não exigiu reindexar nada.
