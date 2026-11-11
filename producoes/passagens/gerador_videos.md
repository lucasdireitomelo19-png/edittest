# Passagem · Gerador de Vídeos (Produção de Vídeo)

Atualizado em 04/11/2026 (fim da tarde) pela conversa `session_014uAw8CcRpbapyaEFWGsSPQ`, com o lote Linha dos campeões **fechado** (10 Shorts e 2 longos).
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver.

## Papel
Único agente que produz os vídeos do canal (Shorts verticais e longos horizontais) no Remotion (`producoes/remotion/`). Os roteiros chegam do Roteirista já aprovados pelo dono. Responda em português. Título no Painel: "Produção de vídeos (shorts e longos)", andar "Produção de Vídeo".

## Links e ids
- **Central:** https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q
  - Coleção `videos`, linhas `lado-NN`; a última entregue é lado-103 (Short do gelo, 11/11, doc 59; lado-102 é o longo da Pangeia, 08/11; lado-101 é o Short da Pangeia e lado-100 BnSala, o primeiro no formato novo) (só no Observatório; lado-94 e 95 são os testes 3D).
  - **Armazenamento CHEIO (1 GB) desde 31/10.** O lado-79 ficou sem vídeo na Central. Liberar espaço só com OK do dono. Por enquanto, suba o vídeo direto no Observatório. Reels entram com `tipo: "short"` e "Reel" no nome/notas.
  - O arquivo vai como asset (< 19,5 MB). Há ~270 MB livres.
- **Avisos de status:** desde 31/10 vão para o Observatório (coleção `eventos`), não mais para o Painel (ver `CLAUDE.md`).
- **Observatório Lado Sombrio:** https://claude.ai/artifact/G6YahQcE96GqFd1VcSmFDH (painel novo do dono, fixado). **Toda entrega vai também para lá** (o dono cobrou em 29/10):
  - copie o asset da Central sem reenviar: `Artifact publish` com `url` do Observatório, `asset: true`, `from_url` da Central e `asset_ids`;
  - grave a mesma linha em `videos/lado-NN`, trocando `video_asset`/`video_url` (e `thumb_url`) pelos ids novos do Observatório. Os ids de asset de um artefato não valem no outro;
  - o cadastro do agente fica em `agentes/videos` (campo `sessao` e lista `anteriores`). Já está com esta conversa nova.
  - Em 29/10, lado-58 a 71 estão lá.
- **Agentes:**
  - LadoSombrio (direção): `session_014uAw8EF31b5hpNor63t4ot` (trocou em 07/11). Avise as entregas para ele.
  - Roteirista: `session_01SHrzyZioTiFba7qKi3g3kj`.
- **Roteiros novos** ficam na branch `claude/practical-cannon-ly7fw1`, em `producoes/roteiros/`. Use `git fetch origin claude/practical-cannon-ly7fw1` e depois `git show origin/claude/practical-cannon-ly7fw1:<arquivo>`.

## Chaves (nunca imprima o valor; cole direto no comando)
- **ElevenLabs** (voz Brian): a chave **não fica no repositório**. O dono mandou uma nova em 04/11, no chat. Começa com `sk_`; o código hex sem `sk_` é só o ID da chave e não funciona.
  - **Regra do dono (04/11): "sempre transfira a chave para as novas conversas".** Na troca de conversa, a chave vai no `prompt` do `create_session`, nunca num arquivo do repositório. Na sessão, guarde-a só no scratchpad.
  - Plano **Creator**: 123.692 caracteres por ciclo, com renovação em 04/12/2026. Em 04/11, depois dos 10 Shorts e dos 2 longos, restam **~115 mil** (8.024 usados). Confira com `GET /v1/user/subscription` antes de narrar.
  - Com ElevenLabs, a voz é a Brian (`narrar_el.py`). Sem ElevenLabs, use a Antonio.
- **Pixabay:** dá erro de chave (o proxy não injeta). A biblioteca `pipeline/src/*.mp4` **não vem** num container novo (é ignorada pelo git), nem os mp4 de `remotion/public/*`.
- **Imagens que funcionam:** NASA Images (`images-api.nasa.gov`, `asset/<id>`), SVS (`pipeline/svs.py`) e gravuras históricas do Rijksmuseum (`data.rijksmuseum.nl/search/collection?imageAvailable=true&title=...`, Linked Art → `iiif.micr.io/<id>/full/1600,/0/default.jpg`, domínio público). O Wikimedia Commons deu 429 a sessão inteira.

## Regras do dono que valem
- **SEM TEXTO SOLTO NA TELA + LEGENDA MENOR (07/11/2026).** Nenhum título nem frase no meio do vídeo (o `C3` sem `t`, `sub` e `etq`; nada de `Grande`). Só a legenda, em tamanho 56 (`criarShort(..., extra, {legenda: 56})`). Números e comparações viram visual 3D. **Nenhum aviso na tela, nem selo no canto** (feedback do dono de 07/11, via Roteirista): sem CÁLCULO, ESTIMATIVA, HIPÓTESE nem E SE. Vídeos mais apelativos e clickbait. O primeiro vídeo nesse formato é um TESTE para o dono avaliar.
- **lado-97, 98 e 99 estão APROVADOS (07/11): não editar de novo.**
- **TODO VÍDEO EM REMOTION 3D (06/11/2026: "todos os videos devem ser feitos em remotion 3d").** Shorts e longos, todas as cenas em 3D (Three.js via `@remotion/three`), sem foto real nem Pixabay: troque por cenas 3D equivalentes. Molde: `LuaBate.tsx`. Está também nas DIRETRIZES (seção Vídeo). Render com `--gl=swangle` (~30 s de render por segundo de vídeo em 1080x1920).
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
- **Short NÃO tem thumb (dono, 11/11): só vídeo longo.** Na entrega de Short, vá sem `thumb_url` e sem enviar thumb no chat.
- Thumbs de longo apelativas, com texto curto e forte. Títulos de longo curtos e de impacto.
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
0a. **EM ANDAMENTO: lote "LINHA DOS CAMPEÕES"** (12 roteiros aprovados pelo dono em 04/11, v1: 10 Shorts e 2 longos). Vai direto para o vídeo final, com revisão interna e voz **Brian**. Roteiros na branch `claude/practical-cannon-ly7fw1`: `producoes/roteiros/lote_2026-11-04_campeoes_shorts.md`, `longo_buraco_negro_1ano.md` e `longo_supernova_perto.md`. Use o texto narrado sem mudar nada.
   - **Entregues em 04/11 (Observatório como Pronto, com 6 legendas, thumb e MP4 no chat; doc 51; commit 6c2fed4):** lado-82 S7 Júpiter (`Jupiter`), lado-83 S6 maior estrela (`MaiorEstrela`), lado-84 S9 Tesla (`Tesla`, distância recalculada em 04/11 = 113 milhões de km), lado-85 S10 memorial (`Memorial`) e lado-86 S2 buraco negro perto (`BnPerto`, publicar perto de 02/12). **Falta:** avisar o LadoSombrio e o Roteirista dessas 5 entregas, junto com as próximas.
   - **Entregues em 04/11 (tarde, conversa session_014uAw8CcRpbapyaEFWGsSPQ):** lado-87 S1 Betelgeuse (`Betelgeuse`), lado-88 S5 YR4 (`Yr4`), lado-89 S4 magnetar (`Magnetar`), lado-90 S3 planeta errante (`Errante`) e lado-91 S8 Sol × Terra (`SolTerra`). Observatório como Pronto, com 6 legendas e thumb, MP4 no chat, doc 52. LadoSombrio e Roteirista avisados dos lados 82 a 91.
   - **04/11 (noite): thumbs v2 com clickbait** para lado-87 a 93 (pedido do dono: "As thumbs não estão chamativas, quero com clickbait"). Ficam em `src/lote/thumbs2.tsx` (Stills `Thumb<Nome>2`). No Observatório, `thumb_url` é a nova e `thumb_antiga_url` a anterior. Lado-82 a 86 ficam com a thumb antiga (o dono mandou esquecer, 06/11).
   - **Entregues em 04/11 (fim da tarde): os 2 longos POV**, lado-92 "Um BURACO NEGRO está vindo e você tem 1 ANO!" (`BnAno`, 5:52, 72 cenas) e lado-93 "Uma ESTRELA EXPLODIU do lado da Terra!" (`SnPerto`, 5:36, 67 cenas). Doc 53. Observatório com a cópia 540p (o 1080p tem 51 e 43 MB e foi para o chat). **O lote está fechado**; não há mais nada na fila do Roteirista.
   - Para conferir os tempos das âncoras antes do render, usei um script no scratchpad (normaliza as palavras e acha cada âncora em `palavras.json`). Cena com menos de ~1,3 s: junte com a vizinha.
   - **Narrações Brian JÁ FEITAS para os 10 Shorts** (não gaste créditos de novo): `remotion/public/<slug>/narracao.mp3` + `palavras.json`, copiadas também para `src/videos/<slug>.palavras.json`. Os slugs que faltam montar são S1 `betelgeuse`, S5 `yr4`, S4 `magnetar`, S3 `errante` e S8 `solterra`. Saldo ElevenLabs depois disso: ~115 mil caracteres (confira antes de narrar os longos). Os longos ainda não foram narrados (`--vel 1.1 --pausa 0.45`; rode um de cada vez, porque em paralelo dá 429).
   - **Kit novo:** `remotion/src/lote/kit.tsx`. Cada vídeo é um `PLANO: K.Plano = [['frase-âncora', K.Tipo, {props}], ...]` mais `K.criarShort(W, PLANO, '<slug>/narracao.mp3', '<frase do flash>')` e `export const Thumb` (com `K.Capa`). Modelo mais completo: `src/videos/BnPerto.tsx` e `Memorial.tsx` (cenas próprias no arquivo quando o kit não tem). Para registrar no Root, use o padrão `{Video as X, Thumb as ThumbX, DURACAO as DUR_X}`. O `checar_repeticao.py` barra tipo repetido (Foto/Clipe contam pelo arquivo). Para a revisão, use um render 1/4 mudo + folha `fps=1/1.6,scale=180:-1,tile=10x3`. Pegou texto estourando, cena curta demais (âncora colada na seguinte) e rótulo cortado.
   - Para os longos, o kit é vertical (1080x1920). Use `criarLongo` (`src/longo.tsx`) como nos longos anteriores.
   - **Imagens que funcionaram nesta conversa:** NASA Images (`pipeline/baixar_img.py <id> <saída>`), ESO (`cdn.eso.org/images/large/<id>.jpg`, CC BY 4.0, crédito obrigatório; vídeos com `pipeline/eso.py`), NOIRLab (`noirlab.edu/public/media/archives/images/large/<id>.jpg`) e fotos Apollo em baixa no LPI (`lpi.usra.edu/resources/apollo/images/browse/AS16/117/18841.jpg`). IDs NASA já conferidos (baixe de novo, não estão no repositório): S1 PIA16680 (Betelgeuse, Herschel), sts054-97-018 (Órion, escura), stsci-h-p1708c-m-2000x2000 (SN 1987A). Para S5: GSFC_20171208_Archive_e000355 (espelhos do Webb). Para S3: PIA03239 (Via Láctea, Spitzer). Para S8: PIA26681 (Sol SDO, já usado no S6, então em outro vídeo pode) e Blue Marble.
   - **Ordens do dono nesta aprovação:** "Não quero cenas repetidas": cada foto, clipe, esquema ou ilustração entra numa cena só, sem outro crop, zoom ou filtro da mesma imagem.
   - Ordem de publicação dos Shorts: S7 → S6 → S9 → S10 → S2 (já entregues) → **S1 Betelgeuse → S5 YR4 → S4 magnetar → S3 planeta errante → S8 Sol × Terra** (próximos, lado-87 a 91) → longos A (buraco negro, 1 ano) e B (supernova perto), lado-92 e 93.
   - Cuidados:
     - S6: "MAIOR estrela JÁ VISTA", nunca "do universo".
     - S8: "TALVEZ NÃO".
     - S5: "A NASA recalculou".
   - Os Shorts **não são POV**. Os 2 longos **são POV**, com o marcador e a cor caindo até "Mas espera…" e o selo "E SE":
     - Longo A: "FALTAM 365 → DIA 0 → DEPOIS".
     - Longo B: "HORA −3 → ~900 ANOS", com tela dividida "FONTES DIVERGEM" no capítulo do ozônio e o Devoniano como "HIPÓTESE".
   - Legendas pelo subagente `legendas` (ele grava JSON no scratchpad; as linhas no Observatório seguem o formato de lado-82). Entrega no Observatório (a Central está cheia). Avise o Roteirista e o LadoSombrio.
0b. **EM ESPERA (não produzir até o dono liberar):** longo POV "Você voltou 70 anos DEPOIS!" (gêmeos), `roteiros/longo_gemeos.md` na branch do Roteirista.
1. **Entregues em 31/10 (noite):** os 2 Shorts POV de paradoxo, com a voz Antonio. São o lado-80 "Você viajou 1 ano. A Terra envelheceu 70." (composição `Gemeos`, doc 49) e o lado-81 "Você impediu o próprio nascimento" (composição `Avo`, doc 50). Estão só no Observatório, porque a Central está cheia. Datas de publicação a definir. O longo dos gêmeos continua **EM ESPERA**.
1b. 04/11: **thumb v3 do Big Rip** (lado-76, pedido do dono): universo rasgado e Terra partida, composição `ThumbBigRipRasgo`. Está no Observatório (`thumb_url`; a antiga ficou em `thumb_antiga_url`). Como o vídeo já está postado, a capa precisa ser trocada no YouTube.
2. Versão antiga (20 s) do Short 2027 continua como asset na Central e no Observatório; apagar só com OK do dono (já perguntado em 31/10, sem resposta).

## Entregues em 06/11 (noite)
- lado-97 PI = 3 (`PiTres`), lado-98 TODOS OS VULCÕES (`Vulcoes`) e lado-99 ATAQUE ALIENÍGENA (`Alien`), todos em Remotion 3D com o kit `src/lote/kit3d.tsx`. Doc 55. Roteirista e LadoSombrio avisados. Datas de publicação a definir.
- **Thumbs de vídeo 3D:** renderize um quadro do vídeo (`npx remotion still <Comp> --frame=N --gl=swangle`) e escreva o texto com PIL (Montserrat ExtraBold, degradê escuro embaixo para cobrir a legenda). O `Freeze` não funciona dentro do `ThreeCanvas`.
- O longo dos gêmeos continua parado até o dono liberar.

## Decisões do dono em 06/11
- "Esquece" para três perguntas: escolher entre os testes 3D lado-94 (Remotion) e 95 (Blender), refazer as thumbs de 82 a 86 e ajustar o Blender para GPU. **Não pergunte de novo.** Os testes ficam no Observatório como "Teste".

## Entregue em 06/11
- **lado-96 · Short "E se a LUA BATESSE na Terra?"**, todo em Remotion 3D (pedido do dono), composição `LuaBate`, doc 54. Roteirista e LadoSombrio avisados. Molde para próximos vídeos 3D: o componente `C3` de `LuaBate.tsx` (carrega as texturas, monta o canvas e põe o texto por cima) mais as peças `Terra`, `Lua`, `Pedras`, `Nuvem` e `capaMat` (disco, racha e lava). Não use hooks dentro da função de cena do `C3` (React #310).

## 3D no Remotion (teste de 05/11)
- Pedido do dono via LadoSombrio: Terra atingida e rachando, no estilo de anúncio de jogo de destruir planetas. Entregue como **lado-94, status "Teste"** (composição `Teste3D`, `src/videos/Teste3D.tsx`).
- Pacotes: `@remotion/three@4.0.538`, `three@0.178.0`, `@react-three/fiber@9.1.2`, `@react-three/postprocessing@3.0.4`, `postprocessing@6.37.6` (já no package.json).
- **Renderize com `--gl=swangle`.** `angle` dá "Error creating WebGL context" neste container. Os 8 s levam ~4 min com `--concurrency=4`. O `render.sh` não passa `--gl`: rode `npx remotion render` direto e normalize o áudio à parte.
- Carregue as texturas FORA do `ThreeCanvas` (com `delayRender`) e só monte o canvas quando estiverem prontas, senão o quadro sai preto.
- Texturas da Terra em `public/teste3d/` (mapas Blue Marble dos exemplos do Three.js, via jsDelivr). O `eoimages.gsfc.nasa.gov` cai no proxy.
- **Versão Blender (lado-95, "Teste"):** `producoes/blender/terra_impacto.py`, Blender 4.2.3 LTS baixado em `/opt/blender` (não vem no container: `curl -L https://download.blender.org/release/Blender4.2/blender-4.2.3-linux-x64.tar.xz`). Uso: `blender -b -P terra_impacto.py -- <texturas> <saída> <pct> <amostras> <ini> <fim>`. Em 50% e 16 amostras, ~16 s por quadro (~1 h para os 240). Monte com ffmpeg (lanczos para 1080x1920 + sfx). Fratura própria: cortes de Voronoi com bisect radial na casca, sem addon. Numa GPU seriam minutos.
- DepthOfField do postprocessing borrou a Terra inteira, então ficou de fora. Bloom e Vignette funcionam.

## Lições da conversa de 04/11 (tarde e fim da tarde)
- **Render final: nunca apague o mp4 de saída antes de o `render.sh` terminar.** Ele renderiza num temporário e só no fim normaliza o áudio para a saída; apagar a saída no meio perde o trabalho todo (perdi um render inteiro do longo A assim). Confira com `ffprobe` antes de dar o arquivo por pronto.
- Longo com ~70 cenas em 1920x1080 leva uns 25 min de render final neste container. Renderize em segundo plano e vá fazendo outra coisa.
- Para os longos, montei as cenas quase todas como desenho próprio em SVG, com 13 a 18 fotos reais por vídeo. Dá para ter 70 cenas sem repetir nenhuma.
- `tsc` reclama de `Math.exp(-(x) ** 2)`: escreva `Math.exp(-((x) ** 2))`.
- `useSpring` deste projeto exige `mass` junto de `damping`.
- **A troca de conversa automática parou de funcionar (04/11):** `create_session` recusou, porque a cadeia chegou ao limite de 8 conversas encadeadas, e nenhuma configuração muda isso. Antes disso, o classificador também tinha barrado a chave do ElevenLabs no `prompt` do `create_session` (vazamento de credencial). Daqui em diante, **o dono abre a conversa nova** e cola a chave lá.
- Fotos novas que funcionaram: ESO `potw1513a` (Órion sobre o ALMA), `potw2009a` (Órion sobre o Paranal), `eso0927c` (Órion com Betelgeuse, crédito "ESO, P. Kervella, Digitized Sky Survey 2 and A. Fujii"), `eso2003a` (Betelgeuse pelo SPHERE) e `eso1121b` (mapa). NASA: `KSC-20170809-PH_KLS02_0009` (Lua), `PIA25790` (Webb, ilustração), `PIA26274` (magnetar) e `PIA21085` (pulsar).
- A foto `sts054-97-018` (Órion do ônibus espacial) não presta: é escura, e clarear deixa ela granulada e vermelha.
- Imagens grandes (> 2.400 px): reduza com PIL antes do render.
- Folha de contato com `fps=1/1.6` pega o meio das cenas, e contador e linha do tempo podem aparecer ainda no começo da animação. Isso não é defeito.

## Lições da conversa de 04/11 (madrugada)
- `archive_session` da conversa anterior foi **negado** pelo classificador do ambiente. Peça ao dono para arquivar, ou para liberar a permissão.
- ElevenLabs em paralelo dá 429: narre um de cada vez.

## Lições da conversa de 31/10
- `pkill -f <padrão>` mata o próprio shell quando o padrão aparece no comando. Mate pelo PID.
- O classificador do ambiente bloqueia apagar assets que não são seus (ex.: o 2027 antigo). Apagar um asset seu que foi substituído passa.
- Folha de contato: `ffmpeg -i r.mp4 -vf "fps=1/4.2,scale=240:-1,tile=10x10"`. Pegou bolha vazia, texto em cima da legenda e zoom errado.
- **Toda thumb (Short ou longo) segue a fórmula clickbait** (04/11, reforçado): foto real de fundo, 2 ou 3 linhas de texto gigante (branco + amarelo, contorno preto grosso), seta e círculo vermelhos no ponto de interesse e uma faixa amarela com a frase-gancho. Use as peças de `src/lote/thumbs2.tsx`.
- Thumb de longo: o dono quer clickbait forte (foto real, texto gigante amarelo e branco com contorno preto, seta e círculo vermelhos). Bonecos/ilustração simples foram reprovados.

## Lições da conversa de 28–29/10
- Num container novo, `pipeline/src` (biblioteca de clipes) e os mp4 de `remotion/public` **não vêm**. Use NASA Images, SVS, Rijksmuseum (gravuras) e ilustração própria. Wikimedia deu 429; sites militares, CIA e Smithsonian deram 403.
- `npm ci` em `producoes/remotion` e `pip install edge-tts` no começo da sessão.
- Render travado (CPU parada): mate `remotion render` e `chrome-headless-shell` e renderize de novo. Efeitos pesados (centenas de círculos SVG com drop-shadow) deixam o render lento.
- Longo maior que 19 MiB: cópia 540p (`-vf scale=960:540 -b:v 250k -maxrate 300k -bufsize 600k -b:a 64k`).
- O `longo.tsx` aceita `cor` nos selos.

## HyperFrames (instalado em 07/11 a pedido do dono)
- HyperFrames 0.9.19 (HeyGen, vídeo em HTML) em `producoes/hyperframes/`. Num container novo, rode `npm i` nessa pasta.
- Criar projeto: `npx hyperframes init <nome> --non-interactive --skip-skills --resolution=portrait`.
- Renderizar: `npx hyperframes render -o x.mp4 --no-browser-gpu`. Funcionou no teste com o Chromium do container.
- Ainda não foi usado em vídeo do canal: a regra continua Remotion 3D até o dono dizer outra coisa.
- **Openverse (sons):** `pipeline/openverse_audio.py` (07/11). A busca funciona. Do container, o download falha: o CDN do Freesound responde 403 e o Wikimedia, 429. Baixe no computador do dono ou tente de novo depois. A versão de imagens continua em `pipeline/openverse.py`.
- **Earshot** (Leon Lin, github.com/Leonxlnx/earshot): instalado e testado em 07/11 com aprovação do dono. Num container novo, rode `uv tool install "earshot[mcp] @ git+https://github.com/Leonxlnx/earshot"` e depois `earshot doctor --fetch` (baixa ~1,1 GB de modelos). Comandos úteis: `earshot sfx list` lista o banco de 252 efeitos (sem crédito); `earshot sfx render <id> -o x.wav` gera um efeito; `earshot timeline <video.mp4>` "ouve" o vídeo e mostra os cortes sem som; `earshot sheet` gera um PNG da trilha. O pacote "earshot" do PyPI é OUTRO (detecção de voz); não use.

## Próximo: "E se a Pangeia voltasse" (07/11, via Pesquisas)
- Primeiro vem um Short, depois um longo. Espere o roteiro do Short chegar do Roteirista.
- Fatos estão em `fatos.md`, nas seções "E se a Pangeia voltasse" e "Viver na Pangeia".
- Guia visual da Pesquisas (`session_01LAsqdhNS2ebk9jvKN6smN2`), no estilo do Short "What If Pangea Came Back?" do Geo All Day: mapa de satélite (Blue Marble), região citada em vermelho sólido, câmera sempre em movimento e emoji grande nas perguntas. Não use nada do vídeo deles.
- **Decisão do dono (07/11):** nos vídeos da Pangeia, os NOMES dos países e regiões podem aparecer na tela (branco, neon azul-ciano). A etiqueta "simulação"/"modelo" continua proibida (regra de sem selos). Fora os nomes, continua só a legenda.
- **Short da Pangeia entregue (lado-101, 08/11).** O próximo é o longo POV `longo_pangeia_volta.md` (~7 min, 9 capítulos, roteiro aprovado). Ele reaproveita o globo, as máscaras e os supercontinentes do Short (doc 57). Comece quando o dono der o OK.
- **Longo da Pangeia entregue (lado-102, 08/11, doc 58).** Longos 3D passam do limite de 2 h de uma tarefa em segundo plano: renderize em 4 partes (`--frames=a-b --muted`), passe `pipeline/tapa_preto.py` em cada uma, junte com concat e misture o áudio com ffmpeg. O config força crf, então o render só de áudio falha. O Observatório recebe cópia em 540p (< 19,5 MB).
- **Teste de modelo encerrado (11/11):** o lado-103 foi feito no Fable, mas o dono achou que gastou token demais ("foi uma sessão pra um vídeo"). Decisão do dono: produzir no Opus 5.5.
- **Lote 11/11 (4 Shorts) FECHADO:** lado-103 gelo (`Gelo`), 104 Antártida (`Antartida`), 105 Terra cubo (`Cubo`) e 106 grão de areia (`Grao`). Todos no Observatório como Pronto, com legendas e sem thumb.
- **PRÓXIMO: longo do Apophis** (aprovado pelo dono em 11/11), `roteiros/longo_apophis.md` na branch `claude/practical-cannon-ly7fw1` (commit a64a6ad). São ~8 min, 1.920x1080, POV no molde do vídeo 20.
  - **Tela:** contador de tempo no canto (FALTAM 25 ANOS → … → IMPACTO → DIA 1), vermelho na simulação e normal no "Mas espera". Velocímetro de 12,6 km/s. Nomes em neon sobre a faixa de risco de 2005. Nenhum selo.
  - **Cuidados:** nada gráfico, sem rostos, sem o Brasil vendo o Apophis no céu, sem altura de onda.
  - **Thumb (é longo):** "13 DE ABRIL DE 2029".
  - **Como fazer:** use `criarLongo` com `semTexto` e um `canto` próprio (o contador), como em `PangeiaLongo.tsx`. Renderize em 4 partes (`--frames`), por causa do limite de 2 h de uma tarefa. Passe `pipeline/tapa_preto.py` em cada parte e misture o áudio com ffmpeg. Detalhes no doc 58.
- **Economia (dono, 11/11):** o dono reclamou do gasto de tokens. Revise com 1 folha de contato e stills pontuais, sem repetir renders de revisão à toa, e troque de conversa ao fechar cada lote.
