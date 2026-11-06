# 54 · Short "E se a LUA BATESSE na Terra? Isso JÁ aconteceu (e a Lua nasceu dali)" (06/11/2026)

Roteiro `producoes/roteiros/short_lua_bate_terra.md` (branch `claude/practical-cannon-ly7fw1`), aprovado pelo dono em 06/11 (v1), com o texto narrado sem mudança. **Pedido do dono: tudo em Remotion 3D.** Entregue como lado-96 no Observatório (Pronto, 6 legendas, thumb).

- **Voz:** Brian (ElevenLabs, `--vel 1.2 --pausa 0.12`), 42 s. `texto_pt.py` ganhou "Theia" → "Téia".
- **Composição:** `LuaBate` + `ThumbLuaBate` (`src/videos/LuaBate.tsx`). Cada cena é uma cena Three.js própria (`@remotion/three` + bloom), montada pelo `K.criarShort`. Render com `--gl=swangle` (~20 min para 42 s em 1080x1920).
- **20 cenas, nenhuma repetida:** a Lua descendo sobre a Terra; enxame de asteroides com o contador ×10.000.000; Chicxulub riscando a Terra; disco do tamanho da Lua sobre o Brasil (3.474 km × ~4.378 km); a Lua em órbita a ~1 km/s; a Lua freando; queda de ~4 dias e 20 h com relógio; a Lua rachando (Roche ~18 mil km); os pedaços se esticando, **sem anel** (não repete o v26); clarão do impacto; crosta derretendo (estimativa); a Terra girando ao contrário ("isso já aconteceu"); Terra primitiva; túnel de estrelas (~4,5 bi de anos); Theia chegando; o choque; a Lua se formando da poeira; corte da Terra com as duas massas no fundo do manto (hipótese, baseado no USGS); régua vertical "+3,8 CM/ANO"; câmera descendo até o horizonte da Terra.
- **Cuidados:** nada gráfico, sem altura de ondas, Theia como "hipótese mais aceita" e as massas no manto como "hipótese".
- **Texturas:** Terra e Lua dos mapas dos exemplos do Three.js (Blue Marble e LRO), em `public/teste3d/`.
- **Thumb:** a Lua 3D descendo sobre a Terra, com a faixa vermelha "10 MILHÕES" e "DE CHICXULUBS" em amarelo.
