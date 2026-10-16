# Canal dark de astronomia: produções

Shorts de 61 s (1080x1920, só voz) sobre espaço, montados automaticamente com material público da NASA, ESA/Hubble e Webb.

## Vídeos produzidos

| # | Tema | Documento de produção | Arquivo final |
|---|---|---|---|
| 01 | Queda num buraco negro (simulação da NASA) | [01_buraco_negro.md](01_buraco_negro.md) | `buraco_negro_61s.mp4` |
| 02 | Voyager 1 | [02_voyager1.md](02_voyager1.md) | `voyager1_61s.mp4` |
| 03 | HD 189733 b, o planeta onde chove vidro | [03_planeta_de_vidro.md](03_planeta_de_vidro.md) | `planeta_vidro_61s.mp4` |
| 06 | Estrela de nêutrons: um cubo de açúcar de 1 bilhão de toneladas | [06_estrela_de_neutrons.md](06_estrela_de_neutrons.md) | `short_estrela_neutrons_61s.mp4` |

Cada documento traz título, gancho, roteiro, divisão por cenas, prompts visuais, prompt de voz e checklist de retenção.
Os MP4 não ficam no git (são grandes). Eles são regerados pelo processo abaixo.

## Como produzir um vídeo novo

```bash
cd producoes/pipeline
pip install edge-tts                 # voz pt-BR-AntonioNeural (grátis)

# 1. Material: buscar e baixar para pipeline/src/
python3 svs.py "black hole"          # NASA Scientific Visualization Studio (busca)
python3 svs.py 14576                 # lista os MP4 de um item
python3 busca.py "voyager"           # vídeos da biblioteca NASA
python3 busca_img.py "pale blue dot" # imagens da biblioteca NASA
python3 baixar.py <nasa_id> src/nome.mp4
python3 baixar_img.py <nasa_id> src/nome.jpg

# 2. Roteiro e narração (ajusta a velocidade sozinho para caber em ~60 s)
mkdir -p ../videos/v4_tema && $EDITOR ../videos/v4_tema/roteiro.txt
python3 narrar.py ../videos/v4_tema 60.2 15

# 3. Cenas: copie um cenas.py existente e ajuste tempos e trechos,
#    usando palavras.json (tempo de cada palavra da narração)
python3 motor.py ../videos/v4_tema   # gera o MP4 de 61,0 s
```

Em ambientes com proxy, rode `narrar.py` com `SSL_CERT_FILE` apontando para o certificado do proxy.

### Opções de cada cena (`cenas.py`)

| Chave | Efeito |
|---|---|
| `t` | segundo em que a cena começa no vídeo final |
| `src`, `ss` | arquivo em `pipeline/src/` e segundo de início no original (imagens não usam `ss`) |
| `crop=(x, y, w, h)` | recorte no original antes do enquadramento vertical |
| `fit=1` | imagem inteira sobre fundo desfocado (fotos que não podem ser cortadas) |
| `zoom=(ini, fim)` | zoom contínuo (Ken Burns). Padrão `(1.07, 1.15)` |
| `pan=(x, y)` | ponto focal do enquadramento (0–1) |
| `punch=1` | zoom de impacto nos primeiros 0,3 s |
| `shake=px` | tremor de câmera |
| `flash=1` | flash branco no corte |
| `vel` | velocidade (0,5 = câmera lenta, 3 = acelerado) |
| `sat` | saturação (abaixo de 1 apaga as cores) |
| `chuva=1` | efeito de chuva de vidro horizontal (ilustração) |
| `circulo=1` | círculo de destaque no centro da tela |
| `tag` | etiqueta no topo: `real`, `sim`, `anim`, `ilus` |
| `texto` | texto de apoio grande no topo |
| `rgb=1` | glitch de aberração cromática nos primeiros 0,35 s do corte |
| `som` | efeito sonoro no corte: `"whoosh"`, `"boom"`, `"hit"`, `"riser"`, `"pulsar"`, `"tick"` ou `(nome, ganho_dB)` |

No topo do `cenas.py`, `AMBIENTE = "drone"` põe um fundo grave que abaixa sozinho sob a voz. Os sons são originais, sintetizados por `pipeline/sfx.py` (gerados na primeira montagem).

### Padrão do canal

- 61,0 s exatos, narração contínua, sem música, cortes a cada 2–3 s.
- Gancho em 0–3 s, contexto até 15 s, clímax até 45 s, escalada até 58 s, revelação final.
- Legendas palavra a palavra, com etiqueta honesta (imagem real × animação × ilustração).
- Só fatos checados em fonte primária. A checagem de cada vídeo fica no próprio documento.
- Créditos: material da NASA é de domínio público (sem sugerir endosso). ESA/Hubble e ESA/Webb são CC BY 4.0 e exigem crédito, que já aparece no rodapé do vídeo.
