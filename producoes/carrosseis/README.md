# Carrosséis do Instagram

Carrosséis 1080x1350 do @ladosombriodouniverso. Quem gera é o subagente `carrosseis` (`.claude/agents/carrosseis.md`), a partir dos roteiros aprovados do `roteirista`. O fluxo está em `../DIRETRIZES.md`, na seção "Carrosséis".

## Arquivos
| Caminho | O que é |
|---|---|
| `base.css` | Sistema visual da marca: cores, Montserrat, tamanhos, rodapé e barra de progresso |
| `base.js` | Coloca o rodapé (logo, @, contador, seta), o degradê e a barra de progresso em todo slide |
| `render.js` | Exporta cada `<section class="s">` em PNG 1080x1350 (renderiza em 2x e reduz) |
| `src/` | Imagens usadas (NASA, ESA, ESO, Pixabay), com crédito no slide |
| `<slug>/carrossel.html` | Um carrossel: um `<section class="s">` por slide |

## Novo carrossel
```bash
mkdir producoes/carrosseis/<slug>      # copie um carrossel.html existente como modelo
NODE_PATH=$(npm root -g) node producoes/carrosseis/render.js producoes/carrosseis/<slug>
# → output/<slug>/01.png, 02.png… e o texto do post em output/<slug>/LEGENDA.md
```

## Produzidos
| Carrossel | Design | Saída |
|---|---|---|
| 6 fatos do espaço que parecem mentira | `6_fatos/` | `output/6-fatos-do-espaco/` |
| 5 maneiras do mundo acabar | `5_fim/` | `output/5-maneiras-do-mundo-acabar/` |
| Esse asteroide tem 19% de chance… e NÃO existe (PDC27) ✅ aprovado | `pdc27/` | `output/pdc27/` |
