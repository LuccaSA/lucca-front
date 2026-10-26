---
name: update-deprecated-doc
description: Regenerate docs/life-cycle.md and docs/life-cycle-deleted.md from the LFDeprecatedSelectors.mjs / LFDeprecatedProperties.mjs / LFDeprecatedScss.mjs source arrays (Composants, Classes, Variables CSS, Mixins). Use whenever those sources change, or when asked to update / sync / rebuild / refresh the deprecation documentation.
---

# Update the deprecation doc

`docs/life-cycle.md` and `docs/life-cycle-deleted.md` are derived: never edit them against their sources.

* Sources:
	* [LFDeprecatedSelectors.mjs](../../../packages/stylelint-config/LFDeprecatedSelectors.mjs) feeds *Composants* and *Classes*.
	* [LFDeprecatedProperties.mjs](../../../packages/stylelint-config/LFDeprecatedProperties.mjs) feeds *Variables CSS*.
	* [LFDeprecatedScss.mjs](../../../packages/stylelint-config/LFDeprecatedScss.mjs) feeds *Composants* and *Mixins*.
		* It holds SCSS APIs: mixins and stylesheet imports.
		* Stylelint does not read it: only the doc does.
	* The Angular `@deprecated` markers of `packages/ng` feed *Composants*.
* The doc replaces the Prisme page [Cycle de vie des composants](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/95175f).
* The code wins over Prisme whenever they disagree.

## Workflow

1. Run `node .claude/skills/update-deprecated-doc/scripts/generate.mjs` from the repository root.
	* It rewrites the sections and keeps the header above them.
	* A section without rows is left out.
	* It derives every cell from the sources: nothing in the doc is written by hand.
2. Review the doc diff.
	* A wrong cell gets fixed in its source: a label, an `actions` text or a pattern.

## `.mjs` entries

```js
{
	name: 'Checkbox', // optional, see Composants below
	objectPattern: /regex/ | [/regex/, ...] | 'string', // optional with a name
	versionDeprecated: '17.3.0', // optional
	versionDeleted: '19.1.0', // optional
	actions: `markdown string`, // optional
	urls: {
		// optional
		prisme: 'https://…', // Composants only
		schematics: 'https://github.com/LuccaSA/lucca-front/tree/master/packages/ng/schematics/…',
	},
}
```

* Stylelint reports the first matching entry: the order is precedence.
* The selectors file holds three sections, each opened by its comment and a `// ====` line:
	1. The entries sorted by version.
	2. The deprecated components, after the entries targeting their children.
	3. The `.u-` catch-all, last.
* A modifier or state class gets a combination with its component: `.button.disabled` instead of `.disabled`.
* A number lists only the values LF shipped, never `\d+`.
	* Download the release package from `https://registry.npmjs.org/@lucca-front/scss/-/scss-<version>.tgz`.
	* Search its `package/dist/lucca-front.min.css` file for the class.
* `Auto` opens a choice of values: `(Auto|0|25|50|…)`.
* The properties file holds the sorted section only.
* Sort key:
	1. `versionDeprecated`, or `versionDeleted` without it.
	2. `versionDeleted`.
	3. Source order, versionless entries last.
* `// SEE <url>.` comments cite the sources.
	* The regex101 fixture.
	* The code.
	* The commit.
* A comment inside an `objectPattern` array labels the patterns after it.
	* It is doc content: French Markdown.
	* The script renders it as a `<p>` before the list of its patterns.
	* A label with no pattern after it renders alone.

## Composants

* An entry with a `name` deprecates a whole component: it goes to *Composants*, not *Classes*.
	* A whole component renamed stays a component: View tabs became Segmented control.
	* The `name` is plain text: the component name, alphanumeric only.
	* It carries no `Deprecated` prefix: the whole table lists deprecations.
	* `urls.prisme` links it to the Prisme page of the deprecated component.
	* Entries sharing a `name` share the row.
* Its pattern covers only the CSS hooks exclusive to deprecated code: its element and the classes nothing live emits.
	* A deprecated Angular component can share its CSS with a live one: check every emitter of a class before matching it.
	* `LuModal` in side panel mode still emits the `.lu-sidepanel-*` classes of the deprecated Side panel.
	* An element selector opens with `(?<![\w.#="'-])`: classes, ids and attribute values stay out.
	* A class root lists its real children from the component SCSS: `\.list(-(item|item-content))?(?![\w-])`.
		* A `\b` ending would also match a consumer's own `.list-custom`.
* The row shows one root class per pattern: its shortest form, such as `.status`.
	* A single root sits inline after the name, behind a comma: `List, .list`.
	* Every root links to one search of all the row's patterns.
* A component without such a hook has no `.mjs` entry: its Angular marker feeds the row.
	* The marker reads `@deprecated since X.Y.Z; use Symbol` and ends with a period.
		* Two replacements read `use A or B`.
		* A required call reads `` use A with `call()` ``: the action adds "avec" and the call as code.
		* Extra guidance follows on the next line, such as a directive to add.
	* An `@see` line gives the Prisme page of the deprecated component: it names and links the row.
		* A row whose `urls.prisme` matches that page takes the marker, whatever its name.
		* A component without a Prisme page omits `@see`: the generator skips its marker.
	* The action reads "Remplacer par" followed by the symbol as code.
	* Classes sharing a page share the row, which takes the earliest version.
* Version sources, in order:
	1. The release carrying the first live replacement, when the code offered none before.
	2. The release in which the last live LF component left it, sourced by its PR.
	3. Prisme's past releases: `https://prisme.lucca.io/94310e217/v/<release>/p/<page>.md`.

## *Nom* cells of Classes and Variables CSS

* The script builds each cell in Markdown and renders it with `marked`: [nom.mjs](scripts/nom.mjs) derives the items.
* A `<ul>` holds one item per token, never prose.
* A cell with a single item takes no list, in every column: the script unwraps it.
* A qualifier is a label, kept only when the tokens don't already say it.
	* "Utilitaires renommés très utilisés" stays: no token shows how much it is used.
	* "Utilitaires de taille" goes: `.u-text(S|XS|M|L|…)` shows it.
* Expansion of a pattern:
	* Choices expand into separate items.
	* Character classes and counted repeats expand too: `X{1,2}[SL]` gives four sizes from `XS` to `XXL`.
	* A number repeat shows as `(1|2|3|4|…)`.
	* What can't be listed shows as `…`: `.u-elevate…`.
	* An optional unknown suffix ending a token shows as `…`: `.menu… .label`.
	* An optional unknown elsewhere keeps both forms: `--palettes-text` and `--palettes-…-text`.
	* A pattern without an end guard ends with `…`: `.grid\@mediaMin…`.
* Grouping:
	* A choice of variants always stays grouped: `.u-margin(Top|Right|Bottom|Left)(Auto|0|XS|XL|…)`.
		* A variant choice suffixes a word: `margin(Top|Left)`.
		* A choice of values of 8 characters or fewer is one too: `.(indexT|t)able`.
	* A choice of distinct names expands: `--components-priorityLevels-font` then `-gap`.
		* Over 8 characters, a value starting with a dash names a segment: `-dot-important` expands.
	* Past 10 items, the choice that cuts the most items also groups.
		* The step repeats until 10 items or fewer remain.
	* Some choices never group:
		* A choice of branches.
		* A single option.
		* An empty option.
		* A number or an unknown part.
	* Past 10 items across the patterns of a group, each pattern groups as far as it can.
	* Still past 10 tokens, their varying middle groups: `.pr-u-text(Cc|Kiwi|Lime|Mint|…)`.
* Cropping grouped values, in source order:
	* Keep 4 values.
	* Stop at 2 once values exceed 6 characters: `.pr-u-text(Primary|Product|…)`.
	* When the first two values exceed 8 characters, sort shortest first with ties alphabetical: `.pr-u-text(AI|Cc|Kiwi|Lime|…)`.
* Items sort alphabetically, which puts each core before its variants: `margin(…)` before `marginBlock(…)`.
* A lookahead combination gets one item per combination.
	* Its two tokens join with a bold plus sign.

## Search links

* Each *Nom* token links to a GitHub code search of the org, lucca-front excluded.
* The search is a regex without lookaround: token boundaries become `(^|[^\w-])` and `([^\w-]|$)`.
* A class searches as a selector or a `class` attribute token: `(\.|class="([^"]*\s)?)name`.
	* The bare word would match any identifier, such as `list` or `label`.
* A combination searches both tokens with `AND`.
* A cropped item (`…`) searches the entry's own patterns.

## Actions

* `marked` converts the `actions` Markdown to HTML.
* A `*` legend opens the action as its own paragraph: ``Avec `*` = … :``.
* `urls.schematics` opens the cell on its own line: `<a href="…"><strong>Schematic</strong> : palettes</a>`.
	* The name is the one `collection.json` registers for the linked folder.
	* It links the schematic folder on GitHub: Prisme drops its anchors on load.
	* Link a schematic only when its code rewrites the entry's exact classes or variables.
* Writing rules, in French Markdown:
	* Show only the part that changes.
	* `*` stands for the unchanged prefix or suffix: `.u-*` becomes `.pr-u-*`.
	* A leading `*` only when every item of the action shares one prefix: write full names otherwise.
	* Names sharing a target group their varying part: `.icon-color-(primary|secondary)` becomes `.icon-color-product`.
	* Mappings use `⇒` as their arrow.
	* A list holding a mapping over 40 characters breaks every mapping after its arrow.
		* The arrow line ends with a Markdown hard break, written `\\` in the template literal.
		* The new value starts the next line, indented by two spaces.
	* One name with several targets ends its line with the arrow.
		* A sub-list of `label : value` items follows.
	* A list of targets follows a `Remplacer par :` line.
	* "Remplacer par" appears at most once per action.
	* No list item starts with "Remplacer".
	* A line that only repeats the *Nom* goes away.
	* A list with a single item becomes a plain line.
	* A `*` legend such as `` `*` = `--components-tag` `` follows the examples.
	* Code-only items take no final period.
	* Sentences keep their final period.
	* A no-break space precedes `:`.

## Doc rules

* All doc text is French, labels and qualifiers included.
	* Component names stay untranslated: *Data table* stays *Data table*.
* Empty cells hold an en dash `–` (U+2013), never the em dash.
	* A schematics-only entry shows just its schematic link.
* One row per source object: a merged object stays one row, structured by its comment labels.
* Rows run oldest first in every table.
	* The primary key is *Depuis*.
	* *Suppression* breaks ties.
	* Rows without any version come last.
	* The deleted doc swaps the keys: *Suppression* first, *Depuis* breaking ties.
* Entries whose deletion shipped go to `docs/life-cycle-deleted.md`, with the same tables.
	* "Shipped" means at or below the latest stable tag reachable from `HEAD`.
	* The `.mjs` files keep them: the linter still flags residual use.
	* Prisme drops them: this divergence is by design.
* Each doc's intro note links to the other one: keep it free of version numbers.

* A class emitted by LF HTML for structural consistency without SCSS is not a deprecation.
	* Its rule may not exist while the component template emits it.
	* It gets no entry.
	* It is not dead markup either.

## Output format

* A title, an intro note and one `<style>` block come before the first section.
* Each section holds three parts:
	1. A heading.
	2. A `Source :` line.
	3. An HTML `<table>`, never a Markdown table.
* Source links are absolute GitHub blob URLs on `master`.
	* Each line cites only the sources of its rows, in a fixed order.
	* *Composants* can mix `.mjs` files and the `packages/ng` markers.
* All tables share one `<thead>`, kept from Prisme:
	1. *Nom*: the component, or the `objectPattern`.
	2. *Depuis*: `versionDeprecated`.
	3. *Suppression*: `versionDeleted`.
	4. *Action à réaliser*: `actions` and `urls`.
* Widths come from the `<style>` block: no `<colgroup>`, no inline `style`.
* GitHub strips `<style>`: widths render only in viewers that honor it, such as the VSCode preview or Prisme.
	* GitHub auto-sizes the columns instead.

```html
<style>
  table {
    table-layout: fixed !important;
  }

  table thead th:last-of-type {
    inline-size: 39% !important;
  }

  table :is(th, td):is(:nth-child(2), :nth-child(3)) {
    text-align: center !important;
  }

  td > :is(ol, ul) {
    list-style-position: outside !important;
    padding-inline-start: 0.5rem !important;
  }
</style>
```

```html
## Composants

Sources : [LFDeprecatedSelectors.mjs](https://github.com/LuccaSA/lucca-front/blob/master/packages/stylelint-config/LFDeprecatedSelectors.mjs) et les marqueurs `@deprecated` de [packages/ng](https://github.com/LuccaSA/lucca-front/tree/master/packages/ng)

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
