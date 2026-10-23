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

1. Run `node .claude/skills/update-deprecated-doc/scripts/generate.mjs` from the repository root.
   - It rewrites *Classes* and *Variables CSS* and keeps everything above them.
   - It derives simple *Nom* cells itself: up to 10 plain items, no comment label.
   - It keeps every agent-written *Nom* cell, tagged `<td data-pattern="…">` with the entry's first regex source.
   - It lists the cells to write and exits with code 1 when a tagged cell is missing.
2. Write each listed cell in place of its TODO comment, following the *Nom* conventions below.
   - Translate comment labels into French.
   - Run the script again: it must exit with code 0.
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
three `##` sections in the order above. Each section: heading, `Source :` line
(Composants → the Prisme page; the others → their `.mjs` as an absolute GitHub
blob URL on `master`, never relative), and an HTML `<table>` — never a Markdown
table. All tables share the same `<thead>`, mirroring Prisme's headers:

`Nom` (component, or from `objectPattern`) | `Depuis` (`versionDeprecated`) |
`Suppression` (`versionDeleted`) | `Action à réaliser` (`actions` + `urls`).

## Conventions (match these exactly)

- **Widths via the `<style>` block** (`table-layout: fixed`, last `th` 39%) — no
  `<colgroup>`, no inline `style`.
- **`Action à réaliser`: `marked` converts the `actions` Markdown to HTML.**
  - The script undoes the template-literal escapes first.
  - A `*` legend paragraph is wrapped in `<p><small>`.
  - `urls.schematics` always goes on its own line, as `(<a href="…">schematics</a>)`.
- **Writing `actions`** in the `.mjs` files, in French markdown:
  - Show only the part that changes.
  - `*` stands for the unchanged prefix or suffix.
    - Example: `.u-*` becomes `.pr-u-*`.
  - Code-only items take no final period.
  - Sentences keep their final period.
  - Mappings use `⇒` as their arrow.
  - A list holding a mapping over 40 characters breaks every mapping after its arrow.
  - The arrow line ends with a Markdown hard break: a backslash, written `\\` in the template literal.
  - The new value then starts the next line, indented by two spaces.
  - A list with a single item drops the list: the item becomes a plain line.
  - A line that only repeats the *Nom* goes away: the targets list stands alone.
  - One name with several targets ends its line with the arrow.
    - A sub-list of `label : value` items follows.
  - A `*` legend such as `` `*` = `--components-tag` `` follows the examples.
  - "Remplacer par" appears at most once per action.
  - No list item starts with "Remplacer".
  - A no-break space precedes `:`.
- **All doc text is French**, labels and qualifiers included.
  - Component names never get translated: *Data table* stays *Data table*.
- **Empty cells: en dash `–`** (U+2013); never the em dash `—`, anywhere.
  Schematics-only entry → just the `(schematics)` link. Prisme's `-` and
  `Non défini` both become `–`.
- **Composants mirrors Prisme** (as HTML): `Nom` stays inline (links, `<code>`),
  but normalize versions to semver (`19.2` → `19.2.0`) and correct obvious
  typos (e.g. Establishment, Data table, the Select schematics link →
  `…/b/15c256`) — flag them so Prisme can be fixed too.
- **`Nom` for Classes / Variables CSS: a `<ul>` with one `<li><code>…</code></li>` per item, never prose.**
  - Qualifiers like `(partout dans un sélecteur)` follow the `</ul>`.
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
- **Each `Nom` token links to a GitHub code search of the org, lucca-front excluded.**
  - The script adds the links: write hand-made cells without them.
  - The search is a regex: GitHub has no lookaround, so token boundaries become `(^|[^\w-])` and `([^\w-]|$)`.
  - A class searches without its `.`: markup writes `class="name"`.
  - A combination searches both tokens with `AND`.
  - A cropped item (`…`) searches the entry's own patterns.
- **Comments inside an `objectPattern` array are content**: each becomes a
  markdown `<p>` (`**bold**` → `<strong>`, links → `<a>`) before the `<ul>` it
  labels; a standalone comment is a lone `<p>`.
- **One row per source object**: a merged object stays one row, structured by its comment labels.
- **Rows run oldest first, in all three tables.**
  - The primary key is *Depuis*.
  - *Suppression* breaks ties.
  - Rows without any version come last.
  - The `.mjs` order never changes: Stylelint uses the first matching entry.
- **Rows whose deletion affects under 25% of the org's projects move to a collapsed table** under the main one.
  - The table sits in a `<details>` element, summarised `Suppressions jusqu’à la <collapseUpTo>`.
  - The threshold is `collapseUpTo` in the script.
  - Composants follows the same rule.
  - Refresh `collapseUpTo` on each run:
    1. List every org `package.json` pinning `@lucca-front/scss`, all result pages included:

       ```bash
       gh api -X GET search/code -H 'Accept: application/vnd.github.text-match+json' \
         -f q='"@lucca-front/scss" org:LuccaSA filename:package.json' -f per_page=100 --paginate \
         --jq '.items[] | [.repository.full_name, .path, ([.text_matches[]?.fragment] | join(" "))] | @tsv'
       ```

    2. Count one project per `package.json` with a pinned version, `lucca-front` excluded.
    3. Sort the pins oldest first.
    4. Set `collapseUpTo` to the pin at the 25th percentile, rounded up.
- **Historical entries are kept.** The `.mjs` files (and therefore Classes /
  Variables CSS) retain deprecations whose deletion already shipped; Prisme
  prunes those. This divergence is **by design** — don't flag or "fix" it. The
  doc intro carries a note explaining it — keep it verbatim, and never pin a
  version number in it (it would go stale):

  > **Note :** contrairement à la page Prisme, les tables *Classes* et
  > *Variables CSS* conservent les dépréciations dont la suppression est
  > effective. Prisme purge les entrées une fois la suppression livrée ; le
  > linter (et cette page) les conserve pour signaler l'usage résiduel.

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

Source : [Cycle de vie des composants > Composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f)

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
