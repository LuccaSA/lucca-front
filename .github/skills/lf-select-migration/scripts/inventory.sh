#!/usr/bin/env bash
# Inventory of the deprecated Lucca Front selects in an Angular front.
# usage: inventory.sh <front-src-dir>   (e.g. front/src/app)
set -euo pipefail
ROOT="${1:-src/app}"

echo "== deprecated imports (file: count)"
grep -rEl "@lucca-front/ng/(select|option|api|department|establishment|user/select)['/]" "$ROOT" --include='*.ts' \
  | while read -r f; do printf '%s: %s\n' "$f" "$(grep -cE "@lucca-front/ng/(select|option|api|department|establishment|user/select)['/]" "$f")"; done | sort

echo
echo "== deprecated elements per template"
grep -rEoh "<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select|lu-option-picker(-advanced)?|lu-option-select-all|lu-api-paged-searcher)\b" "$ROOT" --include='*.html' \
  | sort | uniq -c | sort -rn
echo
grep -rEl "<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select)\b" "$ROOT" --include='*.html' | sort

echo
echo "== home-made wrappers around a deprecated select (component selector -> file)"
grep -rEl "<(lu-select|lu-api-select|lu-user-select|lu-establishment-select|lu-option-picker)" "$ROOT" --include='*.html' \
  | while read -r h; do t="${h%.html}.ts"; [ -f "$t" ] && grep -oE "selector: *'[^']+'" "$t" | sed "s#^#$t: #"; done | sort -u

echo
echo "== byte-identical duplicates among touched templates/ts (migrate one, copy the diff)"
grep -rEl "<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select)\b|@lucca-front/ng/(select|option|api|department|establishment|user/select)['/]" "$ROOT" --include='*.html' --include='*.ts' \
  | xargs -d '\n' md5sum 2>/dev/null | sort | awk '{h=$1; $1=""; sub(/^ *?/,""); if (h==prev) print prevf " == " $0; prev=h; prevf=$0}'
