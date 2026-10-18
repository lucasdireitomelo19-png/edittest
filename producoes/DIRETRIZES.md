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

## Entrega
- **Todo vídeo pronto vai para a Central dos Canais** (artefato `https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q`, coleção `videos`, linhas `lado-NN`).
  1. Fazer uma cópia abaixo de 19 MiB: `ffmpeg -nostdin -i in.mp4 -c:v libx264 -preset slow -crf 23 -maxrate 2300k -bufsize 4600k -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out.mp4` (subir o crf se passar).
  2. Subir com `Artifact publish` (`url` do artefato, `asset: true`) e gravar `video_asset` e `video_url` na linha.
  3. Preencher **todas** as legendas: `yt_titulo`, `yt_desc`, `tags`, `tiktok`, `reels` e `comentario`. Status `Pronto`.
- Não republicar a página da Central; só mexer no banco e nos assets.
- Também mandar o MP4 no chat (anexo) e manter os textos em `producoes/NN_*.md`.
