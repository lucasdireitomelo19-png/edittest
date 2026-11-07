# 57 · Short "E se a Pangeia voltasse" (lado-101)

O dono aprovou o roteiro em 07/11/2026 e mandou o Gerador começar pelo Short. O roteiro veio do Roteirista, e o guia visual, da Pesquisas. O longo POV (`longo_pangeia_volta.md`) vem depois.

## Formato
Segue o formato novo:
- só a legenda (tamanho 56);
- nenhum selo;
- tudo em Remotion 3D.

**Exceção liberada pelo dono para a Pangeia:** os nomes de lugares aparecem na tela, em branco com neon ciano. São eles: OCEANO ATLÂNTICO, NORDESTE, GOLFO DA GUINÉ, ÁFRICA, SÃO LUÍS, OESTE DA ÁFRICA e BRASIL. A etiqueta "simulação" ficou de fora.

## Ficha técnica
- **Composição:** `Pangeia`, em `src/videos/Pangeia.tsx`.
- **Formato:** 1080x1920, 51,5 s, 22 cenas.
- **Narração:** voz Brian (`--vel 1.2 --pausa 0.12`). Fica em `public/pangeia/`.
- **Saída:** `out/lado101_pangeia.mp4`, com loudnorm em −14 LUFS.
- **Thumb:** "BRASIL COLA NA ÁFRICA". A cena é o Still `ThumbPangeia` (o Nordeste vermelho encaixando no Golfo da Guiné, com brasa na emenda). O texto entra depois, com PIL.

## Mapa 3D com continentes móveis (reaproveitável no longo)
1. **Máscaras dos continentes** (`m_*.png`):
   - saem do Natural Earth (domínio público), pelos pacotes npm `world-atlas@2.0.2` e `topojson-client@3.1.0`;
   - o script é `producoes/pipeline/pangeia_masks.py`;
   - classifica cada anel de polígono pelo próprio centro;
   - o Nordeste é recortado pelas divisas aproximadas.
2. **Oceano** (`oceano.jpg`): a textura da Terra com a terra e o gelo apagados e preenchidos com cor de mar profundo.
3. **Rotações:**
   - cada continente é uma casca de esfera com `alphaMap` da máscara e gira em torno de um polo de Euler;
   - a América do Sul usa o polo de Bullard 1965 (44°N, 30,6°W, 57°), e a do Norte, 66°N, 12°W, 75,5°;
   - Antártida, Austrália e os supercontinentes futuros usam arcos até um alvo;
   - com essas rotações, São Luís cai na costa de Gana e Natal, na Nigéria;
   - as rotações ficam em `src/videos/pangeia.cfg.json`.
4. **Supercontinentes prontos** (`sc_<nome>.jpg`, com `_calor`, `_borda` e `_terra`), gerados por `pangeia_bake.py` para cinco arranjos:
   - pangeia;
   - ultima (Pangeia Última);
   - novo (Novopangeia);
   - amasia;
   - aurica.

   A Novopangeia, a Amásia e a Aurica são formas ilustrativas.
5. **Rótulos:** acompanham o ponto 3D projetado com a mesma câmera do C3 (fov 40). Os componentes são `R3` e `Rotulo`.

## Lições
- Um globo de raio 1 só cabe inteiro na tela vertical com a câmera a ~5,2 de distância (a largura visível é ~0,2 × distância).
- `capaMat` (racha/lava) tem células enormes vistas de perto. Para chão de deserto e lava, use a textura `rachas.png` repetida num plano.
- Na revisão com `--every-nth-frame`, às vezes sai um quadro preto. Confira com um still antes de mexer.
