# 61 · Short "SE A GUERRA VIER: 33 PAÍSES JÁ MANDARAM VOCÊ GUARDAR COMIDA ⚠️" (lado-108)

Roteiro: `short_estoque_emergencia.md` (branch `claude/practical-cannon-ly7fw1`, commit 4445729). É a v2 tensa, aprovada pelo dono em 11/11/2026.

## Ficha técnica
- **Composição:** `Estoque`, em `src/videos/Estoque.tsx`. É um Short 1080x1920 de 56 s, com 16 cenas em Remotion 3D, nenhuma repetida. Não tem thumb.
- **Voz:** Brian (`--vel 1.2 --pausa 0.12`), legenda 56. O flash de virada está em "Nenhum governo disse".
- **Trilha:** sintetizada com ffmpeg (`public/estoque/musica.mp3`). Um drone grave em 41 e 62 Hz com pulso, mais uma sirene distante com eco. A sirene some antes de "Pro caso de começar". Ela entra pelo `Extra` do `criarShort`.

## Tela
- **Nomes em neon:** SUÉCIA, UNIÃO EUROPEIA, REINO UNIDO, NORUEGA, ALEMANHA e BRASIL.
- **Alarmes:** os países acendem em vermelho, pulsando (`Alarme` = `Calota` + brilho), em cascata.
- **Terra:** à noite (`Noite`), com luzes geradas a partir do Blue Marble e uma luz ambiente fraca, para os continentes aparecerem.
- **Cenas:**
  - folheto sem texto legível;
  - folhetos caindo como neve sobre casas vermelhas;
  - 33 alarmes no globo;
  - prateleira de latas;
  - ampulheta sobre a Europa;
  - giroflex vermelho;
  - apagão em ondas no Reino Unido;
  - ampulhetas crescendo (Suécia → Noruega → Alemanha);
  - mochila com os itens sob a lanterna;
  - cartão recusado e dinheiro;
  - voo até o Brasil;
  - relógio de 72 h;
  - mundo em alerta;
  - o Brasil passando de vermelho para âmbar;
  - casinha com uma janela acesa.
- **Fora do vídeo:** guerra, pânico e qualquer frase dizendo que a guerra vai começar.

## Lições
- Num Short vertical, um globo com câmera a menos de 2,4 de distância vira tela preta (lado noturno). Use d ≥ 2,4 e luz ambiente.
- Uma calota grande (ang > 0,25) perto da câmera vira um disco que cobre a tela.
