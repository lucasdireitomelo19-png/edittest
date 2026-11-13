# 64 · Short "E SE O OXIGÊNIO SUMISSE POR 5 SEGUNDOS? ⏱️" (lado-111)

Roteiro: `short_oxigenio_5s.md` (branch `claude/practical-cannon-ly7fw1`, commit b58b8e1), aprovado pelo dono em 13/11/2026, para postar no mesmo dia.

## Estilo novo: "ESTILO GRINGO" (Modelo C, decisão do dono)
- **Bonequinho:** desenhado em SVG (`Boneco` em `src/videos/Oxigenio.tsx`), cabeça grande com contorno preto e corpo de palitos.
  - **Expressões:** choque, susto, pânico, alívio, tranquilo, bochecha cheia, "ué", aponta e engasga.
  - **Mãos:** ouvido, cima, lado, joinha, aponta e olha.
  - Entra com squash/stretch (spring) e balança de leve.
- **Fundos reais:** exceção à regra do 3D, liberada pelo dono para este vídeo.
  - São 24 fotos CC0 do StockSnap e do WordPress Photo Directory, achadas pelo Openverse (`source=stocksnap,wordpress`, `license=cc0`). Não exigem crédito. A lista está em `public/oxigenio/fundos/creditos_cc0.json`.
  - Cada foto aparece numa cena só, com Ken Burns lento.
- **Relógio de 5 s:** fica no topo e conta 5…1 nas palavras ditas, com tique em cada número. No "nível dois" reinicia em vermelho e desce até 0 no fim.
- **Legenda:** grande, 1 palavra por vez, em maiúsculas. As palavras-chave saem em amarelo.
- Sem selos.
- **Trilha e sons:** `musica.py` (semente 111) baixa, whoosh nos cortes, hit no "nível dois" e no estalo do ouvido.

## Ficha técnica
- **Composição:** `Oxigenio`, 1080x1920, 63 s, 24 cenas. É Short, sem thumb.
- **Render:** sem WebGL (só SVG e Img), com `--concurrency=4`, em ~10 min. O container tem 4 núcleos, e uma concorrência maior dá erro.

## Lições
- **Pixabay:** a chave injetada pelo proxy continua dando 400 (Invalid API key).
- **Openverse:** dá 504 com frequência. Repita com pausas de 10 s.
- **Fontes que funcionam para foto livre:** StockSnap e WordPress Photos (CC0).
