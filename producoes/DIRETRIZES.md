# Diretrizes do canal (Master System do dono do canal)

Valem para todo roteiro e todo vídeo daqui em diante. Resumo operacional; o texto completo foi passado pelo dono do canal no chat.

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
- **Título:** curiosidade sem mentira.
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

## Fluxo de agentes: Pesquisas → Roteirista → geradores (pedido do dono, 22/10/2026)
Os agentes aparecem no **Observatório Lado Sombrio** (`https://claude.ai/artifact/G6YahQcE96GqFd1VcSmFDH`), desde 31/10/2026. Os avisos de status vão para a coleção `eventos` dele, com `andar` = "Direção & Roteiros" para o Roteirista. O antigo Prédio/Painel dos Agentes (`MYN7cXDqxFUwnWPJCYtSWM`) não recebe mais avisos.

| Agente | O que é | Onde |
|---|---|---|
| Pesquisas | subagente `pesquisa` | `.claude/agents/pesquisa.md` |
| Roteirista | subagente `roteirista` | `.claude/agents/roteirista.md` |
| Gerador de Vídeos (Shorts e longos) | sessão do Claude | `session_014uAw8DrmJxSY5aKHa69atp` (desde 31/10; antes `session_014uAw8ECXTG9UxiW9JLs54A`, `session_014uAw8AewL5m4SRkPVMbrbr`, `session_014uAw8CBbLDWXsKRFv4J98p` e `session_01RMuyuTR7uKM4etrPUUhNcQ`) |
| Gerador de Carrosséis (Instagram) | sessão do Claude | `session_019KYTeVZcURhxGac3ijKjZn` |
| Legendas (textos de postagem) | subagente `legendas` | `.claude/agents/legendas.md` |

1. **Pesquisas** entrega o lote de temas com os fatos checados. Esses temas **já estão aprovados pelo dono**: vão direto para o `roteirista`, sem pedir nova aprovação.
2. **Roteirista** escreve os roteiros (Short, longo ou carrossel) com ângulo, tom de voz e **potencial viral (nota 0–10 e 🔥)** num arquivo `producoes/roteiros/lote_*.md`.
3. A sessão principal **manda no chat** cada roteiro com o potencial viral e espera o dono.
4. **Aprovado** → a sessão principal faz commit e push do arquivo e manda o roteiro (texto completo + caminho do arquivo e branch) com `send_message` para a sessão certa: Short ou longo para o **Gerador de Vídeos**, carrossel para o **Gerador de Carrosséis**. A mensagem diz que o roteiro já está aprovado pelo dono, e o gerador segue as etapas destas diretrizes a partir do plano de cenas (o storyboard e a prévia ainda passam pelo dono antes do render). Os textos de postagem ficam com o subagente `legendas`.
   **Reprovado** → volta para o `roteirista` com o feedback do dono, que revisa (v2, v3…) e reenvia. Repete até aprovar.
- Subagentes não chamam outros agentes: quem passa o trabalho de um para o outro é a sessão principal.
- Se a sessão de um gerador tiver sido arquivada, peça ao dono o ID da nova sessão e atualize a tabela acima.

## Aprovação antes de renderizar
- **Nada é renderizado sem aprovação do dono.** Antes do render final, mandar no chat:
  - o roteiro;
  - o plano de cenas;
  - uma folha de storyboard com 1 quadro de cada cena (imagens paradas, sem montar o vídeo).
- Só renderizar depois do ok. Se o dono pedir prévia em vídeo, fazer uma versão leve (baixa resolução) e marcar como PRÉVIA.
- **Ordem (pedido do dono, 21/10/2026):** 1) mandar o roteiro completo no chat e esperar o ok, antes de criar qualquer coisa; 2) plano de cenas + storyboard, sem renderizar, e esperar o ok; 3) só então narrar, montar e mandar a prévia; 4) depois do ok final, Central.

## Entrega
- **Todo vídeo pronto vai para a Central dos Canais** (artefato `https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q`, coleção `videos`, linhas `lado-NN`).
  1. Fazer uma cópia abaixo de 19 MiB: `ffmpeg -nostdin -i in.mp4 -c:v libx264 -preset slow -crf 23 -maxrate 2300k -bufsize 4600k -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out.mp4` (subir o crf se passar).
  2. Subir com `Artifact publish` (`url` do artefato, `asset: true`) e gravar `video_asset` e `video_url` na linha.
  3. Preencher **todas** as legendas: `yt_titulo`, `yt_desc`, `tags`, `tiktok`, `reels` e `comentario`. Status `Pronto`.
- Não republicar a página da Central; só mexer no banco e nos assets.
- Também mandar o MP4 no chat (anexo) e manter os textos em `producoes/NN_*.md`.
