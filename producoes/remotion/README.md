# Remotion · motion graphics do canal

Motor de motion graphics adotado pelo dono em 23/10/2026, depois do teste com o lado-50. Ele substitui as cenas `mg:` do `pipeline/anim` quando o vídeo é de motion graphics (padrão 80% MG / 20% real). Cada cena é um componente React animado quadro a quadro, sincronizado com o `palavras.json` da narração.

## Uso rápido
```bash
cd producoes/remotion
npm ci                                       # uma vez por sessão
npx remotion studio                          # opcional: editor ao vivo no navegador
npx remotion still src/index.ts TodoMundoSumiu out/q.png --frame=120   # 1 quadro (storyboard)
./render.sh TodoMundoSumiu out/previa.mp4 --prévia                     # prévia 540p
./render.sh TodoMundoSumiu out/final.mp4                               # final 1080×1920, -14 LUFS
```
O `remotion.config.ts` já aponta para o Chromium da nuvem (`/opt/pw-browsers`). Não rode `playwright install`.

## Como fazer um vídeo novo
1. Gere a narração e os tempos das palavras com `pipeline/narrar.py` (edge-tts) ou `pipeline/narrar_el.py` (ElevenLabs). Use a voz que o dono pediu para aquele vídeo.
2. Copie `narracao.mp3` e o fundo/trilha para `public/<video>/`, e o `palavras.json` para `src/videos/<video>.palavras.json`.
3. Copie `src/videos/TodoMundoSumiu.tsx` para `src/videos/<Video>.tsx`. Depois:
   - troque `CORTES` pelos índices das palavras onde cada cena começa;
   - troque a lista `CENAS` pelas cenas do plano aprovado.
4. Registre a `<Composition>` em `src/Root.tsx`.
5. **Storyboard primeiro.** Use `npx remotion still` com 1 quadro por cena e monte uma folha com o ffmpeg (`tile`). Mande para o dono e só renderize depois do ok (regra das DIRETRIZES).
6. Vídeo real (os 20%): `<OffthreadVideo src={staticFile('<video>/clip.mp4')} />` dentro da `Sequence` da cena. Crédito discreto quando for material CC BY.

## Peças prontas no modelo (`TodoMundoSumiu.tsx`)
| Peça | O que faz |
|---|---|
| `Legenda` | Legenda palavra por palavra em blocos de até 3 palavras. A palavra falada fica em amarelo e dá um pulinho. |
| `Dia` | Selo fixo no canto que vira (DIA 1 → DIA 2). |
| `Titulo` | Título com as letras entrando uma a uma com mola. |
| `Globo` | Globo 3D de pontos girando. `some` apaga os pontos aos poucos; `ouro` muda a paleta. |
| `Estrada` | Estrada em perspectiva com as faixas correndo na velocidade dada. |
| `Entrada` | Entrada de cena com zoom curto e desfoque. |
| `Flash` | Flash branco no corte. |
| `Grao` | Granulado de filme. |
| `shake` | Tremor de câmera suave. |
| Glitch (cena `Mas`) | Faixas RGB e texto com separação de cor. |
| Cor | `saturate` global: quente antes da virada, dessaturado depois. |
| Som | Whoosh em cada corte, `hit` na virada, `tick` no contador e `boom` no clímax. Os efeitos ficam em `public/sfx`, gerados por `pipeline/sfx.py`. |

## Regras que continuam valendo
- Fluxo de aprovação das `DIRETRIZES.md`: roteiro → plano + storyboard → prévia → final.
- Entrega na Central igual a antes: cópia com menos de 19 MiB e legendas completas.
- Nada sensível ou gráfico (só estilizado), e nenhum fato inventado.
- Licença do Remotion: gratuita para pessoa física e empresas de até 3 pessoas.
