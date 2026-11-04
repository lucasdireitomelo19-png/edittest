# 53 · Lote "Linha dos campeões": os 2 longos POV (04/11/2026)

Fecha o lote dos docs 51 e 52. Roteiros `producoes/roteiros/longo_buraco_negro_1ano.md` e `longo_supernova_perto.md` (branch `claude/practical-cannon-ly7fw1`), aprovados pelo dono em 04/11 (v1), com o texto narrado sem mudança. Voz Brian (ElevenLabs, `narrar_el.py --vel 1.1 --pausa 0.45`), capítulos com `capitulos.py <dir> 2.2`. Motor `src/longo.tsx` (`criarLongo`), 1920x1080. Os dois passaram no `checar_repeticao.py` e na folha de contato. Entrega no Observatório (`videos/lado-92` e `lado-93`), como Pronto e com as 6 legendas.

| Lado | Vídeo | Composição | Duração | Cenas | Publicar |
|---|---|---|---|---|---|
| lado-92 | Longo A · Um BURACO NEGRO está vindo e você tem 1 ANO! | `BnAno` + `ThumbBnAno` | 5:52 | 72 | depois dos 10 Shorts |
| lado-93 | Longo B · Uma ESTRELA EXPLODIU do lado da Terra! | `SnPerto` + `ThumbSnPerto` | 5:36 | 67 | em seguida |

## Longo A (lado-92)
- **Capítulos:** A O AVISO → FALTAM 365 → 300 → 240 → 180 → 90 → 30 → DIA 0 → DEPOIS → MAS ESPERA… A cor cai a cada capítulo e volta inteira no fim. Selo "E SE" do começo ao fim e "SIMULAÇÃO" no trecho de Pavlík e Shore.
- **Física:** Pavlík e Shore 2021 (*A&A* 648 L2), com os 3 cenários (> ~2.000 UA nada acontece; ~200 a ~2.000 UA o Sol segura; < ~200 UA bagunça) e 55%+ de ejeção a ~21 UA. Contas da Pesquisas: 50 km/s ≈ 10 UA por ano, horizonte de ~30 km, desvio de ~41″, limite de maré de ~1,2 milhão de km, ~1 passagem a cada 10¹² anos. Atração do buraco negro na Terra ≈ 2,5% da do Sol.
- **Cuidados na tela:** "E SE" sempre visível; o "1 ano" é dito como recurso de história (cena da claquete) e o aviso real viria décadas antes; a Terra nunca é destruída.
- **Reais:** NASA/JPL (Netuno, Urano, Saturno pela Cassini, montagem dos planetas da Voyager), NASA (Hubble em órbita, Terra, ISS com cidades à noite, nascer do sol e cúpula, STS-135, sala de controle, praia do KSC), NASA/ESA (lente gravitacional), EHT Collaboration (M87*, com a legenda deixando claro que é outro buraco negro), ESO (telescópio no Paranal). Ilustrações: NASA/JPL-Caltech (buraco negro com jato) e NOIRLab/NSF/AURA/J. da Silva (Gaia BH1). Gravura de Le Verrier no Bilder-Magazin de 1846 (Rijksmuseum, domínio público).
- **Thumb:** Saturno com o buraco negro entortando o céu, contador vermelho "365 DIAS", texto "VOCÊ TEM 1 ANO" e selo "E SE".

## Longo B (lado-93)
- **Capítulos:** A 30 ANOS-LUZ → HORA −3 → HORA 0 → DIA 1–30 → SEMANAS → MESES → ANOS 2 A 100 → SÉCULOS → ~900 ANOS → MAS ESPERA… Selos "E SE", "ESTIMATIVA" (brilho) e "HIPÓTESE" (Devoniano).
- **Física:** neutrinos ~3 h antes (SN 1987A); brilho de dezenas a centenas de luas cheias e ~1% de um dia de Sol (estimativas); Sol ~7.600× mais forte; **ozônio com fontes divergentes**, numa tela dividida (Gehrels et al. 2003, < 26 anos-luz, contra Brunton et al. 2023, até ~160 anos-luz, com os raios X), e a estrela do vídeo a 30, no meio; raios cósmicos até ~65 anos-luz (Thomas e Yelland 2023); Devoniano como hipótese (Fields et al. 2020); casca em ~900 anos e ferro-60 no fundo do mar (fato); IK Pegasi a ~150 anos-luz, em ~2 bilhões de anos; Betelgeuse a ~550.
- **Cuidados na tela:** nada de "extinção garantida", sem explosão de raios gama, "pode" nos efeitos do plâncton e da névoa. As fotos do ozônio e da névoa levam na etiqueta que são de outra causa.
- **Reais:** NASA/ESA (SN 1987A), NASA (Lua cheia, Sol pelo SDO, atmosfera vista do espaço, mapa do ozônio de 2009, névoa sobre a China, floração de plâncton, satélite de clima, sala de controle, multidão da STS-135), NASA/CXC/JPL (Cassiopeia A e resto de Tycho), ESO/M. Montargès et al. (Betelgeuse em março de 2020, imagem diferente da usada no Short S1).
- **Thumb:** clarão enorme sobre a cidade à noite com gente olhando pra cima, texto "ELA EXPLODIU" e selo "E SE".

## Notas de produção
- Os dois arquivos passam de 19,5 MB (51 MB e 43 MB), então o Observatório ficou com a cópia 540p e o 1080p foi para o chat do dono.
- `texto_pt.py` ganhou as grafias Pavlík, Shore, Super-Kamiokande e IK Pegasi.
- Saldo do ElevenLabs depois dos dois longos: ~105 mil caracteres (plano Creator, renova em 04/12).
