# Passagem · Gerador de Vídeos (Produção de Vídeo)

Atualizado em 29/10/2026 pela conversa `session_014uAw8CBbLDWXsKRFv4J98p`, na troca por uma nova.
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver.

## Papel
Único agente que produz os vídeos do canal (Shorts verticais e longos horizontais) no Remotion (`producoes/remotion/`). Os roteiros chegam do Roteirista já aprovados pelo dono. Responda em português. Título no Painel: "Produção de vídeos (shorts e longos)", andar "Produção de Vídeo".

## Links e ids
- **Central:** https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q
  - Coleção `videos`, linhas `lado-NN`; a última entregue é lado-76. Reels entram com `tipo: "short"` e "Reel" no nome/notas.
  - O arquivo vai como asset (< 19,5 MB). Há ~270 MB livres.
- **Painel:** https://claude.ai/artifact/MYN7cXDqxFUwnWPJCYtSWM (avisos: ver `CLAUDE.md`).
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
1. **URGENTE: refazer os Reels POV lado-72 a 75 sem cenas repetidas** (o dono proibiu repetir cena em qualquer vídeo, 30/10; o #3 e o #4 saem no sábado 31/10, o #5 no domingo 01/11 e o #6 na terça 03/11).
   - **Narração já refeita** com `texto_pt` (anos por extenso, "Wow" → "Uau"), conferida no Whisper. `narracao.mp3` em `public/<sinal|semsol|ceuvazio|nascimarte>/` e `src/videos/<...>.palavras.json` já estão atualizados; as âncoras não mudaram.
   - **O que repete hoje** (`checar_repeticao.py` + folha de contato):
     - `Sinal.tsx`: antena.jpg 2× (Captou, NenhumConfirmado), antena_via.jpg 2× (JaAconteceu, Manual), 4 Glitch (NaoConte, Imagina, Gritar, Responder), 3 telas de monitor (NaTela, NaoDevia, NuncaMais), Selo em céu 2× (Regra, OnuUai).
     - `SemSol.tsx`: céu+chão 5× (OlhaPraCima, NuncaExistiu, SemDia, SemNoite, SoEscuro), Glitch 4× (NaoExisteSol, Ficcao, Vida, NinguemSabe), planeta errante 2×, Sistema 2× (NasceuEstrela, Arremessada), disco de gás 3× (Crescendo, Cha, Engolindo).
     - `CeuVazio.tsx`: xdf 4×, cmb 2×, andromeda 2×, Galaxias 5×, CeuFuturo 5×, Glitch 3×.
     - `NasceuMarte.tsx`: gale.jpg 3× (ArLaFora, SemTraje, Radiacao), boneco Pessoa em 4 cenas.
   - **Como fiz no Big Rip:** uma foto real diferente por cena (NASA Images tem muita: Hubble, Webb, ISS, Curiosity/Perseverance para Marte, Goldstone PIA26717/PIA26719/PIA17792/PIA10953 para antenas), e cada tipo de ilustração uma vez só (troque o 2º glitch por foto com título, o 2º gráfico por outro tipo de esquema etc.). Cenas que são o mesmo momento podem virar uma só (no Big Rip "aos seus átomos" + "eles se desfazem" viraram uma cena, com a troca no meio pelo tempo da palavra).
   - **Entrega:** render final, trocar `video_asset`/`video_url` nas linhas `videos/lado-72..75` da Central e do Observatório (as linhas estão na versão 2; use `if_version`), mandar os MP4 ao dono e avisar o LadoSombrio.
2. **Escolhas do dono em aberto:** thumb do lado-58 (A ou B, stills ThumbA e ThumbB em `SemLua`) e troca do título (sugestão: "Você acorda e a Lua SUMIU!").

## Lições da conversa de 28–29/10
- Num container novo, `pipeline/src` (biblioteca de clipes) e os mp4 de `remotion/public` **não vêm**. Use NASA Images, SVS, Rijksmuseum (gravuras) e ilustração própria. Wikimedia deu 429; sites militares, CIA e Smithsonian deram 403.
- `npm ci` em `producoes/remotion` e `pip install edge-tts` no começo da sessão.
- Render travado (CPU parada): mate `remotion render` e `chrome-headless-shell` e renderize de novo. Efeitos pesados (centenas de círculos SVG com drop-shadow) deixam o render lento.
- Longo maior que 19 MiB: cópia 540p (`-vf scale=960:540 -b:v 250k -maxrate 300k -bufsize 600k -b:a 64k`).
- O `longo.tsx` aceita `cor` nos selos.
