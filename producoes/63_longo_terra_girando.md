# 63 · Longo POV "E SE A TERRA GIRASSE CADA VEZ MAIS RÁPIDO E NÃO PARASSE?" (lado-110)

Roteiro: `longo_terra_girando_rapido.md` (branch `claude/practical-cannon-ly7fw1`, commit d846de5), aprovado pelo dono em 13/11/2026. Publicar depois do Short (lado-109, doc 62).

## Ficha técnica
- **Composição:** `Girando`, em `src/videos/Girando.tsx`. Formato 1920x1080, 6:45, 83 cenas em Remotion 3D, nenhuma repetida.
- **Narração:** voz Brian (`--vel 1.1 --pausa 0.4`), 6:23 de fala, com 2,2 s antes de cada um dos 8 capítulos. Trilha original (`musica.py`, semente 109). Mixagem com ffmpeg (`scratchpad/mix_gir.py`).
- **Canto:** "O DIA DURA" com o valor e uma barra proporcional. A sequência é 24 H → 23H59 → 12 H → 6 H → 4 H → 3 H → 2 H → 1H24. Fica vermelho abaixo de 4 H e, no "Mas espera", cresce de volta até 24 H, em verde.
- **Cartão de capítulo:** a Terra atravessa a tela (wipe 3D), girando cada vez mais rápido, e calma no último.
- **Thumb:** "O DIA ENCURTA" + "VOCÊ FLUTUA!", com a Terra borrada de tanto girar, achatada, e uma silhueta flutuando no equador, com círculo e seta vermelhos. A cena é o Still `ThumbGirando`, e o texto entra depois com PIL.

## Peças novas (`Girando.tsx`, exportadas)
- `TerraGira`: Terra com achatamento, esticamento e rastros fantasma.
- `Balanca` e `Pesagem`: balança de banheiro com ponteiro, que vai de X kg a Y kg, em cenários diferentes.
- `Mostrador`: relógio genérico.
- `Faixa`: oceano no equador e fundo exposto nas latitudes altas.
- `Furacao`: espiral gerada em canvas.
- `Ovo`: Haumea com anel.
- `Copo` e `ISS`.
- `pesoMat`: shader por latitude, com polos pesados e meio leve.

## Lições
- Ao pausar um render com `kill -STOP`, retome TODOS os processos, inclusive o script que roda as partes (`render_gir.sh`). Um deles ficou parado e o render perdeu ~1 h sem trabalhar.
- O render concorrente com o Short deixa as duas coisas mais lentas. Priorize um de cada vez.
