# 56 · Short "Buraco negro na sala de aula" (lado-100)

O dono aprovou o roteiro em 07/11/2026, e ele veio pelo Roteirista. É o **primeiro vídeo no formato novo do dono**, feito como teste:
- legenda menor (56 em vez de 76);
- **nenhum texto solto na tela**, só a legenda;
- os números viram imagem 3D;
- **sem ressalvas nem selos** (nada de CÁLCULO, ESTIMATIVA, HIPÓTESE ou E SE);
- tom imersivo.

## Ficha técnica
- **Composição:** `BnSala`, em `src/videos/BnSala.tsx`.
- **Formato:** 50 s, 21 cenas, tudo em Remotion 3D.
- **Narração:** voz Brian (`--vel 1.2 --pausa 0.12`), texto sem mudança. Fica em `public/bnsala/`.
- **Saída:** `out/lado100_bnsala.mp4`, com loudnorm em −14 LUFS.
- **Thumb:** "NA SUA SALA", com o buraco negro em cima da carteira e a lousa em faixas sendo puxada para ele. A cena é o Still `ThumbBnSala`; o texto entra depois, com PIL em Montserrat.

## Cenas
1. A sala de aula, com o ponto negro aparecendo.
2. Close no ponto, com a luz girando em volta.
3. Uma balança: o buraco negro num prato e um "?" 3D no outro.
4. O lápis encolhendo.
5. O ponto some num clarão.
6. A esfera de luz enche a sala.
7. A escola com 14 esferas de luz.
8. A escola se desfazendo.
9. Um manequim brilhando e sumindo.
10. A cidade com 30 colunas de luz.
11. A silhueta de Hawking, com o buraco negro soltando faíscas.
12. Três buracos negros empilhados, vazando em ritmos diferentes.
13. O Everest encolhendo.
14. Um átomo, com um buraco negro menor que ele.
15. Uma ampulheta cósmica com galáxias.
16. As carteiras esmagadas em volta do ponto.
17. Corte da Terra, com o buraco negro descendo pelas camadas.
18. A Terra encolhendo ao lado de uma uva.
19. 560 Terras minúsculas caindo num funil.
20. O sistema solar espiralando para dentro.
21. Um ponto minúsculo passa diante das estrelas, e elas se curvam.

## Lições
- No 9:16, objetos lado a lado saem do quadro. Empilhe na vertical (cena 12) ou afaste a câmera, com distância de ~0,26 × largura por unidade (cena 3).
- `C3` aceita `t`, `sub` e `etq` vazios. Nos vídeos novos, deixe esses três sempre vazios.
- `criarShort(..., {legenda: 56})`.
