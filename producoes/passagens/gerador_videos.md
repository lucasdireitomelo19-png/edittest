# Passagem · Gerador de Vídeos (Produção de Vídeo)

Atualizado em 04/11/2026 pela conversa `session_014uAw8CKDU21uq9jVARfcGA`, na troca por uma nova.
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver.

## Papel
Único agente que produz os vídeos do canal (Shorts verticais e longos horizontais) no Remotion (`producoes/remotion/`). Os roteiros chegam do Roteirista já aprovados pelo dono. Responda em português. Título no Painel: "Produção de vídeos (shorts e longos)", andar "Produção de Vídeo".

## Links e ids
- **Central:** https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q
  - Coleção `videos`, linhas `lado-NN`; a última entregue é lado-81.
  - **Armazenamento CHEIO (1 GB) desde 31/10.** O lado-79 ficou sem vídeo na Central. Liberar espaço só com OK do dono. Por enquanto, suba o vídeo direto no Observatório. Reels entram com `tipo: "short"` e "Reel" no nome/notas.
  - O arquivo vai como asset (< 19,5 MB). Há ~270 MB livres.
- **Avisos de status:** desde 31/10 vão para o Observatório (coleção `eventos`), não mais para o Painel (ver `CLAUDE.md`).
- **Observatório Lado Sombrio:** https://claude.ai/artifact/G6YahQcE96GqFd1VcSmFDH (painel novo do dono, fixado). **Toda entrega vai também para lá** (o dono cobrou em 29/10):
  - copie o asset da Central sem reenviar: `Artifact publish` com `url` do Observatório, `asset: true`, `from_url` da Central e `asset_ids`;
  - grave a mesma linha em `videos/lado-NN`, trocando `video_asset`/`video_url` (e `thumb_url`) pelos ids novos do Observatório. Os ids de asset de um artefato não valem no outro;
  - o cadastro do agente fica em `agentes/videos` (campo `sessao` e lista `anteriores`). Já está com esta conversa nova.
  - Em 29/10, lado-58 a 71 estão lá.
- **Agentes:**
  - LadoSombrio (direção): `session_014uAw8A8j8RoZaxo26zVPpt`. Avise as entregas para ele.
  - Roteirista: `session_01SHrzyZioTiFba7qKi3g3kj`.
- **Roteiros novos** ficam na branch `claude/practical-cannon-ly7fw1`, em `producoes/roteiros/`. Use `git fetch origin claude/practical-cannon-ly7fw1` e depois `git show origin/claude/practical-cannon-ly7fw1:<arquivo>`.

## Chaves (nunca imprima o valor; cole direto no comando)
- **ElevenLabs** (voz Brian): a chave **não fica no repositório**. O dono mandou uma nova em 04/11, no chat. Começa com `sk_`; o código hex sem `sk_` é só o ID da chave e não funciona.
  - **Regra do dono (04/11): "sempre transfira a chave para as novas conversas".** Na troca de conversa, a chave vai no `prompt` do `create_session`, nunca num arquivo do repositório. Na sessão, guarde-a só no scratchpad.
  - Plano **Creator**: 123.692 caracteres livres em 04/11 (0 usados), com renovação em 04/12/2026. Confira com `GET /v1/user/subscription` antes de narrar.
  - Com ElevenLabs, a voz é a Brian (`narrar_el.py`). Sem ElevenLabs, use a Antonio.
- **Pixabay:** dá erro de chave (o proxy não injeta). A biblioteca `pipeline/src/*.mp4` **não vem** num container novo (é ignorada pelo git), nem os mp4 de `remotion/public/*`.
- **Imagens que funcionam:** NASA Images (`images-api.nasa.gov`, `asset/<id>`), SVS (`pipeline/svs.py`) e gravuras históricas do Rijksmuseum (`data.rijksmuseum.nl/search/collection?imageAvailable=true&title=...`, Linked Art → `iiif.micr.io/<id>/full/1600,/0/default.jpg`, domínio público). O Wikimedia Commons deu 429 a sessão inteira.

## Regras do dono que valem
- **NENHUMA cena se repete em nenhum vídeo** (30/10, bronca no Big Rip): cada foto/clipe real numa cena só, e cada tipo de esquema/ilustração (cartão, gráfico, glitch, página, efeito de estilhaço, céu estrelado com galáxias…) também uma vez só por vídeo. Rode `python3 remotion/checar_repeticao.py src/videos/X.tsx` antes de renderizar (pega mídia e cena repetida; template repetido você confere na folha de contato).
- **VOZ ATUAL (31/10, escolha do dono depois de comparar Remy, Antonio e Thalita): `pt-BR-AntonioNeural`**, porque a Remy soava "estadunidense". Short: `narrar.py <dir> <alvo> -6 --voz pt-BR-AntonioNeural --pausa 0.12`. Longo: `--pausa 0.45`.
- **Pronúncia (31/10, "como se fosse um estadunidense")**: nomes e siglas em inglês vão em grafia fonética só na fala, em `pipeline/texto_pt.py` (FIXAS), e a legenda mantém a grafia original. Antes de narrar, acrescente lá os nomes novos do roteiro. O mesmo vale para palavras que a Remy erra ("explodiu" → "expludiu").
- **Narração 100% em português** (30/10, o "T−0" saiu em inglês): voz Antonio quando não há ElevenLabs. `narrar.py` já usa `pipeline/texto_pt.py` (números por extenso etc.). Frase curta solta pode sair em inglês: junte com a seguinte. Confira com `pipeline/ouvir.py` (Whisper; `pip install faster-whisper`).
- **Short em lista sem narração (formato "2027 vai ser assim")** (31/10): rápido (~2,5 s por item) e com transições explosivas no estilo de edit (zoom de impacto, chicote, glitch RGB, giro, tremida, flash), sem respiro. Molde: `Agenda2027.tsx`.
- Entrega direta na versão final, sem storyboard nem prévia ("Não quero mais prévia, quero só o vídeo na versão final", 28/10).
- O fluxo completo está em DIRETRIZES, "Aprovação e entrega":
  1. narração Brian;
  2. montagem;
  3. revisão interna;
  4. render final;
  5. Central (Pronto, 6 legendas do subagente `legendas`, descrição sem fontes);
  6. MP4 no chat;
  7. doc `producoes/NN_*.md`;
  8. commit e push;
  9. aviso ao LadoSombrio.
- Thumbs apelativas, com texto curto e forte. Títulos de longo curtos e de impacto.
- Não publicar em redes. Apagar qualquer coisa só com o OK do dono.

## Ferramentas (como usei)
- **Narração:**
  - Short: `ELEVENLABS_API_KEY=... python3 pipeline/narrar_el.py <dir> 60 --vel 1.2 --pausa 0.12`.
  - Longo: `--vel 1.1 --pausa 0.45`.
  - Capítulos: `remotion/capitulos.py <dir> 2.2 "<frase>"...`.
  - Texto narrado: as linhas `> ` do roteiro (`grep '^> ' | sed 's/^> //'`).
- **Short:** `src/comum.tsx` (`montar`, `Short`, Titulo, Texto, Etiqueta, Real, Pino, Contador, Glitch, Final...). Os modelos recentes são `src/videos/LuzesOlhos.tsx`, `SolAviao.tsx` e `Asteroide2025TF.tsx`.
- **Longo:** `src/longo.tsx` com `criarLongo(cfg)`. Os modelos são `src/videos/FimSolar.tsx` e `SemLua.tsx`.
- **Render:** `./render.sh <Comp> out/x.mp4` (normaliza em −14 LUFS).
  - Revisão interna: `npx remotion render <Comp> out/r.mp4 --scale=0.25 --muted` + folha de contato.
  - Corte vertical: `scale=-2:1920,crop=1080:1920,fps=30`.
  - Imagens NASA: `https://images-assets.nasa.gov/image/<id>/<id>~large.jpg` (use `curl -L`).
- **Retenção:**
  - gancho visual no 1º segundo;
  - cortes ≤ 2 s nos 10 s iniciais;
  - nada de cena de respiro antes da escalada.

## Estado atual e pendências (em ordem)
0. **Entregues** (Central como Pronto, MP4 no chat, docs, LadoSombrio avisado):
   - 28/10: lado-63 a 65 (lote radiação #2–#4), lado-66 (tsunami v4), lado-67 (longo Área 51, voz edge-tts; thumb nova "A VERDADE SOBRE A ÁREA 51" com ET e TOP SECRET, pedido do dono em 29/10).
   - 29/10: Reels lado-68 Shoemaker (02/11), lado-69 Boltzmann (03/11), lado-70 Nave a caminho de Marte (30/10) e lado-71 Vênus (30/10). Docs 37–40.
   - 29/10 (tarde): Reels POV lado-72 Sinal de outra estrela (31/10), lado-73 Planeta sem sol (31/10), lado-74 Céu vazio (01/11) e lado-75 Nasceu em Marte (03/11), com voz edge-tts **Remy** (`fr-FR-RemyMultilingualNeural`). O dono pediu edge ("Vai de edge") e depois trocou a Antonio pela Remy por erro de pronúncia (vídeo comparando 6 vozes, 29/10). (Em 31/10 o dono trocou de novo, da Remy para a **Antonio**; veja a regra de voz abaixo.) Central + Observatório. Docs 41–44. Composições `Sinal`, `SemSol`, `CeuVazio`, `NasceuMarte`.
   - 30/10: longo POV lado-76 "Você viu o universo se RASGAR!" (Big Rip), voz Remy, 6:17, composição `BigRip` + `ThumbBigRip`, doc 45. Central/Observatório com cópia 540p (o 1080p tem 56 MB). `criarLongo` ganhou a opção `mudo` (trilha zerada num trecho). Data de publicação ainda não definida.
   - 30/10 (noite): **Big Rip v2** (lado-76, versão 2 na Central e no Observatório): narração 100% em português e 96 cenas sem nenhuma repetida. MP4 1080p no chat. Doc 45 atualizado.
   - 31/10: **Short "2027 vai ser assim"** (lado-77, formato novo sem narração nem música; v2 com 13 s em loop e transições de edit), composição `Agenda2027`, doc 46. Central + Observatório. Data de publicação a definir.
   - 31/10: o dono **cancelou a refação dos Reels POV lado-72 a 75** ("Esquece o lado 72-75"). Não mexer neles.
   - 31/10: **multiverso entregue**: lado-78 Short "Cópia exata" (v3 com voz Antonio, 55 s, publicar a partir de 05–06/11; composição `CopiaExata`, doc 47) e lado-79 longo "Você encontrou outra VERSÃO de você!" (7:00, 96 cenas, composição `Multiverso` + `ThumbMultiverso`, doc 48). Os dois estão no Observatório; na Central, o 79 ficou sem vídeo. LadoSombrio e Roteirista avisados.
   - 31/10 (noite): v3 do multiverso com voz Antonio e thumb nova do longo (capacete real da NASA). O dono marcou o lado-79 como **Postado** às 19:32 com a v2 (Remy, thumb antiga). A v3 ficou no Observatório em `v3_video_url`/`v3_thumb_url`. Na Central, o 79 ficou sem vídeo (cheia).
0a. **PRÓXIMO: lote "LINHA DOS CAMPEÕES"** (12 roteiros aprovados pelo dono em 04/11, v1: 10 Shorts e 2 longos). Vai direto para o vídeo final, com revisão interna e voz **Brian** (ElevenLabs; o lote soma ~17,8 mil caracteres e cabe no saldo). Os arquivos estão na branch `claude/practical-cannon-ly7fw1`: `producoes/roteiros/lote_2026-11-04_campeoes_shorts.md`, `longo_buraco_negro_1ano.md` e `longo_supernova_perto.md`. Use o texto narrado sem mudar nada. Lado-82 em diante.
   - **Ordens do dono nesta aprovação:** "Não quero cenas repetidas": cada foto, clipe, esquema ou ilustração entra numa cena só, sem outro crop, zoom ou filtro da mesma imagem. Rode `checar_repeticao.py` antes de cada render. O saldo do ElevenLabs já foi conferido e passado ao Roteirista em 04/11.
   - Ordem de publicação dos Shorts: S7 Júpiter → S6 maior estrela → S9 Tesla → S10 memorial na Lua → S2 buraco negro escondido (publicar perto de 02/12, Gaia DR4) → S1 Betelgeuse → S5 YR4 → S4 magnetar → S3 planeta errante → S8 Sol × Terra.
   - Cuidados:
     - S9: recalcule a distância do Tesla no JPL Horizons (alvo −143205) no dia de publicar.
     - S6: "MAIOR estrela JÁ VISTA", nunca "do universo".
     - S8: "TALVEZ NÃO".
     - S5: "A NASA recalculou".
   - Os Shorts **não são POV**. Os 2 longos **são POV**, com o marcador e a cor caindo até "Mas espera…" e o selo "E SE":
     - Longo A: "FALTAM 365 → DIA 0 → DEPOIS".
     - Longo B: "HORA −3 → ~900 ANOS", com tela dividida "FONTES DIVERGEM" no capítulo do ozônio e o Devoniano como "HIPÓTESE".
   - Legendas pelo subagente `legendas`. Entrega no Observatório (a Central está cheia). Avise o Roteirista e o LadoSombrio.
0b. **EM ESPERA (não produzir até o dono liberar):** longo POV "Você voltou 70 anos DEPOIS!" (gêmeos), `roteiros/longo_gemeos.md` na branch do Roteirista.
1. **Entregues em 31/10 (noite):** os 2 Shorts POV de paradoxo, com a voz Antonio. São o lado-80 "Você viajou 1 ano. A Terra envelheceu 70." (composição `Gemeos`, doc 49) e o lado-81 "Você impediu o próprio nascimento" (composição `Avo`, doc 50). Estão só no Observatório, porque a Central está cheia. Datas de publicação a definir. O longo dos gêmeos continua **EM ESPERA**.
1b. 04/11: **thumb v3 do Big Rip** (lado-76, pedido do dono): universo rasgado e Terra partida, composição `ThumbBigRipRasgo`. Está no Observatório (`thumb_url`; a antiga ficou em `thumb_antiga_url`). Como o vídeo já está postado, a capa precisa ser trocada no YouTube.
2. Versão antiga (20 s) do Short 2027 continua como asset na Central e no Observatório; apagar só com OK do dono (já perguntado em 31/10, sem resposta).

## Lições da conversa de 31/10
- `pkill -f <padrão>` mata o próprio shell quando o padrão aparece no comando. Mate pelo PID.
- O classificador do ambiente bloqueia apagar assets que não são seus (ex.: o 2027 antigo). Apagar um asset seu que foi substituído passa.
- Folha de contato: `ffmpeg -i r.mp4 -vf "fps=1/4.2,scale=240:-1,tile=10x10"`. Pegou bolha vazia, texto em cima da legenda e zoom errado.
- Thumb de longo: o dono quer clickbait forte (foto real, texto gigante amarelo e branco com contorno preto, seta e círculo vermelhos). Bonecos/ilustração simples foram reprovados.

## Lições da conversa de 28–29/10
- Num container novo, `pipeline/src` (biblioteca de clipes) e os mp4 de `remotion/public` **não vêm**. Use NASA Images, SVS, Rijksmuseum (gravuras) e ilustração própria. Wikimedia deu 429; sites militares, CIA e Smithsonian deram 403.
- `npm ci` em `producoes/remotion` e `pip install edge-tts` no começo da sessão.
- Render travado (CPU parada): mate `remotion render` e `chrome-headless-shell` e renderize de novo. Efeitos pesados (centenas de círculos SVG com drop-shadow) deixam o render lento.
- Longo maior que 19 MiB: cópia 540p (`-vf scale=960:540 -b:v 250k -maxrate 300k -bufsize 600k -b:a 64k`).
- O `longo.tsx` aceita `cor` nos selos.
