---
name: update-deprecated-doc
description: Regenerate docs/life-cycle.md from the LFDeprecatedSelectors.mjs / LFDeprecatedProperties.mjs source arrays (Composants, Classes, Variables CSS). Use whenever those sources change, or when asked to update / sync / rebuild / refresh the deprecation documentation.
---

# Update the deprecation doc

`docs/life-cycle.md` is **derived** from two sources — never edit it against
them:

1. [LFDeprecatedSelectors.mjs](../../../packages/stylelint-config/LFDeprecatedSelectors.mjs) → `## Composants` and `## Classes`
2. [LFDeprecatedProperties.mjs](../../../packages/stylelint-config/LFDeprecatedProperties.mjs) → `## Variables CSS`

It replaces the Prisme page [Cycle de vie des composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f).
The code wins over Prisme whenever they disagree.

`.mjs` entry shape:

```js
{
  name: 'Checkbox',                  // optional, see Composants below
  objectPattern: /regex/ | [/regex/, ...] | 'string', // optional with a name
  versionDeprecated: '17.3.0',       // optional
  versionDeleted: '19.1.0',          // optional
  actions: `markdown string`,        // optional
  urls: {                           // optional
    prisme: 'https://…',             // Composants only
    schematics: 'https://…',
  },
}
```

## Workflow

1. Run `node .claude/skills/update-deprecated-doc/scripts/generate.mjs` from the repository root.
   - It rewrites the three sections and keeps everything above them.
   - It derives simple *Nom* cells itself: up to 10 plain items, no comment label.
   - It keeps every agent-written *Nom* cell, tagged `<td data-pattern="…">` with the entry's first regex source.
   - It lists the cells to write and exits with code 1 when a tagged cell is missing.
2. Write each listed cell in place of its TODO comment, following the *Nom* conventions below.
   - Translate comment labels into French.
   - Run the script again: it must exit with code 0.
## Output format

Title, reference link, one `<style>` block (before the first section), then the
three `##` sections: Composants, Classes, Variables CSS. Each section: heading, `Source :` line
(its `.mjs` as an absolute GitHub blob URL on `master`, never relative), and an HTML `<table>` — never a Markdown
table. All tables share the same `<thead>`, kept from Prisme's headers:

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
  - A line that only repeats the *Nom* goes away.
  - A list of targets follows a `Remplacer par :` line.
  - One name with several targets ends its line with the arrow.
    - A sub-list of `label : value` items follows.
  - A `*` legend such as `` `*` = `--components-tag` `` follows the examples.
  - "Remplacer par" appears at most once per action.
  - No list item starts with "Remplacer".
  - A no-break space precedes `:`.
- **All doc text is French**, labels and qualifiers included.
  - Component names never get translated: *Data table* stays *Data table*.
- **Empty cells: en dash `–`** (U+2013); never the em dash `—`, anywhere.
  Schematics-only entry → just the `(schematics)` link.
- **An entry with a `name` deprecates a whole component: it goes to *Composants*, not *Classes*.**
  - The `name` is plain text: the component name, alphanumeric only.
  - `urls.prisme` links it to the Prisme page of the deprecated component.
  - It carries no `Deprecated` prefix: the whole table lists deprecations.
  - Entries sharing a `name` share the row.
  - One root class per pattern follows the name: its shortest form, such as `.status`.
  - A single root sits inline after the name, behind a comma: `List, .list`.
  - Every root links to one search of all the row's patterns.
  - Its pattern covers only the CSS hooks exclusive to deprecated code: its element and the classes nothing else emits.
  - A deprecated Angular component can share its CSS with a live one: check every emitter of a class before matching it.
    - `LuModal` in side panel mode still emits the `.lu-sidepanel-*` classes of the deprecated Side panel.
  - An element selector opens with `(?<![\w.#-])`: classes and ids then stay out.
  - A component without such a hook has no entry: the `.mjs` files hold selectors only.
- **A component without a CSS hook comes from its Angular `@deprecated` marker**, which the script reads in `packages/ng`.
  - The marker follows one convention: `@deprecated since X.Y.Z, replaced by Symbol.`
  - An `@see` line gives the Prisme page of the deprecated component: it names the row and links it.
  - The action cites the symbol as code: "Remplacer par `PopoverDirective`."
  - Classes sharing a page share the row, which takes the earliest version.
  - The version is the release carrying the first live replacement when the code offered none before.
    - Without one, the release in which the last live LF component left it, sourced by its PR.
  - Prisme's past releases serve as a fallback: `https://prisme.lucca.io/94310e217/v/<release>/p/<page>.md`.
- **`Nom` for Classes / Variables CSS: a `<ul>` with one `<li><code>…</code></li>` per item, never prose.**
  - Qualifiers like `(partout dans un sélecteur)` follow the `</ul>`.
  - A cell with a single item takes no list, in every column: the script unwraps it.
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
  - A class searches as a selector or as a `class` attribute token: `(\.|class="([^"]*\s)?)name`.
    - The bare word would match any identifier: `list` or `label` for example.
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
- **Historical entries are kept.** The `.mjs` files (and therefore Classes /
  Variables CSS) retain deprecations whose deletion already shipped; Prisme
  prunes those. This divergence is **by design** — don't flag or "fix" it. The
  doc intro carries a note explaining it — keep it verbatim, and never pin a
  version number in it (it would go stale):

  > **Note :** contrairement à la page Prisme, les tables *Classes* et
  > *Variables CSS* conservent les dépréciations dont la suppression est
  > effective. Prisme purge les entrées une fois la suppression livrée ; le
  > linter (et cette page) les conserve pour signaler l'usage résiduel.
- **A class used in LF HTML for structural consistency without SCSS is not a deprecation.**
  - Its rule may not exist while the component template emits it.
  - It gets no entry.
  - It is not dead markup either.

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

Source : [LFDeprecatedSelectors.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedSelectors.mjs)

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
