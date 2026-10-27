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
* A choice lists its non-serial values first.
	* Its series follow, in order: `(Auto|0|25|50|…)`.
* The properties file holds the sorted section only.
* Sort key:
	1. `versionDeprecated`, or `versionDeleted` without it.
	2. `versionDeleted`.
	3. Source order, versionless entries last.
* `// SEE <url>.` comments cite the sources, in this order:
	1. The regex101 fixture.
	2. The release note declaring the deprecation, when one exists.
	3. The code, pinned at its deprecation commit.
	4. The deletion release note, commit or PR.
* A comment inside an `objectPattern` array labels the patterns after it.
	* It is doc content: French Markdown.
	* The script renders it as a `<p>` before the list of its patterns.
	* A label with no pattern after it renders alone.
	* A label stays only when the tokens don't already say it.
		* "Utilitaires renommés très utilisés" stays: no token shows how much it is used.
		* "Utilitaires de taille" goes: `.u-text(S|XS|M|L|…)` shows it.
* One source object makes one doc row: merge objects to merge rows.
* A class emitted by LF HTML for structural consistency without SCSS is not a deprecation.
	* Its rule may not exist while the component template emits it.
	* It gets no entry.
	* It is not dead markup either.
	* Ex: `.priorityLevel-label` has no rule, yet the Priority level template and its HTML stories emit it.

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
	1. The release note or commit declaring the deprecation, whichever shipped first.
	2. The release in which the last live LF component left it, sourced by its PR.
	3. Prisme's past releases: `https://prisme.lucca.io/94310e217/v/<release>/p/<page>.md`.

## Generated cells

* The scripts build every cell: read their code before changing a rule.
	* [nom.mjs](scripts/nom.mjs) expands, groups and crops the *Nom* tokens.
	* [links.mjs](scripts/links.mjs) links each token to a GitHub code search of the org.
	* [components.mjs](scripts/components.mjs) reads the Angular markers.
	* [generate.mjs](scripts/generate.mjs) renders the actions, sorts the rows and splits the deleted entries.

## Actions

* A `*` legend opens the action as its own paragraph.
	* It reads ``Avec `*` = `--components-tag` :``.
* `urls.schematics` links the schematic folder on GitHub: Prisme drops its anchors on load.
	* Link a schematic only when its code rewrites the entry's exact classes or variables.
* Writing rules, in French Markdown:
	* Show only the part that changes.
	* `*` stands for the unchanged prefix or suffix: `.u-*` becomes `.pr-u-*`.
	* A leading `*` only when every item of the action shares one prefix: write full names otherwise.
	* Names sharing a target group their varying part: `.icon-color-(primary|secondary)` becomes `.icon-color-product`.
	* Mappings use `⇒` as their arrow.
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
* Entries whose deletion shipped move to `docs/life-cycle-deleted.md`.
	* The `.mjs` files keep them: the linter still flags residual use.
	* Prisme drops them: this divergence is by design.
* Each doc's intro note links to the other one: keep it free of version numbers.

## Header

* The script keeps everything above the first section: the title, the intro note and the `<style>` block.
* GitHub strips `<style>`: widths render only in viewers that honor it, such as the VSCode preview or Prisme.
