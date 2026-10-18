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
| 6 | Apophis: sexta-feira 13 | `videos/v27_apophis` | lado-36 | 50,2 s | 29 (maior 2,4 s) | 100% |
| 7 | Viagem no tempo existe | `videos/v28_viagem_tempo` | lado-37 | 47,9 s | 31 (maior 2,3 s) | 100% |

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
