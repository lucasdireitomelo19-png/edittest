# Rotina semanal automática

Este é o manual que a tarefa agendada de domingo segue. Ele também serve para rodar a rotina à mão, pedindo "rode a rotina semanal" numa sessão.

## Ritmo do canal
- **3 vídeos longos por semana** (10:00, horizontal 1920x1080, voz + trilha ambiente leve). A trilha é original, gerada por `pipeline/musica.py <pasta>/musica.wav 600`, e entra com `MUSICA = "musica.wav"` no cenas.py. Nunca use música de terceiros. Publicação: terça, quinta e sábado, às 19h.
- **3 Shorts por dia** (61,0 s, vertical 1080x1920, só voz). Publicação: 9h, 13h e 20h.
  - Por semana: **9 derivados** (3 por vídeo longo, como `s5`–`s7`) e **12 avulsos** tirados de `temas.md`.

## Passo a passo (toda execução)
1. **Temas:** pegue os 3 primeiros vídeos longos e os 12 primeiros Shorts avulsos sem `[x]` em `temas.md`.
2. **Roteiro:** siga o padrão do canal (README.md e os documentos 01–04):
   - Gancho forte em 0–3 s, frases curtas, perguntas abertas e um final memorável.
   - **Nunca invente fatos.** Confira cada número em fonte primária (NASA, ESA, ESO ou artigo científico) e registre a checagem no documento do vídeo.
   - Inspirado no estilo de divulgação científica brasileira, **sem copiar frases nem imitar pessoas reais**. Não use a voz nem o nome de nenhum divulgador.
3. **Narração:** `pipeline/narrar.py` (pt-BR-AntonioNeural). Shorts com alvo de ~59,4 s e longos de ~596 s. Se a velocidade passar de +20%, enxugue o roteiro em vez de acelerar.
4. **Material (vídeo primeiro):** use vídeo em movimento sempre que existir. Foto só quando não houver vídeo do assunto (ex.: fotos do EHT, retratos históricos), e sempre com zoom ou movimento de câmera. Bancos de vídeo, em ordem: NASA SVS (`svs.py`), NASA Image and Video Library (`busca.py`/`baixar.py`), ESA/Hubble, ESA/Webb e ESO (CDN `.../videos/hd_1080p25_screen/<id>.mp4`), Pexels/Pixabay se houver chave. Detalhes: NASA (domínio público, sem sugerir endosso), ESA/Hubble, ESA/Webb e ESO (CC BY 4.0, com crédito) e as animações de `pipeline/anim/`. Nada de material de terceiros sem licença.
   - **Pexels** (`pipeline/pexels.py busca|baixa|fotos|foto`, precisa de `PEXELS_API_KEY` em Network secrets): vídeos de B-roll (céu noturno, telescópios, pessoas observando o céu, Terra). Salve com prefixo `px_` e dê crédito "Pexels/<autor>". Quase todo vídeo "espacial" do Pexels é CGI: use a etiqueta ANIMAÇÃO ou ILUSTRAÇÃO, nunca IMAGEM REAL. Não use clipes com rostos ou marcas em contexto que sugira endosso. Se a chave não existir, siga sem o Pexels.
   - **Pixabay** (`pipeline/pixabay.py busca|baixa|fotos|foto`, precisa de `PIXABAY_API_KEY` em Network secrets): mesmo uso e mesmas regras do Pexels. Salve com prefixo `pb_` e dê crédito "Pixabay/<autor>". Sempre baixe o arquivo (nunca use o link do Pixabay como hospedagem). Se a chave não existir, siga sem o Pixabay.
   - **Openverse** (`pipeline/openverse.py busca|baixa`): use só CC0, domínio público, CC BY e CC BY-SA. **Nunca NC nem ND.** Prefira fontes institucionais (por exemplo, `nasa` = Flickr da NASA Goddard, CC BY 2.0). O Openverse não confere licenças, então abra a página de origem em caso de dúvida. Os créditos ficam em `src/creditos_openverse.json` e precisam entrar no vídeo (CREDITO) e na descrição. As imagens costumam ter só 1024 px: evite zoom acima de ~1,5x e corte carimbos de data (por exemplo, "SDO/AIA … UT").
5. **Montagem:** `pipeline/motor.py` (Shorts) e `pipeline/motor_h.py` (longos). Use etiquetas honestas (IMAGEM REAL, SIMULAÇÃO, ANIMAÇÃO ou ILUSTRAÇÃO) e créditos no vídeo.
6. **Checagem antes de entregar:**
   - Duração exata (61,000 s ou 600,000 s), volume em -14 LUFS e pico abaixo de -1 dB.
   - Folha de quadros revisada: sem texto em inglês das fontes, sem telas pretas e sem etiqueta enganosa.
   - Nenhuma cena pedindo mais tempo do que o clipe de origem tem.
7. **Textos:** títulos, descrição (vídeos longos com capítulos), tags, comentário fixado e legendas de TikTok e Reels. Acrescente tudo ao documento do vídeo.
8. **Entrega no Google Drive**, na pasta `Lado Sombrio do Universo/AAAA-MM-DD (semana)/`:
   - `LONGOS/` → MP4 (comprimido abaixo de 500 MB), thumbnails A/B e `descricao.txt`.
   - `SHORTS/` → MP4 numerados na ordem de publicação.
   - `CALENDARIO.md` → o que publicar em cada dia e horário, com título e legenda prontos.
9. **Repositório:** commit dos roteiros, das cenas e dos documentos (sem MP4), marque os temas usados com `[x]` e faça push.
10. **Resumo:** termine com uma lista curta do que foi produzido, link da pasta no Drive e qualquer fato que precise de atenção.

## O que a automação NÃO faz
- Não publica sozinha: o dono do canal revisa e agenda (ou aprova os rascunhos).
- Não usa vozes, imagens ou nomes de pessoas reais sem autorização.
- Não promete datas ou fatos que não estejam confirmados em fonte.
