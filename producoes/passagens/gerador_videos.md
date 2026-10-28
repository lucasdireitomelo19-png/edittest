# Passagem · Gerador de Vídeos (Produção de Vídeo)

Atualizado em 28/10/2026, na troca da conversa `session_01RMuyuTR7uKM4etrPUUhNcQ` por uma nova.
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver.

## Papel
Único agente que produz os vídeos do canal (Shorts verticais e longos horizontais) no Remotion (`producoes/remotion/`). Os roteiros chegam do Roteirista já aprovados pelo dono. Responda em português. Título no Painel: "Produção de vídeos (shorts e longos)", andar "Produção de Vídeo".

## Links e ids
- **Central:** https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q
  - Coleção `videos`, linhas `lado-NN`; a última entregue é lado-62.
  - O arquivo vai como asset (< 19,5 MB). Há ~270 MB livres.
- **Painel:** https://claude.ai/artifact/MYN7cXDqxFUwnWPJCYtSWM (avisos: ver `CLAUDE.md`).
- **Agentes:**
  - LadoSombrio (direção): `session_014uAw8A8j8RoZaxo26zVPpt`. Avise as entregas para ele.
  - Roteirista: `session_01SHrzyZioTiFba7qKi3g3kj`.
- **Roteiros novos** ficam na branch `claude/practical-cannon-ly7fw1`, em `producoes/roteiros/`. Use `git fetch origin claude/practical-cannon-ly7fw1` e depois `git show origin/claude/practical-cannon-ly7fw1:<arquivo>`.

## Chaves (nunca imprima o valor; cole direto no comando)
- **ElevenLabs** (voz Brian): a chave não fica no repositório. Peça ao dono, ou procure se ela está nas Network secrets.
  - Restam ~2,1 mil caracteres; a cota renova em 18/11/2026.
  - **Não dá para o longo da Área 51** (~6 mil caracteres). Avise o dono antes de narrar.
- **Pixabay:** a chave antiga dá 401 e o proxy não injeta outra. Use a biblioteca local `pipeline/src/*.mp4` (534 clipes: `na_*` NASA, `pb_*` Pixabay, `es_*` ESO), NASA Images e SVS (`pipeline/svs.py`).

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
1. **Lote radiação #2–#4, para 29/10.**
   - O roteiro é `producoes/roteiros/lote_2026-10-28_radiacao.md` (branch practical-cannon). As notas de tela de cada um estão lá.
   - As narrações Brian já estão prontas:
     - `videos/v55_minas_vietna` (47,5 s);
     - `videos/v56_amaterasu` (46,4 s);
     - `videos/v57_marte_radiacao` (42,6 s).
   - Falta:
     1. copiar `narracao.mp3` e `palavras.json` para `remotion/public/<pasta>`;
     2. escrever `MinasVietna.tsx`, `Amaterasu.tsx` e `MarteRadiacao.tsx` e registrar no `Root.tsx`;
     3. fazer a revisão interna e o render final;
     4. criar as linhas lado-63, lado-64 e lado-65;
     5. escrever os docs 32, 33 e 34.
   - **#2 Minas no Vietnã:**
     - mapa do Vietnã com pino em Haiphong;
     - SDO com a etiqueta "imagem de outra erupção" (`na_sdo_erupcao` tem título da NASA no início, então use ss > 5);
     - mar em `pb_ondas_tempestade` e `pb_en_tempestade_mar` (real), explosões como ilustração;
     - Lua vazia em `na_lua_apollo17`.
     - Não dizer "teria morrido".
   - **#3 Amaterasu:**
     - chuva de partículas em MG sobre `pb_deserto` (real) logo no 1º segundo;
     - hipóteses marcadas como hipótese.
   - **#4 Marte:**
     - barra de dose estourando no 1º segundo;
     - imagens NASA: PIA14831 (cruzeiro MSL, ILUSTRAÇÃO), PIA16101 ou PIA16077 (solo de Marte, real) e PIA23302 (humanos em Marte, ILUSTRAÇÃO).
2. **Short do tsunami v4 (sem POV), aprovado em 28/10.**
   - Roteiro #3 em `producoes/roteiros/lote_2026-10-24_pov_catastrofes.md` (branch practical-cannon). Substitui a v3 (`src/videos/Tsunami.tsx` e `public/tsunami` são reaproveitáveis).
   - Título: "Em 1755, um TSUNAMI pode ter chegado ao Brasil 🌊🇧🇷".
   - Tela:
     - "01/11/1755";
     - mapa com pino em Lisboa e a onda até o Nordeste;
     - "CARTA DE 1756: '1 LÉGUA TERRA ADENTRO'";
     - "HIPÓTESE" fixo no trecho do Brasil.
   - Gravuras de Lisboa de 1755 (domínio público).
   - Precisa de narração nova (~800 caracteres).
3. **Longo da Área 51, publicação na sexta 30/10.**
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
4. **Escolhas do dono em aberto:**
   - thumb do lado-58 (A ou B, stills ThumbA e ThumbB em `SemLua`);
   - troca do título do lado-58 (sugestão: "Você acorda e a Lua SUMIU!").
