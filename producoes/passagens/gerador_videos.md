# Passagem · Gerador de Vídeos (Produção de Vídeo)

Atualizado em 31/10/2026 pela conversa `session_014uAw8ECXTG9UxiW9JLs54A`, na troca por uma nova.
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver.

## Papel
Único agente que produz os vídeos do canal (Shorts verticais e longos horizontais) no Remotion (`producoes/remotion/`). Os roteiros chegam do Roteirista já aprovados pelo dono. Responda em português. Título no Painel: "Produção de vídeos (shorts e longos)", andar "Produção de Vídeo".

## Links e ids
- **Central:** https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q
  - Coleção `videos`, linhas `lado-NN`; a última entregue é lado-77. Reels entram com `tipo: "short"` e "Reel" no nome/notas.
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
- **ElevenLabs** (voz Brian): a chave não fica no repositório. O dono passou uma nova em 28/10 (começa com `sk_`; o código hex que não começa com `sk_` é só o ID da chave e não funciona). Se a conversa for nova, peça de novo.
  - Plano starter, 30.102 caracteres por ciclo. Restam **~1,4 mil** (29/10, depois dos Reels de Marte e Vênus); a cota renova em 18/11/2026. Confira com `GET /v1/user/subscription` antes de narrar.
  - A chave fica só na sessão (scratchpad). Numa conversa nova, peça ao dono de novo.
  - **Não dá para o longo da Área 51** (~6 mil caracteres). Avise o dono antes de narrar.
- **Pixabay:** dá erro de chave (o proxy não injeta). A biblioteca `pipeline/src/*.mp4` **não vem** num container novo (é ignorada pelo git), nem os mp4 de `remotion/public/*`.
- **Imagens que funcionam:** NASA Images (`images-api.nasa.gov`, `asset/<id>`), SVS (`pipeline/svs.py`) e gravuras históricas do Rijksmuseum (`data.rijksmuseum.nl/search/collection?imageAvailable=true&title=...`, Linked Art → `iiif.micr.io/<id>/full/1600,/0/default.jpg`, domínio público). O Wikimedia Commons deu 429 a sessão inteira.

## Regras do dono que valem
- **NENHUMA cena se repete em nenhum vídeo** (30/10, bronca no Big Rip): cada foto/clipe real numa cena só, e cada tipo de esquema/ilustração (cartão, gráfico, glitch, página, efeito de estilhaço, céu estrelado com galáxias…) também uma vez só por vídeo. Rode `python3 remotion/checar_repeticao.py src/videos/X.tsx` antes de renderizar (pega mídia e cena repetida; template repetido você confere na folha de contato).
- **Narração 100% em português** (30/10, o "T−0" saiu em inglês): voz Remy (`fr-FR-RemyMultilingualNeural`) quando não há ElevenLabs. `narrar.py` já usa `pipeline/texto_pt.py` (números por extenso etc.). Frase curta solta pode sair em inglês: junte com a seguinte. Confira com `pipeline/ouvir.py` (Whisper; `pip install faster-whisper`).
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
   - 29/10 (tarde): Reels POV lado-72 Sinal de outra estrela (31/10), lado-73 Planeta sem sol (31/10), lado-74 Céu vazio (01/11) e lado-75 Nasceu em Marte (03/11), com voz edge-tts **Remy** (`fr-FR-RemyMultilingualNeural`). O dono pediu edge ("Vai de edge") e depois trocou a Antonio pela Remy por erro de pronúncia (vídeo comparando 6 vozes, 29/10). **Quando não houver ElevenLabs, use a Remy:** `narrar.py <dir> <alvo> 8 --voz fr-FR-RemyMultilingualNeural --pausa 0.12`. Central + Observatório. Docs 41–44. Composições `Sinal`, `SemSol`, `CeuVazio`, `NasceuMarte`.
   - 30/10: longo POV lado-76 "Você viu o universo se RASGAR!" (Big Rip), voz Remy, 6:17, composição `BigRip` + `ThumbBigRip`, doc 45. Central/Observatório com cópia 540p (o 1080p tem 56 MB). `criarLongo` ganhou a opção `mudo` (trilha zerada num trecho). Data de publicação ainda não definida.
   - 30/10 (noite): **Big Rip v2** (lado-76, versão 2 na Central e no Observatório): narração 100% em português e 96 cenas sem nenhuma repetida. MP4 1080p no chat. Doc 45 atualizado.
   - 31/10: **Short "2027 vai ser assim"** (lado-77, formato novo sem narração nem música; v2 com 13 s em loop e transições de edit), composição `Agenda2027`, doc 46. Central + Observatório. Data de publicação a definir.
   - 31/10: o dono **cancelou a refação dos Reels POV lado-72 a 75** ("Esquece o lado 72-75"). Não mexer neles.
1. **PRÓXIMO: roteiros de MULTIVERSO** (Roteirista, aprovados pelo dono em 31/10; o dono já aprovou a ordem: primeiro o Short, depois o longo). Texto completo, plano visual frase a frase, fatos e rótulos em `producoes/roteiros/multiverso.md` da branch `claude/practical-cannon-ly7fw1`. Use o texto narrado **sem mudar nada**. Direto para a versão final, com revisão interna.
   - **#1 Short "Em algum lugar existe uma CÓPIA EXATA de você 🪞🌌"**: ~52 s, vertical, **não é POV**. Selo fixo "MODELO". Na tela: "SE O ESPAÇO FOR INFINITO", "~10^(10^29) M (ESTIMATIVA)", "UNIVERSO VISÍVEL: < 10^27 M" (na narração, por extenso). Publicar **a partir de 05–06/11** (o Reel do Boltzmann de 03/11 também fala de "cópias de você"). Legenda do post: "Alguém igual a você a 10^(10^29) metros? A conta é de Tegmark (MIT, 2003) e só vale se o espaço for infinito."
   - **#2 Longo "Você encontrou outra VERSÃO de você!"** (B: "E se o multiverso for real? Do outro lado do universo, ele está esperando"): ~6,5 min, 1920x1080, POV como espinha + os 4 níveis de Tegmark como capítulos. Selo no canto "NÍVEL I…IV" + rótulo do capítulo (MODELO / FATO / INTERPRETAÇÃO / HIPÓTESE CONTESTADA / HIPÓTESE). Contador "DISTÂNCIA DA SUA CÓPIA": "10^(10^29) M" → "OUTRA BOLHA" → "AQUI, EM OUTRO RAMO" → "NEM EXISTE ESPAÇO". A cor some a cada nível e volta em "Mas espera…". Thumb: porta aberta com a mesma pessoa dos dois lados e bolhas de universos lá dentro, texto "4 MULTIVERSOS", selo "HIPÓTESE".
   - **Regra de ouro:** nenhum outro universo foi observado; nunca mostrar "provado".
   - **Imagens reais** (confirme a licença): WMAP (NASA) e Planck (ESA) com a Mancha Fria (diferentes, não repetir); Hubble Ultra Deep Field (`public/bigrip/udf.jpg` já existe, mas é outro vídeo, pode usar); chip Willow (Google, atribuir); retratos de Everett e Tegmark só com licença, senão só o nome. Bolhas e ramificações = ANIMAÇÃO.
   - Voz: Remy (edge-tts), a menos que o dono mande chave nova da ElevenLabs (confira a cota; o longo não cabe nos ~1,4 mil restantes). Legendas pelo subagente `legendas`. Avise o Roteirista (`session_01SHrzyZioTiFba7qKi3g3kj`) e o LadoSombrio na entrega.
2. Versão antiga (20 s) do Short 2027 continua como asset na Central e no Observatório; apagar só com OK do dono (já perguntado em 31/10, sem resposta).

## Lições da conversa de 28–29/10
- Num container novo, `pipeline/src` (biblioteca de clipes) e os mp4 de `remotion/public` **não vêm**. Use NASA Images, SVS, Rijksmuseum (gravuras) e ilustração própria. Wikimedia deu 429; sites militares, CIA e Smithsonian deram 403.
- `npm ci` em `producoes/remotion` e `pip install edge-tts` no começo da sessão.
- Render travado (CPU parada): mate `remotion render` e `chrome-headless-shell` e renderize de novo. Efeitos pesados (centenas de círculos SVG com drop-shadow) deixam o render lento.
- Longo maior que 19 MiB: cópia 540p (`-vf scale=960:540 -b:v 250k -maxrate 300k -bufsize 600k -b:a 64k`).
- O `longo.tsx` aceita `cor` nos selos.
