#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-dev}"

npm ci
npm run setup:katex

if [[ "$MODE" == "publish" ]]; then
  npm run validate:publish
else
  npm run validate
fi

npm run generate-og
npm run build-related
npm run build
npm run pagefind
npm run check-links
