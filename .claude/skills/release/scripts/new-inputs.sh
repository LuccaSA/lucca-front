#!/usr/bin/env bash
# Lists the Angular inputs/models added between two refs: "<name>\t<file>", one per line.
# An input already declared with the same name in the same file at <from> is skipped
# (modified line, not a new input).
# Usage: bash new-inputs.sh <from> <to>   (e.g. v22.1.0 origin/release/22.2)
set -euo pipefail
FROM=$1
TO=$2

git diff -U0 "$FROM..$TO" -- packages/ng packages/prisme ':!**/*.spec.ts' ':!**/stories/**' ':!**/schematics/**' \
	| awk '/^\+\+\+ /{ f = substr($0, 7) } /^\+[^+]/ && /=[[:space:]]*(input|model)(\.required)?[<(]/{ print f "\t" $0 }' \
	| while IFS=$'\t' read -r file line; do
		name=$(printf '%s' "$line" | sed -E 's/^.*[^A-Za-z0-9_]([A-Za-z_][A-Za-z0-9_]*)[[:space:]]*=[[:space:]]*(input|model).*/\1/')
		git show "$FROM:$file" 2>/dev/null | grep -qE "[^A-Za-z0-9_]$name[[:space:]]*=[[:space:]]*(input|model)" \
			|| printf '%s\t%s\n' "$name" "$file"
	done \
	| sort -u
