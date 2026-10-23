#!/usr/bin/env bash
# Uso: ./render.sh <Composicao> <saida.mp4> [--prévia]
# Renderiza e normaliza o áudio para -14 LUFS (padrão do canal). --prévia = 540p, marcado como PRÉVIA no nome.
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm ci --no-audit --no-fund
COMP=$1; SAIDA=$2; EXTRA=()
[ "${3:-}" = "--prévia" ] && EXTRA=(--scale=0.5)
TMP=$(mktemp -d)
npx remotion render src/index.ts "$COMP" "$TMP/bruto.mp4" --log=error "${EXTRA[@]}"
ffmpeg -v error -y -i "$TMP/bruto.mp4" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k "$SAIDA"
rm -rf "$TMP"
echo "ok: $SAIDA"
