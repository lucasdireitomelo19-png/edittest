# 59 · Short "E se todo o gelo derretesse" (lado-103)

É o primeiro do lote de 11/11/2026 (`roteiros/lote_2026-11-11_modelos_gringa.md`, 4 Shorts aprovados pelo dono) e o primeiro vídeo do teste de modelo pedido pelo dono em 11/11.

## Ficha técnica
- **Composição:** `Gelo`, em `src/videos/Gelo.tsx`.
- **Formato:** 1080x1920, ~49 s, 19 cenas em Remotion 3D, nenhuma repetida.
- **Narração:** voz Brian (`--vel 1.2 --pausa 0.12`), 46,4 s. Fica em `public/gelo/`.
- **Saída:** `out/lado103_gelo.mp4`.
- **Thumb:** "MAR +66 M", com a América do Sul alagada e a Amazônia circulada. A cena é o Still `ThumbGelo`, e o texto entra depois com PIL.

## Texto na tela
O roteiro aprovado pede estes quatro, e nenhum selo:
- o título "E SE TODO O GELO DERRETESSE?" nos 2 primeiros segundos, com as letras pingando;
- os nomes de lugares em neon;
- o contador no canto: +66 M no mapa, +58 M na cena da Antártida e +1,0 M no fim;
- a legenda (tamanho 56).

## O mar sobe de verdade (reaproveitável)
- **Dados:** `public/gelo/elev.png` guarda a altitude real da terra (NOAA ETOPO5, domínio público): 0 é oceano, e 1 a 255 são metros. A textura da Terra é a NASA Blue Marble 4096 (`terra4k.jpg`).
- **Bake:** `pipeline/gelo_bake.py`. Suaviza a altitude, porque o ETOPO5 tem blocos retos de 1 grau na Amazônia.
- **Shader:** o `GloboMar` de `Gelo.tsx` pinta de azul tudo que fica abaixo do nível `n` (em metros), com uma borda clara na linha d'água. Também escurece o oceano, para o alagamento se destacar, e derrete o gelo dos polos (`d`).
- **Fábrica de cenas:** `M({ca, cb, n, labs, pts})` leva a câmera de A a B, sobe o mar de n0 a n1 e prende rótulos e pontos de cidade ao mapa.

## O que os dados mostram
- Com +66 m, ficam abaixo do nível: Belém, Fortaleza, Recife, Porto Alegre, Daca, Amsterdã, Copenhague, Veneza, Buenos Aires, Alexandria e o delta do Nilo.
- O vale do Amazonas alaga até Manaus (~40 m).
- São Paulo e Brasília ficam secas.
- A célula do Cairo dá 159 m, porque a média de 9 km pega o planalto. No vídeo a água chega perto, como diz a fala.
- A resolução é de ~9 km por ponto: serve para mapa, não para bairro. Por isso o Rio é um relevo estilizado.
