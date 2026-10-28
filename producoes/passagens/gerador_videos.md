# Passagem · Gerador de Vídeos (Produção de Vídeo)

Atualizado em 28/10/2026 pela conversa `session_014uAw8CBbLDWXsKRFv4J98p`, que substituiu a `session_01RMuyuTR7uKM4etrPUUhNcQ`.
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver.

## Papel
Único agente que produz os vídeos do canal (Shorts verticais e longos horizontais) no Remotion (`producoes/remotion/`). Os roteiros chegam do Roteirista já aprovados pelo dono. Responda em português. Título no Painel: "Produção de vídeos (shorts e longos)", andar "Produção de Vídeo".

## Links e ids
- **Central:** https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q
  - Coleção `videos`, linhas `lado-NN`; a última entregue é lado-66.
  - O arquivo vai como asset (< 19,5 MB). Há ~270 MB livres.
- **Painel:** https://claude.ai/artifact/MYN7cXDqxFUwnWPJCYtSWM (avisos: ver `CLAUDE.md`).
- **Agentes:**
  - LadoSombrio (direção): `session_014uAw8A8j8RoZaxo26zVPpt`. Avise as entregas para ele.
  - Roteirista: `session_01SHrzyZioTiFba7qKi3g3kj`.
- **Roteiros novos** ficam na branch `claude/practical-cannon-ly7fw1`, em `producoes/roteiros/`. Use `git fetch origin claude/practical-cannon-ly7fw1` e depois `git show origin/claude/practical-cannon-ly7fw1:<arquivo>`.

## Chaves (nunca imprima o valor; cole direto no comando)
- **ElevenLabs** (voz Brian): a chave não fica no repositório. O dono passou uma nova em 28/10 (começa com `sk_`; o código hex que não começa com `sk_` é só o ID da chave e não funciona). Se a conversa for nova, peça de novo.
  - Plano starter, 30.102 caracteres por ciclo. Restam ~3,9 mil depois do tsunami v4; a cota renova em 18/11/2026.
  - **Não dá para o longo da Área 51** (~6 mil caracteres). Avise o dono antes de narrar.
- **Pixabay:** dá erro de chave (o proxy não injeta). A biblioteca `pipeline/src/*.mp4` **não vem** num container novo (é ignorada pelo git), nem os mp4 de `remotion/public/*`.
- **Imagens que funcionam:** NASA Images (`images-api.nasa.gov`, `asset/<id>`), SVS (`pipeline/svs.py`) e gravuras históricas do Rijksmuseum (`data.rijksmuseum.nl/search/collection?imageAvailable=true&title=...`, Linked Art → `iiif.micr.io/<id>/full/1600,/0/default.jpg`, domínio público). O Wikimedia Commons deu 429 a sessão inteira.

## Regras do dono que valem
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
0. **Entregues em 28/10** (Central como Pronto, MP4 no chat, docs 32–35, LadoSombrio avisado):
   - lado-63 Minas no Vietnã, lado-64 Amaterasu e lado-65 Marte (lote radiação #2–#4, para 29/10);
   - lado-66 Tsunami 1755 v4 sem POV.
1. **Longo da Área 51, publicação na sexta 30/10.**
   - Roteiro em `producoes/roteiros/longo_area51.md` (branch practical-cannon), ~7 min, 8 capítulos "verdade × mito".
   - Selos por capítulo:
     - 1, 4, 5 e 6: DOCUMENTADO;
     - 2: LENDA;
     - 3: NÃO PROVADO;
     - 7: DOCUMENTADO + ALEGAÇÃO;
     - "Mas espera…": DOCUMENTADO + NÃO PROVADO.
   - A cor cai ao longo do vídeo e volta no "Mas espera…".
   - Título: "Você chegou na cerca da ÁREA 51!".
   - Thumb: cerca e placa à noite com farol, texto "O SEGREDO REAL" e selo "DOCUMENTOS DA CIA".
   - Imagens:
     - pode: CIA, USAF, NNSS/DOE, Landsat/Sentinel e Natural Earth;
     - não pode: Google Earth, Maxar, AP/Getty, Lazar/KLAS ou filmes.
   - Nunca afirmar alienígenas.
   - **Bloqueio:** a cota do ElevenLabs não basta. É preciso perguntar ao dono (nova cota/chave ou edge-tts provisório).
2. **Escolhas do dono em aberto:**
   - thumb do lado-58 (A ou B, stills ThumbA e ThumbB em `SemLua`);
   - troca do título do lado-58 (sugestão: "Você acorda e a Lua SUMIU!").
