# 48 · Você encontrou outra VERSÃO de você! (longo, lado-79)

- Longo 1920x1080, ~6:55. Roteiro aprovado pelo dono (31/10, v1), em `roteiros/multiverso.md` #2 (branch `claude/practical-cannon-ly7fw1`).
- Título A por padrão (o roteiro manda A quando o dono não escolhe): "Você encontrou outra VERSÃO de você!". B para o teste A/B: "E se o multiverso for real? Do outro lado do universo, ele está esperando".
- Capítulos com cartões: 0:00 Gancho, 0:30 Nível I, 1:25 Longe demais, 1:55 Nível II, 3:04 Alguém já viu uma bolha?, 3:40 Nível III, 4:54 O chip do Google, 5:28 Nível IV, 6:00 Mas espera…
- Remotion (`remotion/src/videos/Multiverso.tsx`, composição `Multiverso` + thumb `ThumbMultiverso`), motor `criarLongo`. Voz edge-tts **Antonio** na v3 (pausa 0.45, rate −5%; Remy na v1 e na v2), cartões de capítulo de 2,2 s (`capitulos.py`), trilha própria (`musica.py`, semente 70). Narração conferida no Whisper: 100% em português (nomes próprios com sotaque; "WMAP" sai como "Vap").
- Texto narrado sem nenhuma mudança (`videos/v70_longo_multiverso/roteiro.txt`). **96 cenas, nenhuma repetida** (cada foto e cada tipo de esquema uma vez só; `checar_repeticao.py` ok; folha de contato conferida).
- Molde: canto "NÍVEL I…IV · MODELO / FATO / INTERPRETAÇÃO / HIPÓTESE CONTESTADA / HIPÓTESE"; selos de rótulo no canto de baixo; contador "DISTÂNCIA DA SUA CÓPIA": 10^(10^29) M → OUTRA BOLHA → AQUI, EM OUTRO RAMO → NEM EXISTE ESPAÇO. A cor some a cada nível (saturação 0,85 → 0,65 → 0,45 → 0,22) e volta no "Mas espera…".
- Reais: Via Láctea vista da ISS, Hubble XDF, Hubble Deep Field, galáxias distantes e Nebulosa da Bolha (Hubble), Abell 2744, Penhascos Cósmicos (Webb, cores alteradas e avisado), a Terra vista da Orion, a Terra no horizonte da Lua (LRO), astronauta na Cupola e horizonte visto da ISS, mapa do **WMAP** (NASA, corte do quadrado COBE/WMAP/Planck) e mapa do **Planck** (ESA/NASA) em duas versões diferentes (céu inteiro e escalas grandes com a Mancha Fria marcada). Ilustrações da NASA (rotuladas): satélite WMAP e linha do tempo do universo.
- Sem retratos (Tegmark, Everett, Carroll, Guth, Ellis e Steinhardt só pelo nome). Chip Willow: ilustração própria, rotulada "NÃO É FOTO DO CHIP".
- Thumb: porta aberta, a mesma pessoa dos dois lados, bolhas de universos lá dentro, "4 MULTIVERSOS", selo "HIPÓTESE".
- Central e Observatório: `lado-79`, status Pronto. Data de publicação a definir.
- **v2 (31/10, pedido do dono: pronúncia "de estadunidense")**: grafia fonética só na fala para Tegmark, MIT (eme í tê), WMAP (dáblio map), Google (Gúgou), Willow (Uílou), chip (xip), internet (internét), Everett, Carroll, Ellis, Steinhardt, Guth, Vilenkin, Linde e "explodiu" (expludiu). Fica em `pipeline/texto_pt.py` e vale para os próximos vídeos. A legenda mostra a grafia original.
- **v3 (31/10)**: o dono ainda ouvia sotaque na Remy e, depois de comparar 3 vozes, escolheu a **Antonio** (`pt-BR-AntonioNeural`, brasileira nativa) para o Short e o longo. A grafia fonética dos nomes continua no `texto_pt.py`.

## Textos de postagem

**tiktok**
```
Você abre a porta, e do outro lado está você 🚪🌌 Alguns físicos levam isso a sério, mas nenhum outro universo foi visto. Quatro níveis de multiverso, do mais simples ao mais estranho. #fyp #multiverso #universo #astronomia
```

**reels**
```
Você abre a porta. E do outro lado está você 🚪
Existem pelo menos quatro níveis de multiverso, e em cada um a sua cópia fica mais estranha.
Nenhum outro universo foi observado. Parte disso é modelo, parte é hipótese.
Qual desses quatro níveis você acha mais assustador? 👇
#multiverso #universo #astronomia #espaço #cosmologia #ciencia #curiosidades
```

**yt_titulo**
```
Você encontrou outra VERSÃO de você!
```

**yt_desc**
```
Você abre a porta e do outro lado está você. Neste vídeo, seguimos a sua cópia por quatro níveis de multiverso: o espaço infinito, as bolhas da inflação, os ramos da mecânica quântica e a matemática. Cada nível vem com o seu grau de certeza, de modelo a hipótese. Nenhum outro universo foi observado, e nenhuma das ideias foi provada.

Em qual desses níveis você acha que ela estaria? Comenta aí 👇

0:00 A porta
0:30 Nível I: o espaço infinito
1:25 Longe demais
1:55 Nível II: bolhas com outras leis
3:04 Alguém já viu uma bolha?
3:40 Nível III: você se divide
4:54 O chip do Google
5:28 Nível IV: tudo que é matemática existe
6:00 Mas espera…

🎥 Imagens: NASA (Hubble, Webb, ISS, Orion, LRO, WMAP) e ESA/NASA (Planck). Chip Willow: ilustração.
```

**tags**
```
multiverso, universos paralelos, teoria do multiverso, muitos mundos, mecânica quântica, inflação eterna, max tegmark, cópia de você, universo paralelo, universo, espaço, astronomia, cosmologia
```

**comentario**
```
Qual desses quatro níveis do multiverso você acharia mais assustador? 👇
```
