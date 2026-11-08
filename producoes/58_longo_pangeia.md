# 58 · Longo POV "Você acorda com UM SÓ CONTINENTE!" (lado-102)

O roteiro é `longo_pangeia_volta.md`, aprovado pelo dono em 07/11 e liberado para produção em 08/11. O Short do mesmo tema é o lado-101 (doc 57).

## Ficha técnica
- **Composição:** `PangeiaLongo`, em `src/videos/PangeiaLongo.tsx`.
- **Formato:** 1920x1080, ~6:55, 104 cenas em Remotion 3D, nenhuma repetida.
- **Narração:** voz Brian (`--vel 1.1 --pausa 0.4`), 6:30 de fala. Há 2,2 s de pausa antes de cada capítulo, inseridos em `narracao_cap.mp3` e `palavras_cap.json`.
- **Trilha:** original, gerada por `pipeline/musica.py` (semente 41, 420 s).
- **Saída:** `out/lado102_pangeialongo.mp4`.
- **Thumb:** "UM SÓ CONTINENTE", com a Pangeia Última em brasa e uma silhueta na borda. A cena é o Still `ThumbPangeiaLongo`, e o texto entra depois com PIL.

## Formato novo nos longos
`criarLongo` ganhou estas opções:
- `semTexto`: tira o canto escrito, os cartões "CAPÍTULO N" e os selos;
- `legenda`: tamanho da legenda (aqui, 40);
- `cartao` e `canto`: componentes visuais no lugar desses textos.

Neste vídeo, esses componentes são o anel de rocha:
- **No canto:** um anel 3D de camadas de rocha (`CantoAnel`). Ganha uma camada a cada salto de tempo, na sequência 0, 0, 0, 1, 2, 4, 5. Fica alaranjado nos capítulos do calor.
- **Na troca de capítulo:** tela escura com o anel grande (`CartaoAnel`). Nos saltos de tempo, a camada nova entra crescendo.
- **Cor:** a saturação cai de capítulo em capítulo (1 → 0,5) e volta a 1 em "Mas espera".
- **Nomes na tela:** só nomes de lugares, em neon (exceção liberada pelo dono para a Pangeia): BRASIL, ÁFRICA, ATLÂNTICO, PACÍFICO, NORDESTE, GOLFO DA GUINÉ, SÃO LUÍS, MEDITERRÂNEO, POLO NORTE, AMÉRICAS, ÁSIA, AMÁSIA, GIBRALTAR, EUROPA, AMÉRICA DO NORTE, PANGEIA ÚLTIMA, AURICA, EQUADOR, PANGEIA, NASA e BRISTOL.

## Peças reaproveitáveis
- `src/lote/pangeia3d.tsx`: o globo com continentes móveis, os supercontinentes, os rótulos que acompanham o ponto 3D (funcionam no Short e no longo) e o carregamento das texturas. Foi extraído do Short.
- Em `PangeiaLongo.tsx`:
  - as fábricas `G` (globo móvel) e `SS` (supercontinente pronto), com câmera de A até B, rótulos e luz que acompanha a câmera (`solDe`);
  - `Boneco` (silhueta que anda);
  - `Palmeira`;
  - `Dedo` (unha);
  - `Servidores` (supercomputador);
  - `Bicho`;
  - `relevo()` (dorsal, dunas, colinas, serra e costa).

## Lições
- Com uma luz fixa, os globos vistos do lado da Ásia e do Pacífico ficavam no escuro. Agora a luz vem de perto da câmera.
- Na revisão com `--every-nth-frame` aparecem quadros pretos soltos. Confira o render final com `blackdetect` e refaça só os trechos com problema.
