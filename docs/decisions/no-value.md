# no-value

## 2026-11-27 — A missing value is shown as an em dash

Status: accepted

**Context** — Missing values were shown with an en dash (–) in form fields and recommended as such in tables. In a column of numbers, a lone en dash reads like a minus sign: the en dash is also an accepted minus sign in spreadsheets, and has about the same width.

**Decision** — A missing value is shown as an em dash (—), everywhere: table cells, data presentation, form fields in presentation mode.

**Rejected options** — Two other marks and a word:

- En dash: mistaken for a minus sign in numeric columns.
- Figure dash (U+2012), the width of a digit: rare in fonts and unknown to most people.
- A word (“None”, “N/A”), preferred by the OQLF: heavier to scan in dense tables. The visually hidden text already gives a word to screen readers outside tables.

**Sources** — On marking a missing value in a table:

- Université Laval, [GDRM, Tiret cadratin](https://roberge.mus.ulaval.ca/gdrm/08-ponct.htm): “Le tiret cadratin sert à indiquer qu’un élément manque ou qu’il n’est pas pertinent dans un tableau ou une liste.”
- OQLF, [Banque de dépannage linguistique, Tiret : emplois divers](https://vitrinelinguistique.oqlf.gouv.qc.ca/bdl/gabarit_bdl.asp?Th=2&t1=&id=3376): the dash “peut également indiquer la nullité, dans un tableau”.
- M. Butterick, [Hyphens and dashes](https://practicaltypography.com/hyphens-and-dashes.html), Practical Typography: “An en dash makes an acceptable minus sign in spreadsheets”.

## 2026-11-27 — Screen reader text depends on whether the value is alone in a table cell

Status: accepted

**Context** — A missing value is displayed as an em dash hidden from screen readers. Outside a table, nothing is then announced, so a visually hidden text is needed. In a table cell, screen readers already announce an empty cell (“blank” with VoiceOver), so the same text would only repeat it on every empty cell.

**Decision** — `lu-no-value` finds out by itself whether it is the only accessible content of a table cell (`td`, `th`, or an element with an ARIA cell or header role, layout tables with `role="presentation"` or `role="none"` excepted) and adds the hidden text (“Not entered”) in every other case, including a cell with another text (“Manager: —”), an image alternative or a named control; content hidden with `aria-hidden` does not count. The `alt` input overrides this choice, in both directions: a more precise text (“No manager”), or an empty string to read nothing.

**Consequences** — The same `<lu-no-value />` fits everywhere, and the right behavior does not depend on the developer’s knowledge of screen readers. The detection relies on the rendered DOM, so it also works in tables written in plain HTML. The cell is checked once, after the component is rendered: content added to the same cell later is not taken into account, and `alt` forces the text in that case.

**Rejected options** — Other ways to choose the behavior:

- An option to set by hand: forgetting it outside a table means a missing value announced as nothing at all.
- Only checking for a cell, whatever its content: a cell with another text is not announced as empty, so the missing value would be silent.
- Watching the cell for later changes: an observer per empty cell, for a case the one value per column rule of tables already avoids.
- Only checking the direct parent: a wrapping element in the cell would add the hidden text to a cell that is announced as empty.
- A modifier on the cell that fills empty cells with a dash: some cells must stay truly empty (alert column, actions).

**Revisit if** — A screen reader is found that does not announce empty cells.

## 2026-11-27 — The component lives in `@lucca-front/ng`, not in `@lucca/prisme`

Status: accepted

**Context** — New design system components go to `@lucca/prisme`. But `lu-no-value` needs a translated default text, and `@lucca/prisme` has no translation mechanism.

**Decision** — The component is the `@lucca-front/ng/no-value` entrypoint, with its own translations.

**Rejected options** — Two ways to stay in `@lucca/prisme`:

- Adding translations to `@lucca/prisme`: a project of its own, beyond this component.
- No default text, `alt` required outside tables: the same risk of silence as an option to set by hand.

**Revisit if** — `@lucca/prisme` gets a translation mechanism.

## 2026-11-27 — Named `no-value`, with an `alt` input

Status: accepted

**Context** — The component serves table cells as well as data presentation and form fields in presentation mode.

**Decision** — It is named `no-value`, like the `noValue` input of `lu-data-presentation`, and its screen reader text is the `alt` input, like the other alternative texts of the library (`alt`, `iconAlt`, `buttonAlt`).

**Rejected options** — Other names considered:

- `empty-cell`: wrong outside tables.
- Anything with “empty”: already used by `empty-state` and by the `empty` input of tables, which mean a table with no data at all.
- `hiddenLabel` for the text: a boolean everywhere else in the library.
