#!/usr/bin/env bash
# Lists the Angular inputs/models added between two refs: "<name>\t<file>", one per line.
# Skipped when the same file at <from> already declares that name, either as an input()/model()
# (modified line) or as an @Input() (decorator-to-signal conversion: the binding is already published).
# Usage: bash new-inputs.sh <from> <to>   (e.g. v22.1.0 origin/release/22.2)
set -euo pipefail
FROM=$1
TO=$2

# Optional modifiers, then the property name, an optional type annotation (which may hold `=>`), then `= input|model`.
MODIFIERS='((public|protected|private|readonly|override|static)[[:space:]]+)*'
TYPE='(:([^=]|=>)*)?'

git diff -U0 "$FROM..$TO" -- packages/ng packages/prisme ':!**/*.spec.ts' ':!**/stories/**' ':!**/schematics/**' \
	| awk '/^\+\+\+ /{ f = substr($0, 7) } /^\+[^+]/ && /=[[:space:]]*(input|model)(\.required)?[<(]/{ print f "\t" substr($0, 2) }' \
	| while IFS=$'\t' read -r file line; do
		name=$(printf '%s' "$line" | sed -nE "s/^[[:space:]]*${MODIFIERS}([A-Za-z_\$][A-Za-z0-9_\$]*)[[:space:]]*[!?]?[[:space:]]*${TYPE}=[[:space:]]*(input|model).*/\3/p")
		# Not a property declaration (e.g. an assignment inside a function): nothing to report.
		[ -n "$name" ] || continue
		previous=$(git show "$FROM:$file" 2>/dev/null || true)
		printf '%s\n' "$previous" | grep -qE "^[[:space:]]*${MODIFIERS}${name}[[:space:]]*[!?]?[[:space:]]*${TYPE}=[[:space:]]*(input|model)" && continue
		# @Input() on the same line as the property or setter, or on the line above.
		printf '%s\n' "$previous" | grep -A1 -E '@Input\(' | grep -qE "(^|[^A-Za-z0-9_\$])(set[[:space:]]+)?${name}[[:space:]]*[!?]?[[:space:]]*[:=(;]" && continue
		printf '%s\t%s\n' "$name" "$file"
	done \
	| sort -u
