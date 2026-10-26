#!/usr/bin/env bash
# Inventory of the deprecated Lucca Front selects in an Angular front.
# usage: inventory.sh <front-src-dir>   (e.g. front/src/app)
set -euo pipefail
ROOT="${1:-src/app}"
# BSD grep with --include skips a missing root and exits 1, which would read as "no match".
[ -d "$ROOT" ] || { echo "inventory.sh: $ROOT: not a directory" >&2; exit 2; }

# grep exits 1 on no match: treat it as an empty result, keep real errors (2+) fatal.
g() { grep "$@" || [ $? -eq 1 ]; }

echo "== deprecated imports (file: count)"
g -rEl "@lucca-front/ng/(select|option|api|department|establishment|user/select)['/]" "$ROOT" --include='*.ts' \
  | while read -r f; do printf '%s: %s\n' "$f" "$(g -cE "@lucca-front/ng/(select|option|api|department|establishment|user/select)['/]" "$f")"; done | sort

echo
echo "== deprecated elements per template (external .html or inline in .ts)"
g -rEoh "<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select|lu-option-picker(-advanced)?|lu-option-select-all|lu-api-paged-searcher)\b" "$ROOT" --include='*.html' --include='*.ts' \
  | sort | uniq -c | sort -rn
echo
g -rEl "<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select)\b" "$ROOT" --include='*.html' --include='*.ts' | sort

echo
echo "== home-made wrappers around a deprecated select (component selector -> file)"
g -rEl "<(lu-select|lu-api-select|lu-user-select|lu-establishment-select|lu-option-picker)" "$ROOT" --include='*.html' \
  | while read -r h; do t="${h%.html}.ts"; if [ -f "$t" ]; then g -oE "selector: *'[^']+'" "$t" | sed "s#^#$t: #"; fi; done | sort -u

echo
echo "== byte-identical duplicates among touched templates/ts (migrate one, copy the diff)"
g -rEl "<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select)\b|@lucca-front/ng/(select|option|api|department|establishment|user/select)['/]" "$ROOT" --include='*.html' --include='*.ts' \
  | while IFS= read -r f; do printf '%s %s\n' "$(cksum < "$f" | tr ' ' '-')" "$f"; done | sort | awk '{h=$1; $1=""; sub(/^ *?/,""); if (h==prev) print prevf " == " $0; prev=h; prevf=$0}'
