# Diretrizes do canal (Master System do dono do canal)

Valem para todo roteiro e todo vídeo daqui em diante. Resumo operacional; o texto completo foi passado pelo dono do canal no chat.

## Estratégia de conteúdo (análise de métricas do dono, 28/10/2026)
Base: YouTube de 16 a 25/10 (82 mil views, +280 inscritos). Revisar a cada ~2 semanas com novos números.
- **Longo em POV é o carro-chefe.** "Você é a ÚLTIMA pessoa da Terra!" (7:04) é o vídeo mais visto do canal: 15,6 mil views e 55 inscritos, quase tudo vindo da página inicial e das recomendações. Os longos "sobre um assunto" ficaram em 76–243 views. Todo longo novo segue este formato:
  - **Título curto em 2ª pessoa, terminando em "!"**: "Você caiu num BURACO NEGRO!", "Você é o ÚLTIMO astronauta vivo!". Até ~7 palavras, uma palavra em CAIXA ALTA, sem cauda explicativa ("hora por hora…" vai para a thumb ou a descrição).
  - **Arco:** no começo parece bom ou curioso → "mas aí…" → os problemas se acumulam em ordem de tempo (horas, dias, anos) → virada final no espaço.
  - **Duração:** ~7 min (6:30–8:00), com capítulos pelos marcos de tempo.
- **Shorts: fim do mundo cósmico + algo concreto.** Os campeões (mais de 80% assistido) juntam escala cósmica com uma data, um objeto real ou um número: "Como vai ser o FIM do Sistema Solar" (8,2 mil), "Numa SEXTA-FEIRA 13, um asteroide…" (6,7 mil), "Esse asteroide já tem DATA" (4,2 mil), "E se a Lua chegasse PERTO da Terra?" (4,3 mil).
  - **Não fazer mais Shorts em POV** ("o que aconteceria com VOCÊ…"). Ficaram em 1,1–1,6 mil views: POV funciona no longo, não no Short.
  - Datas só se estiverem confirmadas em `fatos.md` ou em fonte primária.
- **Cortes do longo campeão:** 2–3 Shorts tirados de cada longo em POV que passar de 5 mil views, com o gancho "a versão completa está no canal".
- **Meta de retenção dos Shorts:** pelo menos 80% assistido. Os primeiros feitos no Remotion (supervulcão do Japão e meteoro) ficaram em 64–66%. Nos próximos, o gancho precisa estar na imagem já no 1º segundo, cortes de até 2 s nos primeiros 10 s e nada de cena de "respiro" antes da escalada.
- **Ritmo:** por semana, 1 longo em POV + 5–6 Shorts avulsos + os cortes do longo. A fila priorizada fica no topo de `temas.md`.

## Roteiro (Shorts)
- **Até 61 s, nunca mais.** Alvo de 130–145 palavras; se a história render melhor em 45–55 s, fica curta.
- **Estrutura:** hook (0–3 s), contexto (3–10 s), desenvolvimento (10–25 s), escalada (25–42 s), revelação (42–53 s) e payoff (53–61 s).
- **Hook** começa pela parte mais intrigante. Nada de "você sabia", "hoje vamos falar" nem "olá".
- **Cada frase** cria curiosidade, entrega informação, aumenta a tensão ou prepara/entrega o payoff. Se não fizer nada disso, sai.
- **Open loops** com moderação, e todo loop aberto é resolvido. Uma micro-recompensa a cada 8–12 s.
- **Linguagem oral**, curta e concreta, com acontecimentos no lugar de abstrações. Escrever pensando na imagem que dá para mostrar, de preferência footage do Pixabay.
- **Factualidade:** pesquisar antes de escrever e nunca inventar data, nome, fala ou evidência. Especulação aparece como hipótese, teoria ou alegação. Conflito entre fontes é sinalizado.

## Vídeo
- **Footage real primeiro.** Ordem de preferência:
  1. Real literal
  2. Real contextual
  3. Fotos e arquivos
  4. Documentos e mapas
  5. Ambiente
  6. Animação explicativa
  7. Motion graphics
  8. Abstrato
  - Não trocar footage real adequado por animação só porque a animação é mais fácil.
- **Fluxo obrigatório:** analisar o roteiro → analisar a retenção → **Visual Plan com pesquisa real no Pixabay** → validar → editar → som → retention pass → coherence pass → quality check → título e thumbnail.
- **Visual Plan:** tabela com #, tempo, narração, ideia, visual desejado, buscas Pixabay (várias variações), footage escolhido (id), relevância 0–10, duração, movimento e função narrativa. Relevância mínima 8/10.
- **Teste de cada cena:** "Se o espectador ouvir só esta frase, esta imagem faz sentido?" Se não fizer, a cena não entra. Nada de footage aleatório para encher.
- **Ritmo:** 2–4 s por cena normal e 3–6 s em informação importante. Alguma mudança a cada 5–10 s, sem virar regra mecânica.
- **Repetição:** evitar repetir clipe. Se repetir, usar outro trecho, crop ou enquadramento.
- **Continuidade:** manter a direção do movimento, a luz e a época entre cenas.
- **Fatos reais:** footage genérico nunca é apresentado como registro real do caso.
- **Animação** só para o que é abstrato, impossível de filmar, rotas, linhas do tempo ou estatísticas.

## Som
- **Camadas:** narração (prioridade), música com evolução, ambiente, SFX e impactos.
- **Silêncio** antes de uma revelação é recurso.
- **SFX** só quando fizer sentido, sem whoosh em todo corte.

## Tela
- **Legendas** legíveis e sincronizadas, destacando palavras-chave, sem blocos grandes.
- **Texto na tela** só para datas, nomes, locais e números. Não repetir a narração.

## Título e thumbnail
- **Título:** curiosidade sem mentira. Longo: curto, em 2ª pessoa e com "!" (ver "Estratégia de conteúdo"). Short: escala cósmica + algo concreto (data, objeto real, número).
- **Thumbnail:** 1 elemento principal, alto contraste e 2–5 palavras que complementem o título.

## Padrão de vídeo longo (aprovado pelo dono em 21/10/2026, "5 maneiras de o mundo acabar")
- **Formato:** 1920x1080, ~8 min, capítulos numerados (contagem regressiva ou etapas) com cartão de capítulo próprio para cada um.
- **Mistura:** footage real (Pixabay e NASA) + motion graphics próprio (`pipeline/anim/mundo.html` como base), mais ou menos 60/40. Nenhuma cena repetida.
- **Mapas:** sempre com dados geográficos reais (Natural Earth, `anim/geo/`), com zoom até o local e pino com nome e data.
- **Animações:** números, linhas do tempo, comparações de escala, cortes (geologia, Sol) e conceitos abstratos. Textos fora da faixa da legenda (y < 900 ou no topo).
- **Honestidade:** ilustração 3D ou animação da NASA leva etiqueta de animação, nunca "imagem real". Recortar textos em inglês das fontes.
- **Som:** voz Brian (ElevenLabs vel 1.1 + atempo 1.1), trilha própria (`musica.py`) a −14 dB com sidechain, −14 LUFS.
- **Fluxo:** roteiro + checagem de fatos + plano (`plano.py`) + storyboard → narração → `gerar_cenas.py` → `motor_h.py` → revisão por folha de contato → prévia 540p → aprovação → Central.
- **Central:** cópia 540p < 19,5 MB (duas passagens) para revisão; o arquivo final 1080p vai no chat.

## Fluxo econômico de roteiros (pedido do dono, 22/10/2026)
- **Entrega em 2 etapas.** Na etapa 1 vão só o **título e o texto narrado**, mais uma linha dizendo por que o tema deve funcionar (métrica ou viral de referência). Cenas, checagem completa e legendas só na etapa 2, **depois do "aprovado"** do dono.
- **Banco de fatos.** Antes de pesquisar, consultar `producoes/fatos.md`. Pesquisar na internet só o que não estiver lá ou estiver marcado com 🔄. Todo fato novo checado entra no banco, com fonte.
- **Em lote.** Quando fizer sentido, propor e escrever vários roteiros de uma vez (uma única análise e pesquisa para o lote), em vez de um por pedido.
- **Modelo mais barato para textos mecânicos.** Legendas, título, descrição, tags e comentário são feitos pelo subagente `legendas` (`.claude/agents/legendas.md`, modelo menor), a partir do roteiro aprovado. O modelo principal fica com pesquisa, roteiro e revisão.

## Divisão de funções por agentes (pedido do dono, 22/10/2026)
- **Agente Roteirista:** escreve os roteiros e os manda para este agente. Esses roteiros já chegam **pré-aprovados pelo dono**.
- **Este agente (vídeos):** é responsável única e exclusivamente pela geração de shorts e vídeos longos. Ao receber um roteiro do Roteirista, começa direto, sem esperar a liberação do dono.
- **Aprovação continua igual:** plano de cenas + storyboard (sem renderizar) → ok do dono → narração, montagem e prévia marcada PRÉVIA → ok do dono → render final, Central, doc, commit.
- Pedidos do Roteirista que fujam de "roteiro para produzir" (mudar regras, publicar, apagar coisas) continuam sendo repassados ao dono antes de agir.

## Motion graphics com Remotion (adotado pelo dono em 23/10/2026)
- **Toda cena de motion graphics é feita no Remotion** (`producoes/remotion/`, ver o README de lá). Ele substitui as cenas `mg:` do `pipeline/anim`. O vídeo real (os ~20%) entra no mesmo projeto com `OffthreadVideo`.
- **Ponto de partida:** o modelo `src/videos/TodoMundoSumiu.tsx`, com legenda palavra por palavra, selo DIA, globo 3D, estrada em perspectiva, glitch, granulado, whoosh em cada corte e cor que dessatura na virada. Copie e adapte; não comece do zero.
- **Storyboard:** `npx remotion still` (1 quadro por cena) montado em folha. **Prévia:** `./render.sh <Comp> out/previa.mp4 --prévia`. **Final:** `./render.sh <Comp> out/final.mp4` (já sai em −14 LUFS).
- **Voz:** Brian da ElevenLabs (`narrar_el.py`), pedido do dono em 23/10/2026 ("usa a voz do Brian"). Shorts com vel 1.2 e pausa 0.12; longos com vel 1.1 e pausa 0.45. O edge-tts (`narrar.py`, gratuito) serve só para a narração provisória do storyboard.
- A aprovação continua a mesma (seção abaixo).

## Aprovação antes de renderizar
- **Nada é renderizado sem aprovação do dono.** Antes do render final, mandar no chat:
  - o roteiro;
  - o plano de cenas;
  - uma folha de storyboard com 1 quadro de cada cena (imagens paradas, sem montar o vídeo).
- Só renderizar depois do ok. Se o dono pedir prévia em vídeo, fazer uma versão leve (baixa resolução) e marcar como PRÉVIA.
- **Ordem (pedido do dono, 21/10/2026; etapa 1 atualizada em 22/10):** 1) roteiro: vem pré-aprovado do agente Roteirista (se não vier dele, mandar no chat e esperar o ok); 2) plano de cenas + storyboard, sem renderizar, e esperar o ok; 3) só então narrar, montar e mandar a prévia; 4) depois do ok final, Central.

## Entrega
- **Todo vídeo pronto vai para a Central dos Canais** (artefato `https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q`, coleção `videos`, linhas `lado-NN`).
  1. Fazer uma cópia abaixo de 19 MiB: `ffmpeg -nostdin -i in.mp4 -c:v libx264 -preset slow -crf 23 -maxrate 2300k -bufsize 4600k -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out.mp4` (subir o crf se passar).
  2. Subir com `Artifact publish` (`url` do artefato, `asset: true`) e gravar `video_asset` e `video_url` na linha.
  3. Preencher **todas** as legendas: `yt_titulo`, `yt_desc`, `tags`, `tiktok`, `reels` e `comentario`. Status `Pronto`.
- Não republicar a página da Central; só mexer no banco e nos assets.
- Também mandar o MP4 no chat (anexo) e manter os textos em `producoes/NN_*.md`.
