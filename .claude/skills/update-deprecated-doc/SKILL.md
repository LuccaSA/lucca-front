---
name: update-deprecated-doc
description: Regenerate docs/life-cycle.md from the Prisme "Cycle de vie des composants" page (Composants) and the LFDeprecatedSelectors.mjs / LFDeprecatedProperties.mjs source arrays (Classes, Variables CSS). Use whenever those sources change, or when asked to update / sync / rebuild / refresh the deprecation documentation.
---

# Update the deprecation doc

`docs/life-cycle.md` is **derived** from three sources — never edit it against
them:

1. [Cycle de vie des composants > Composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f) → `## Composants`
2. [LFDeprecatedSelectors.mjs](../../../packages/stylelint-config/LFDeprecatedSelectors.mjs) → `## Classes`
3. [LFDeprecatedProperties.mjs](../../../packages/stylelint-config/LFDeprecatedProperties.mjs) → `## Variables CSS`

`.mjs` entry shape:

```js
{
  objectPattern: /regex/ | [/regex/, ...] | 'string',
  versionDeprecated: '17.3.0',       // optional
  versionDeleted: '19.1.0',          // optional
  actions: `markdown string`,        // optional
  urls: { schematics: 'https://…' }, // optional
}
```

## Workflow

1. `git diff` the two `.mjs` files; edit the matching rows. Full rewrite only if
   the file is missing or entry order changed.
2. Verify: every `.mjs` entry has exactly one row, in source order.
3. To refresh **Composants** — ⚠ *temporary while this skill is under test; the
   data will later be fed directly as a local source, replacing this step* —
   fetch Prisme via its internal API (it's a zeroheight SPA; plain fetch returns
   an empty shell):

   ```bash
   curl -sc jar.txt "https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f" -o shell.html
   TOK=$(grep -oE '"token":"[A-Za-z0-9_-]+"' shell.html | head -1 | cut -d'"' -f4)
   CSRF=$(grep -oE 'name="csrf-token" content="[^"]+"' shell.html | cut -d'"' -f4)
   curl -sb jar.txt -X POST "https://prisme.lucca.io/api/load_page" \
     -H "Content-Type: application/json" -H "Authorization: Token token=\"$TOK\"" \
     -H "X-CSRF-Token: $CSRF" -d '{"id":4753501,"styleguide_id":77645}' -o page.json
   ```

   Tables are in `page.content_node.tabs["95175f"]` as a ProseMirror doc
   (`heading`/`table`/`tableRow`/`tableCell`; marks `link`/`code`/`strong`/`em`);
   take the table under the `Composants` heading.

## Output format

Title, reference link, one `<style>` block (before the first section), then the
three `##` sections in the order above. Each section: heading, `Source:` line
(Composants → the Prisme page; the others → their `.mjs` as an absolute GitHub
blob URL on `master`, never relative), and an HTML `<table>` — never a Markdown
table. All tables share the same `<thead>`, mirroring Prisme's headers:

`Nom` (component, or from `objectPattern`) | `Depuis` (`versionDeprecated`) |
`Suppression` (`versionDeleted`) | `Action à réaliser` (`actions` + `urls`).

## Conventions (match these exactly)

- **Widths via the `<style>` block** (`table-layout: fixed`, last `th` 39%) — no
  `<colgroup>`, no inline `style`.
- **`Action à réaliser`: `actions` markdown → HTML** — `` `code` `` → `<code>`,
  `[text](url)` → `<a>`, `*` lists → `<ul><li>`, blank-line paragraphs → `<p>`,
  `&` → `&amp;`. Append `urls.schematics` as `(<a href="…">schematics</a>)`.
- **Empty cells: en dash `–`** (U+2013); never the em dash `—`, anywhere.
  Schematics-only entry → just the `(schematics)` link. Prisme's `-` and
  `Non défini` both become `–`.
- **Composants mirrors Prisme** (as HTML): `Nom` stays inline (links, `<code>`),
  but normalize versions to semver (`19.2` → `19.2.0`) and correct obvious
  typos (e.g. Establishment, Data table, the Select schematics link →
  `…/b/15c256`) — flag them so Prisme can be fixed too.
- **`Nom` for Classes / Variables CSS: a `<ul>`, one `<li><code>…</code></li>`
  per item — never prose.** Qualifiers like `(2–3 digits)` follow the `</ul>`.
  - Expand alternations into separate items; drop glob prefixes
    (`X*(S|M|L)` → `S`, `M`, `L`); truncate non-enumerable tails with `…`
    (`.u-elevate…`).
  - Factor the trailing group when expansion exceeds 10 items (per
    comment-labeled group), prefixes enumerated:
    `.u-marginBottom(0|Auto|XXS|XS|…)`.
  - Also factor when >5 items differ by ≤3 chars:
    `--commons-elevations-elevation-(1|2|3|4|…)`, `.u-text(XS|S|M|L|…)`.
  - Crop factored sets in source order: 4 values, stop at 2 once values exceed
    6 chars (`.pr-u-text(Primary|Product|…)`); if the first two source values
    exceed 8 chars, sort shortest-first, ties alphabetical
    (`.pr-u-text(AI|Cc|Kiwi|Lime|…)`).
  - Family-sort repeating properties: shared core first, variants after,
    alphabetically — `gap, columnGap, rowGap, margin, marginBlock, …, padding, …`.
  - Lookahead "combined" patterns: one `<li>` per combination —
    `<code>.button</code> <strong>+</strong> <code>.mod-icon</code>`.
- **Comments inside an `objectPattern` array are content**: each becomes a
  markdown `<p>` (`**bold**` → `<strong>`, links → `<a>`) before the `<ul>` it
  labels; a standalone comment is a lone `<p>`.
- **One row per source object, in source order** — a merged object stays one
  row, structured by its comment labels.
- **Historical entries are kept.** The `.mjs` files (and therefore Classes /
  Variables CSS) retain deprecations whose deletion already shipped; Prisme
  prunes those. This divergence is **by design** — don't flag or "fix" it. The
  doc intro carries a note explaining it.

## Skeleton

```html
<style>
  table {
    table-layout: fixed !important;
  }

  table thead th:last-of-type {
    inline-size: 39% !important;
  }

  td > :is(ol, ul) {
    list-style-position: outside !important;
    padding-inline-start: 0.5rem !important;
  }
</style>
```

then, per section:

```html
## Composants

Source: [Cycle de vie des composants > Composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f)

<table>
	<thead>
		<tr>
			<th>Nom</th>
			<th>Depuis</th>
			<th>Suppression</th>
			<th>Action à réaliser</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>…</td><td>…</td><td>…</td><td>…</td>
		</tr>
	</tbody>
</table>
```

## Caveat

GitHub strips `<style>` and inline styles — widths only render in viewers that
honor them (VSCode preview, Prisme…); GitHub auto-sizes.
