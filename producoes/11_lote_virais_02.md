# 11 · Lote viral 02 · 10 Shorts dinâmicos (~40–50 s)

Roteiros e checagem de fatos: [`roteiros/lote_virais_02.md`](roteiros/lote_virais_02.md).
Voz: **Brian (ElevenLabs, voz padrão do catálogo, id `nPczCjzI2devNBz1zQrb`)** nos 10, gravada em `voz.txt` de cada pasta.

Edição do lote (novidades no `pipeline/motor.py`):
- **`CORTE_MAX`:** nenhum plano passa de ~2,4 s. Cena longa vira jump cut do mesmo clipe, com enquadramento novo e punch-in.
- **`conta=(de, até, sufixo)`:** número contando na tela.
- **`PROGRESSO`:** barra fininha no topo.
- **`apaga`:** plano escurecendo até o preto.
- **Efeitos discretos:** flash e glitch só nas viradas.
- **Medição:** o motor imprime a % de vídeo em movimento.
- **Som:** drone baixo e hit discreto só nos números (sem whoosh em todo corte, como pedido pelo dono).
- **Final:** "SIGA PARA MAIS".

Animações novas: `pipeline/anim/lote2.html` (tangente, elevador, anel, lua, apophis, gps, planetas, gaia).
Na Central dos Canais, cada Short vai como `lado-3N` (N = número do roteiro; o #10 vai como `lado-40`).

| # | Short | Pasta | Central | Duração | Cortes | Vídeo em movimento |
|---|---|---|---|---|---|---|
| 1 | E se o Sol apagasse agora? | `videos/v22_sol_apagasse` | lado-31 | 43,4 s | 25 (maior 2,4 s) | 100% |
| 2 | O Sol não é do tamanho que você pensa | `videos/v23_tamanho_sol` | lado-32 | 41,6 s | 25 (maior 2,4 s) | 100% |
| 3 | E se existisse um elevador até o espaço? | `videos/v24_elevador` | lado-33 | 50,3 s | 32 (maior 2,4 s) | 100% |
| 4 | A Terra já teve anéis? | `videos/v25_aneis_terra` | lado-34 | 48,6 s | 28 (maior 2,3 s) | 100% |
| 5 | E se a Lua chegasse perto da Terra? | `videos/v26_lua_perto` | lado-35 | 44,6 s | 29 (maior 2,2 s) | 100% |
| 6 | Apophis: sexta-feira 13 | `videos/v27_apophis` | lado-36 | 50,2 s | 29 (maior 2,4 s) | 100% |
| 7 | Viagem no tempo existe | `videos/v28_viagem_tempo` | lado-37 | 47,9 s | 31 (maior 2,3 s) | 100% |
| 8 | O espaço tem cheiro | `videos/v29_cheiro_espaco` | lado-38 | 42,8 s | 26 (maior 2,3 s) | 100% |
| 10 | O buraco negro mais perto da Terra | `videos/v31_buraco_perto` | lado-40 | 42,4 s | 26 (maior 2,4 s) | 100% |

---

## 1 · E se o Sol apagasse agora?
**Visual:**
- **Abertura:** Sol real (NASA SDO) escurecendo até o preto.
- **Os 8 minutos:** pôr do sol com "8 MIN 20 S" e a Terra vista da órbita (NASA/JPL).
- **Mecanismo:** animação da Terra girando 8 min em volta do Sol apagado e saindo pela tangente.
- **Consequências:** Lua sumindo, floresta, gelo e geada se formando, com o contador "15 → −18 °C" e depois "−18 → −70 °C", ambos marcados como **ESTIMATIVA**.
- **Oceano:** baía congelada, crosta de gelo e oceano sob o gelo (ilustração NASA/JPL), vulcão.
- **Final:** **fontes hidrotermais reais** (trecho do vídeo científico da Europa Clipper, NASA/JPL).

**Fatos:** sem ajuste.

**Título:** `E se o Sol APAGASSE agora? ☀️❌`

**Descrição, tags, TikTok, Reels e comentário:** na Central (lado-31).

## 6 · Numa sexta-feira 13, um asteroide vai passar raspando
**Visual:**
- **Abertura:** calendário virando com "SEXTA-FEIRA 13", asteroide (animação Pixabay), estádio visto de drone com "3 CAMPOS DE FUTEBOL" e contador "0 → 340 M".
- **A passagem:** animação própria com o Apophis passando por dentro do anel de satélites geoestacionários, contador "0 → 32.000 KM". Céu noturno real com "A OLHO NU".
- **2004:** gráfica rodando com "2004" e contador "2,7% DE CHANCE". Radiotelescópios com "NÃO VAI BATER" e "SEM RISCO POR +100 ANOS".
- **DART:** lançamento real (NASA), aproximação real de Dimorphos e impacto. As imagens da NASA foram recortadas para tirar o texto em inglês das telas da transmissão.

**Fatos:** sem ajuste.

**Título:** `Numa SEXTA-FEIRA 13, um asteroide vai passar raspando na Terra ☄️`

**Legendas:** na Central (lado-36).

## 7 · Viagem no tempo existe (e já aconteceu)
**Visual:**
- **Relatividade:** máquina do tempo (animação Pixabay), astronauta real dentro da Estação (NASA, versão limpa do passeio 4K), engrenagens de relógio com "EINSTEIN · RELATIVIDADE", rua acelerada e relógio em câmera lenta.
- **A Estação:** Terra real vista da Estação (NASA) com "1 VOLTA A CADA 90 MIN" e contador "0 → 28.000 KM/H".
- **Krikalev:** só nomeado, sobre a Terra vista da órbita, porque não achei imagem dele com licença livre. Ampulheta com contador "803 DIAS NO ESPAÇO" e "+0,02 S NO FUTURO".
- **GPS:** animação própria da constelação ("+38 µs / DIA"), celular e cidade com "10 KM DE ERRO POR DIA".
- **Final:** relógio andando para trás.

**Fatos:** sem ajuste.

**Título:** `Viagem no tempo EXISTE. E já aconteceu ⏳`

**Legendas:** na Central (lado-37).

## 2 · O Sol não é do tamanho que você pensa
**Visual:**
- **O Sol:** erupção de 2014 (NASA SDO, disco inteiro e closes) com os contadores "1.300.000 TERRAS" e "99,8% DA MASSA". Disco do Sol em luz visível (SDO). Asa de avião sobre as nuvens com "+6 MESES SEM PARAR".
- **Betelgeuse:** zoom real em Órion até Betelgeuse (ESO), animação própria de Betelgeuse no lugar do Sol, "LUZ: 15 S" contra "LUZ: ~3 HORAS".
- **Final:** Via Láctea, Terra vista da Estação, supernova (NASA Goddard) e o Sol com "5 BILHÕES DE ANOS".

**Fatos:** sem ajuste. O raio de Betelgeuse é uma estimativa, e a descrição avisa da incerteza.

**Título:** `O Sol NÃO é do tamanho que você pensa 😳`

**Legendas:** na Central (lado-32).

## 3 · E se existisse um elevador até o espaço?
**Visual:**
- **Altura:** Burj Khalifa (Pixabay) com os contadores "828 M" e "121 PRÉDIOS". Lançamento de foguete com "0 → 100 KM".
- **A órbita:** Terra vista da Estação com "97% DA GRAVIDADE". Animação própria do cabo até a órbita geoestacionária (contador "36.000 KM"), com contrapeso e cabine (contador "200 KM/H" e "+7 DIAS DE VIAGEM").
- **O problema:** cabo de aço arrebentando (animação), laboratório, estrutura de nanotubo (animação Pixabay) e "RECORDE: MEIO METRO".
- **Cena descartada:** o mapa do equador, que tinha "PACIFIC OCEAN" escrito.

**Fatos:** sem ajuste.

**Título:** `E se existisse um ELEVADOR até o espaço? 🚀`

**Legendas:** na Central (lado-33).

## 4 · A Terra já teve anéis?
**Visual:**
- **Saturno:** visualização dos anéis (NASA Goddard), com o anel de perfil em "~10 M DE ESPESSURA" e o contador "280.000 KM".
- **O céu com anel:** vídeos reais do céu de São Paulo, do litoral, de um céu de dia e de uma cidade à noite, com o anel desenhado por cima (`sobre=`, PNG de `lote2.html`/arco, com a sombra da Terra cortando o anel à noite). O crédito avisa "anel no céu: ilustração".
- **Animações próprias:** Terra com anel (de lado no equador), Lua se aproximando e se despedaçando, e 21 crateras acendendo perto do equador (contador).
- **Final:** "HIPÓTESE · 2024", contador "466 MILHÕES DE ANOS" e águas-vivas (Pixabay).

**Fatos:** sem ajuste. A hipótese está marcada na fala e na tela.

**Título:** `A Terra já teve ANÉIS? 🪐🌍`

**Legendas:** na Central (lado-34).

## 10 · O buraco negro mais perto da Terra
**Visual:**
- **Gaia BH1:** zoom real no céu até o Gaia BH1 (NOIRLab, CC BY 4.0) com o contador "1.560 ANOS-LUZ" e "OFIÚCO". Ilustração do buraco negro da NOIRLab, recortada no anel.
- **A estrela:** animação própria da estrela dançando em volta de um ponto invisível. A animação oficial foi descartada porque tinha o rótulo "blackhole" em inglês.
- **A viagem:** Parker Solar Probe (NASA Goddard) com "692.000 KM/H", céu estrelado com "2,4 MILHÕES DE ANOS", Via Láctea com "VOYAGER 1 · 27 MILHÕES DE ANOS" e radiotelescópio.

**Fatos:** sem ajuste.

**Título:** `O buraco negro mais PERTO da Terra (e quanto tempo pra chegar) 🕳️`

**Legendas:** na Central (lado-40).

## 5 · E se a Lua chegasse perto da Terra?
**Visual:**
- **A aproximação:** Lua nascendo e Lua cheia (Pixabay) com o contador "384.000 KM", e animação própria da Lua chegando com "METADE DA DISTÂNCIA", contador "10.000 KM" e a Lua se despedaçando num anel.
- **As consequências:** mar agitado com "8× MAIS MARÉ", enchente real de Porto Alegre com "2× POR DIA", casas danificadas e vulcão com tremor de câmera.
- **O afastamento:** laser do VLT disparando (ESO) com o contador "3,8 CM POR ANO" e "ESPELHOS DA APOLLO NA LUA".
- **Final:** eclipse total de 2024 (NASA) com "ADEUS, ECLIPSE TOTAL".

**Fatos:** sem ajuste.

**Título:** `E se a Lua chegasse PERTO da Terra? 🌕`

**Legendas:** na Central (lado-35).

## 8 · O espaço tem cheiro
**Visual:**
- **Os astronautas:** Terra vista da Estação e interior real da Estação (NASA).
- **Os cheiros:** bife na chapa, solda e biscoito no forno (Pixabay), cada um com o nome do cheiro na tela. Átomos (animação) com "HIPÓTESE: OXIGÊNIO".
- **A Lua:** voo sobre o local de pouso da Apollo 17 (NASA, dados do LRO) com "POEIRA LUNAR" e fogos com "PÓLVORA QUEIMADA".
- **O centro da galáxia:** imagem do ALMA (ESO), recortada para tirar a legenda em inglês. Framboesas e copo com "FRAMBOESA + RUM".
- **Final:** frasco de perfume sem marca com "FRAGRÂNCIA DO ESPAÇO".
- **Cenas descartadas:** o vídeo da caminhada espacial da NASA, que tinha textos em inglês em todos os trechos, e o cigarro, trocado pelos fogos para combinar com "pólvora".

**Fatos:** sem ajuste.

**Título:** `O espaço tem CHEIRO. E não é o que você imagina 👃🚀`

**Legendas:** na Central (lado-38).

## Correção no meio do lote
O motor agora congela o último quadro quando um clipe acaba antes da cena e avisa no terminal. Antes, o vídeo inteiro adiantava em relação à fala.
Isso aconteceu no #2 e no #4 (cerca de 0,6–0,8 s no fim). Os dois foram remontados e substituídos na Central. Os outros não mudaram.
