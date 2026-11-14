# 65 · Lote 14/11: 2 Shorts 3D (lado-112 e 113)

Roteiro: `lote_2026-11-14_planetas_estrelas.md` (branch `claude/practical-cannon-ly7fw1`, commit 75849c3), aprovado pelo dono. Os dois são em Remotion 3D, sem bonequinho nem foto real (regra de 14/11), e sem thumb.

## lado-112 · "QUANTO TEMPO VOCÊ SOBREVIVERIA EM CADA PLANETA? 🪐⏱️"
- **Composição:** `Planetas`, 56 s, 16 cenas.
- **Na tela:** barra branca no início. Em cada mundo, NOME + TEMPO grandes no centro (LUA ~15 S, MARTE ~15 S, MERCÚRIO SEGUNDOS, VÊNUS SEGUNDOS, GIGANTES SEGUNDOS, SOL 0 S).
- **Cuidados:** o técnico de 1966 aparece só como traje vazio numa câmara de vácuo. Nada gráfico.
- **Peça nova:** `src/lote/planetas3d.tsx` gera as texturas de planeta em canvas (Marte, Mercúrio, Vênus, Júpiter, Saturno, Urano, Netuno, Sol, Betelgeuse) e tem o componente `Planeta`, com anel opcional.

## lado-113 · "E SE TROCÁSSEMOS O SOL POR OUTRAS ESTRELAS? ☀️🔄"
- **Composição:** `TrocaSol`, 50 s, 11 cenas.
- **`Horizonte`:** é o MESMO cenário em todas as trocas (campo, colina, árvore, mar). O dono aceitou essa exceção. Mudam:
  - o disco da estrela;
  - o céu;
  - o efeito no chão: gelo, vapor, lava, desmanche ou clarão.
- **Espaço:** `Sistema` mostra as órbitas, com a estrela engolindo as órbitas internas (Betelgeuse passa de Marte; Stephenson 2-18 passa de Saturno).
- **Topo:** o nome da estrela.
- **Final:** termina com o Sol normal.
