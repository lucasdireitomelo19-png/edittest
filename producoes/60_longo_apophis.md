# 60 · Longo POV "E SE o APOPHIS BATESSE na TERRA? Hora a hora, ONDE ele CAIRIA" (lado-107)

O roteiro é `longo_apophis.md` (branch `claude/practical-cannon-ly7fw1`), aprovado pelo dono em 11/11/2026.

## Ficha técnica
- **Composição:** `Apophis`, em `src/videos/Apophis.tsx`.
- **Formato:** 1920x1080, 7:16, 105 cenas em Remotion 3D, nenhuma repetida.
- **Narração:** voz Brian (`--vel 1.1 --pausa 0.4`), 6:52 de fala. Há 2,2 s de pausa antes de cada um dos 9 capítulos (`narracao_cap.mp3` e `palavras_cap.json`).
- **Trilha:** original (`pipeline/musica.py`, semente 107, 440 s).
- **Mixagem:** feita com ffmpeg (`scratchpad/mix_apo.py`): narração, trilha (0,16 → 0,24 no "Mas espera"), whoosh por capítulo e hits.
- **Thumb:** o dono pediu "UM ASTEROIDE VAI BATER NA TERRA!" (11/11). Tem o asteroide em brasa entrando, a Terra à noite com o anel de satélites, e círculo e seta vermelhos. A cena é o Still `ThumbApophis`, e o texto entra depois com PIL. A data 2029 ficou fora da thumb, para não parecer previsão real sobre o Apophis.

## Tela
- **Canto (`Contador`):** é o contador de tempo, ligado aos tempos das palavras. A sequência é 13 · ABR · 2029 → FALTAM 25 ANOS → (fica vermelho em "Então, o que você vai ver") → FALTAM 3 ANOS → FALTAM 3 DIAS → SEGUNDOS (piscando) → IMPACTO → DIA 1 → volta para 13 · ABR · 2029 em ciano no "Mas espera".
- **Velocímetro:** sobe de 0 até 12,6 km/s.
- **Nomes em neon:** ILHAS CURILAS, PACÍFICO NORTE, BAJA CALIFÓRNIA, MÉXICO, GOLFO DO MÉXICO, CARIBE e ATLÂNTICO, sobre a faixa de 2005. Também aparece BRASIL, na cena "atravessar o Brasil em seis minutos".
- **Selos:** nenhum.
- **Cartão de capítulo:** o Apophis girando contra a luz, avermelhado nos capítulos da simulação.
- **Cor:** a saturação cai de 1 para 0,55 durante a simulação e volta a 1 em "Mas espera".

## Peças reaproveitáveis (`Apophis.tsx`)
- **`geoApo`:** o asteroide bilobado com crateras e a textura da Lua.
- **`TerraN`:** a Terra com luzes de cidade. As luzes são geradas a partir dos pixels de terra do Blue Marble, sem textura nova.
- **`Calota`:** mancha, alvo ou região num ponto de lat/lon.
- **`Tubo`:** linha 3D que se desenha até a fração k.
- **`Viva`:** superfície animada (água, cratera, onda).
- **Objetos:** `AnelSat` (anel geoestacionário), `Eiffel`, `Burj`, `Navio`, `Aviao`, `Nave` (RAMSES, OSIRIS-APEX e DART), `Antena`, `Casa`, `Arvore`, `Predios`, `Ceu` (degradê).
- **Mapa:** `Mapa` é o mapa plano em sépia, que pode enrolar, centrado no Pacífico. `FAIXA` é a faixa de 2005.

## Render
- **Partes:** 4, cada uma com `--frames`, `--muted`, `--gl=swangle` e `--concurrency=4`. São ~40–60 min por parte, rodando destacadas (`setsid nohup scratchpad/render_apo.sh`), para escapar do limite de 2 h das tarefas.
- **Montagem:** `tapa_preto.py` em cada parte, concat, áudio mixado, crf 23 e loudnorm.
- **Observatório:** recebe uma cópia em 540p.

## Lições
- Uma `Still` renderizada enquanto o render pesado roda pode sair preta, porque as texturas não carregam a tempo. Use `--timeout=240000`.
- `fontFamily` precisa ser `FONTE` (de `comum`). O nome "Montserrat" não é carregado e cai numa fonte serifada.
- A folha de contato por `-ss` no vídeo de revisão (`--every-nth-frame`) sai fora de ordem. Use `fps=1/4,tile`.
