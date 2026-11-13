# 62 · Short "E SE a TERRA GIRASSE cada vez MAIS RÁPIDO? 🌍💫" (lado-109)

Roteiro: `short_terra_girando_rapido.md` (branch `claude/practical-cannon-ly7fw1`, commit 7a6f466), aprovado pelo dono em 13/11/2026. O dono pediu este Short ANTES do longo (lado-110).

## Ficha técnica
- **Composição:** `GiroShort`, em `src/videos/GiroShort.tsx`. Short 1080x1920 de 49 s, com 15 cenas em Remotion 3D. As cenas são próprias, diferentes das do longo, e não tem thumb.
- **Voz:** Brian (`--vel 1.2 --pausa 0.12`), legenda 56. O flash de virada está em "Mas na vida real".
- **Na tela:**
  - o título "E SE A TERRA GIRASSE MAIS RÁPIDO?" no 1º segundo;
  - o contador "O DIA DURA" no canto direito: 24 H → 12 H → 6 H → 4 H → 2 H → 1H24, voltando a 24 H, em verde, na virada.
- **Cenas:**
  - a Terra vista do polo acelerando;
  - o calendário de 05/07/2024;
  - a manivela no Polo Norte;
  - a estrada no equador com o asfalto correndo;
  - furacões sobre o mar;
  - o globo de vidro com a água indo para o meio;
  - o trampolim;
  - o basquete subindo o dobro;
  - o marco do equador com poeira subindo;
  - carros e pedras flutuando;
  - o anel se formando;
  - a Terra numa gaiola rígida ("Terra que não se deforma");
  - Haumea;
  - a manivela girando ao contrário;
  - a Lua se afastando.
- **Peças:** reaproveita `TerraGira`, `Furacao`, `Ovo` e `calTex` de `Girando.tsx`, e `Viva`, `Tubo` e `Ceu` de `Apophis.tsx`.

## Lições
- Para priorizar um render, pause o outro com `kill -STOP` (no processo do remotion e nos filhos do chrome-headless) e retome com `kill -CONT`.
