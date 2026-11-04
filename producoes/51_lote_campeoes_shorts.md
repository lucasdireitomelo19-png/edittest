# 51 · Lote "Linha dos campeões": Shorts (04/11/2026)

Roteiros: `producoes/roteiros/lote_2026-11-04_campeoes_shorts.md` (branch `claude/practical-cannon-ly7fw1`), aprovados pelo dono em 04/11 (v1). Texto narrado sem mudança, exceto no S9: a distância do Tesla foi recalculada no JPL Horizons (alvo −143205) em 04/11, dando **0,755 UA ≈ 113 milhões de km** (o roteiro dizia 112, de 03/11).

- **Voz:** Brian (ElevenLabs, `narrar_el.py <dir> 60 --vel 1.2 --pausa 0.12`). O `narrar_el.py` agora passa o texto por `texto_pt.preparar` (números por extenso e siglas em pronúncia portuguesa) e devolve a grafia original na legenda. Grafias novas em `texto_pt.py`: WOH G64, Stephenson 2-18, Gaia BH1 e 2024 YR4.
- **Montagem:** kit novo `remotion/src/lote/kit.tsx`, com 35 tipos de cena (foto, clipe, número, selo, glitch, órbita, régua, barras, curva, tamanhos, fila, pergunta, alerta, céu, balança, explosão, pizza, terminal, versus, carimbo, túnel, bússola, campo, astro, placa, relógio, piscada, chuva, calendário, linha do tempo, sistema solar, galáxia, frase, mar e capa). Cada vídeo é um `PLANO` de `[frase-âncora, Tipo, props]`. O `checar_repeticao.py` agora barra **tipo de cena repetido** no mesmo vídeo (além de foto/clipe repetido).
- **Regra do dono:** nenhuma cena repetida (cada foto numa cena só, cada tipo de esquema uma vez por vídeo). Os 5 vídeos passaram no checador e na folha de contato.
- **Entrega:** Observatório (`videos/lado-NN`, a Central está cheia). Os Shorts não são POV.

| Lado | # | Composição | Duração | Reais (crédito) | Publicar |
|---|---|---|---|---|---|
| lado-82 | S7 Júpiter no lugar da Lua | `Jupiter` + `ThumbJupiter` | 43 s | NASA/KSC (Lua, praia), NASA (Moonrise em Washington), NASA/JPL (Cassini), NASA/JPL-Caltech/SwRI/MSSS (Juno) | 1º do lote |
| lado-83 | S6 Maior estrela já vista | `MaiorEstrela` + `ThumbMaiorEstrela` | 48 s | ESO (vídeo eso2417b), ESO/K. Ohnaka et al. (eso2417a), NASA (ISS, Nuvens de Magalhães), NASA/SDO | 2º |
| lado-84 | S9 Tesla no espaço | `Tesla` + `ThumbTesla` | 43 s | NASA/KSC (Falcon Heavy e coletiva, 06/02/2018), NASA (Blue Marble), NASA/Viking | 3º · **recalcular a distância no dia** |
| lado-85 | S10 Memorial na Lua | `Memorial` + `ThumbMemorial` | 46 s | NASA (AS15-88-11894, AS15-88-11863, AS16-117-18841 via LPI em 450 px, AS14-68-9414, LRO Earthrise) | 4º |
| lado-86 | S2 Buraco negro mais perto | `BnPerto` + `ThumbBnPerto` | 46 s | ESO/S. Brunier (eso0932a); ilustração NOIRLab/NSF/AURA/J. da Silva (Gaia BH1) | perto de 02/12 (Gaia DR4) |

Notas por vídeo:
- **S7:** telas "LUA: 0,5°", "21° NO CÉU", "≈ 40 LUAS", "≈ 37 H (CÁLCULO)", "26.000×", "LIMITE DE ROCHE ~109 MIL KM", "E SE IMPOSSÍVEL". A montagem de Júpiter sobre a cidade leva etiqueta MONTAGEM · ILUSTRAÇÃO.
- **S6:** "A MAIOR ESTRELA JÁ VISTA" (nunca "do universo"). Sistema Solar em escala de raiz quadrada para caber na tela (avisado na tela). "ESTRELA ~9,3 UA × SATURNO 9,6 UA (CÁLCULO)".
- **S9:** "~113 MILHÕES DE KM (JPL, 04/11/2026)", "557 DIAS", "5,7 VOLTAS (CONTA)", "~9 KM/S", "2091", "~6% EM 1 MILHÃO DE ANOS (REIN ET AL., ESTIMATIVA)". O Falcon Heavy da foto é o voo de 06/02/2018. O carro é ilustração.
- **S10:** a placa com os 14 nomes é ilustração (não recorta de novo a foto real). Gagarin entra só pelo nome (sem retrato licenciado).
- **S2:** "NENHUM CONFIRMADO", "PROVÁVEIS FALSOS", "PREVISTO PARA 02/12/2026". O Gaia BH1 da NOIRLab é ilustração (etiqueta cinza).
