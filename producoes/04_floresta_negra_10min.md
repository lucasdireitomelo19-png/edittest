# 04 — A Teoria da Floresta Negra (vídeo longo, 10 min)

**Arquivo final:** `floresta_negra_10min.mp4` · 1920x1080 · 10:00 · só voz
**Fontes visuais:** ESO (timelapses do céu, ALMA, VLT, zoom até Sgr A*), NASA (SVS, JPL, Goddard, foto de S. Hawking), ESA/Hubble, mais animações próprias do canal (floresta, Drake, sinais, bolha de rádio, Wow!)

---

## 1. TÍTULO

**Por que o universo está em silêncio? A assustadora teoria da Floresta Negra**

Alternativas para teste A/B:
- A teoria mais assustadora sobre alienígenas (e por que ninguém responde)
- NÃO FAÇA BARULHO: a teoria da Floresta Negra explicada

**Thumbnail:** `thumb_a.jpg` ("NÃO FAÇA BARULHO", floresta com olhos brilhando e fogueira). Alternativa: `thumb_b.jpg` ("ELES ESTÃO ESCONDIDOS").

## 2. GANCHO (0–30 s)

> "Neste exato momento, existem centenas de bilhões de estrelas só na nossa galáxia… E mesmo assim, silêncio. […] O universo não está vazio. Ele está em silêncio de propósito. Porque quem faz barulho deixa de existir."

## 3. ROTEIRO

O texto completo está em [`videos/v4_floresta/roteiro.txt`](videos/v4_floresta/roteiro.txt) (1.430 palavras, 9:55 de narração).

**Estrutura (capítulos do YouTube):**
```
0:00 Introdução
0:42 Onde está todo mundo?
2:06 As respostas
3:16 A Floresta Negra
4:28 A cadeia de suspeita
5:48 Caçadores silenciosos
6:48 Nós já gritamos
8:17 E se estiver errada?
9:16 O sinal Wow!
```

**Checagem de fatos:**
- Pergunta de Enrico Fermi ("Onde está todo mundo?"), Los Alamos, 1950. ✔
- Via Láctea com 100–400 bilhões de estrelas. O Kepler mostrou que a maioria das estrelas tem planetas e que bilhões podem estar na zona habitável. ✔
- Uma civilização poderia colonizar a galáxia em alguns milhões a dezenas de milhões de anos, mesmo bem abaixo da velocidade da luz (argumento clássico do paradoxo). ✔
- Equação de Drake, Frank Drake, 1961. ✔ Grande Filtro, Robin Hanson, 1996. ✔
- *A Floresta Sombria* (Liu Cixin, 2008), 2º livro da trilogia *O Problema dos Três Corpos*, que virou série da Netflix (2024). Os dois axiomas da "sociologia cósmica", a cadeia de suspeita e a explosão tecnológica estão descritos no livro. ✔
- Energia cinética de 1 t a 10% de c ≈ 4,5×10²⁰ J ≈ 7 milhões de bombas de Hiroshima (15 kt). ✔
- David Brin, "The Great Silence" (1983), e Greg Bear, *The Forge of God* (1987), já exploravam ideias parecidas. ✔
- Bolha de rádio da Terra com cerca de 100 anos-luz, com sinais muito fracos à distância. ✔
- Mensagem de Arecibo: 16/nov/1974, 1.679 bits, rumo ao aglomerado M13 (~25 mil anos-luz). Inclui figura humana, DNA e o sistema solar. ✔
- Discos de Ouro das Voyager (1977), com sons, músicas e um mapa de pulsares para localizar o Sol. ✔
- Stephen Hawking, 2010: comparação com a chegada de Colombo à América. É uma paráfrase e aparece marcada assim na tela. ✔
- Breakthrough Listen (2015) varre o céu em busca de tecnoassinaturas. ✔
- Sinal Wow!: 15/ago/1977, radiotelescópio Big Ear (Ohio), 72 s. Jerry Ehman escreveu "Wow!" ao lado de "6EQUJ5". Nunca se repetiu. ✔

**Honestidade na tela:** a mensagem binária e a folha do "Wow!" são recriações (marcadas como ILUSTRAÇÃO), e o capítulo 7 deixa claro que a Floresta Negra é uma hipótese, não um fato.

## 4. DIVISÃO POR CENAS

São 133 planos (média de 4,5 s), definidos em [`videos/v4_floresta/cenas.py`](videos/v4_floresta/cenas.py) por âncoras no texto da narração. Resumo:

| Capítulo | Visual principal |
|---|---|
| Introdução | Zoom real até o centro da Via Láctea → estrelas se apagando → floresta com olhos, lanterna, fogueira e disparo → cartão-título |
| 1. Onde está todo mundo? | Cartão "Los Alamos, 1950" → citação de Fermi → galáxia procedural → mapa de exoplanetas → galáxia sendo colonizada (contador de milhões de anos) |
| 2. As respostas | Equação de Drake animada termo a termo → Terra real → animação do Grande Filtro → radiotelescópios ALMA |
| 3. A Floresta Negra | Cartões dos 2 axiomas → sequência da floresta (caçadores, lanterna, olhos, disparo, fogueira) |
| 4. Cadeia de suspeita | Sinal viajando 100 anos-luz (contador de anos) → perguntas em cascata → curva da explosão tecnológica (1903 → hoje) |
| 5. Caçadores silenciosos | Planeta errante → erupção estelar → cartão "1 tonelada a 10% da luz" → Brin (1983) e Bear (1987) |
| 6. Nós já gritamos | Bolha de rádio da Terra crescendo → mensagem binária → Disco de Ouro → foto de Hawking → citação → fogueira na floresta |
| 7. E se estiver errada? | "HIPÓTESE, NÃO FATO" → contra-argumentos sobre imagens reais do céu → Breakthrough Listen |
| Fechamento | Recriação da folha do sinal Wow! → Sgr A* (imagem real) → Pálido Ponto Azul com zoom-out → "ALGUÉM JÁ OUVIU?" |

## 5. PROMPTS VISUAIS (para gerar com IA, opcional)

> 16:9, cinematic, photorealistic, 4K, sem texto.

1. `A dark ancient forest at night under a starry sky, silent armed hunters hidden among the trees, faint glowing eyes, moonlight through fog, ominous, cinematic 16:9`
2. `A single campfire burning in a dark forest clearing at night, dozens of glowing eyes watching from the darkness, tension, cinematic`
3. `View of the Milky Way with billions of stars, a few tiny lights blinking out one by one, eerie silence`
4. `Two distant star systems exchanging a radio signal across hundreds of light-years, wave front crossing deep space`
5. `A huge radio telescope dish at night transmitting a beam of binary code toward a globular star cluster`
6. `A relativistic projectile streaking toward a blue planet, about to impact, deep space`
7. `Earth seen from space surrounded by an expanding faint bubble of radio waves 100 light-years wide`
8. `1977 dot-matrix computer printout with the characters 6EQUJ5 circled in red pen and the word Wow! handwritten`
9. `Pale blue dot of Earth in a beam of sunlight seen from the edge of the solar system, lonely, melancholic`

## 6. PROMPT DE VOZ

- **Tom:** narrador de documentário intimista e misterioso. Calmo, mas tenso. Conta como se fosse um segredo.
- **Velocidade:** +5% (pt-BR-AntonioNeural), mais pausado que nos Shorts para caber o raciocínio.
- **Emoção:** fascínio na introdução, curiosidade intelectual nos capítulos 1–2, suspense crescente nos 3–5, desconforto no 6, equilíbrio no 7 e um arrepio no final.
- **Pausas estratégicas:** antes de "silêncio", em "Porque quem faz barulho… deixa de existir.", na pergunta "o que ele faz?", antes de "Wow!" e uma pausa longa antes de "É se alguém já ouviu a gente."

## 7. CHECKLIST DE RETENÇÃO

| Critério | Nota | Por quê |
|---|---|---|
| Força do gancho | 9/10 | Contraste entre bilhões de estrelas e silêncio, com uma promessa assustadora nos primeiros 25 s. |
| Intensidade da curiosidade | 9/10 | Cada capítulo termina abrindo o próximo ("Mas por que atirar?", "E aqui vem a parte que mais incomoda"). |
| Ritmo | 8/10 | Troca de plano a cada 4,5 s, com animações próprias e cartões de capítulo. No formato longo, ainda é preciso testar a retenção no meio do vídeo (capítulos 2 e 4 são mais conceituais). |
| Impacto final | 10/10 | O sinal Wow! seguido de "É se alguém já ouviu a gente" fecha com uma pergunta que fica na cabeça. |
| Potencial viral | 9/10 | Tema em alta (série *3 Body Problem*), thumbnail forte e alto potencial de comentários (debate sobre enviar ou não mensagens). |

---

## Descrição para o YouTube

```
O universo tem centenas de bilhões de estrelas e bilhões de planetas parecidos com a Terra. Então por que ninguém responde?

A teoria da Floresta Negra, popularizada pelo escritor Liu Cixin em "A Floresta Sombria" (da trilogia O Problema dos Três Corpos), propõe uma resposta assustadora: o universo pode estar cheio de civilizações, todas escondidas, porque quem se revela vira alvo.

Neste vídeo: o Paradoxo de Fermi, a equação de Drake, o Grande Filtro, a cadeia de suspeita, as mensagens que a humanidade já enviou ao espaço e o misterioso sinal Wow!

⚠️ A Floresta Negra é uma hipótese, não um fato científico comprovado.

📌 Capítulos
0:00 Introdução
0:42 Onde está todo mundo?
2:06 As respostas
3:16 A Floresta Negra
4:28 A cadeia de suspeita
5:48 Caçadores silenciosos
6:48 Nós já gritamos
8:17 E se estiver errada?
9:16 O sinal Wow!

💬 Você acha que a humanidade deveria enviar mensagens para o espaço? Comenta aí.

🎥 Créditos de imagem: ESO (CC BY 4.0) · NASA/JPL-Caltech · NASA Goddard · NASA SVS · ESA/Hubble, M. Kornmesser (CC BY 4.0) · Foto de Stephen Hawking: NASA/Paul E. Alers. Animações: Lado Sombrio do Universo.

#florestanegra #paradoxodefermi #universo #alienigenas #astronomia
```
