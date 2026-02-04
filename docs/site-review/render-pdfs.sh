#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

while IFS= read -r -d '' file; do
  out="${file%.md}.pdf"
  TEXINPUTS="$ROOT_DIR/tex:" pandoc "$file" -o "$out" --pdf-engine=xelatex -V monofont=Menlo
done < <(find "$ROOT_DIR" -type f -name "*.md" -print0)
