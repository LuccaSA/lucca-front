# legal-unit-establishment

## 2026-11-04 — Legal units fold their establishments behind a disclosure

Status: accepted

**Context** — A single multi-select has to list legal units and their establishments, so that a legal unit can be selected as a rule covering its future establishments. The guideline offers two renderings: establishments always visible under their legal unit, or folded behind a chevron.

**Decision** — Establishments are folded, following the combobox pattern with a tree popup. A legal-unit row is a `treeitem` that expands and collapses its own establishments, collapsed by default, and a search expands the legal units whose establishment matches the clue. The chevron is a mouse affordance only: the row itself carries `aria-expanded`, and the keyboard folds it.

**Consequences** — No disclosure exists anywhere in the select stack today, so this is net-new across three published entrypoints. `lu-listbox-option` gains `collapsable`, an `expanded` model and a decorative chevron; `lu-listbox` gains `collapsable`, under which an option with nothing to fold keeps an empty chevron slot, so every checkbox of a level lines up. The combobox announces its popup as a `tree` — departments included, which render one too — and the tree exposes its selection with `aria-selected` alone. Rows carry `aria-level`, `aria-posinset` and `aria-setsize`: establishments are fetched on unfold and legal units page by page, so assistive technologies cannot count them from the DOM. The keyboard follows the tree pattern, with the arrow keys left to the caret while a clue is typed: ArrowRight unfolds a row, then moves to its first child; ArrowLeft folds it, or moves from a child to its parent. `lu-simple-select` renders the same tree components for departments, so whatever changes in them reaches it too. Establishments are no longer loaded with the legal units, which is what makes the fetch decision below necessary.

**Rejected options** — Always-nested rendering needs no new primitive — `lu-multi-select` already renders a selectable, checkbox-bearing parent row with nested children for `departments` — but it loads every establishment of every legal unit up front, which is unusable for the organizations this field exists for. A listbox with groups cannot express this list: a listbox group neither expands nor gets selected, and a legal unit does both. A chevron rendered as a button with its own accessible name cannot be reached either: the focus never leaves the combobox, so that button stays out of keyboard reach, and it nests an interactive control inside a row.

**Sources** — [Guideline](https://app.notion.com/p/luccasoftware/Guideline-D-finir-un-p-rim-tre-fonctionnel-3dfd278ab26e808cbc6cc8c9fbedbfec) and [Spécifications — LegalUnitAndEtablishmentSelect](https://app.notion.com/p/40ed278ab26e80deade3c68e5e1dbd21) (Notion), [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) and [Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) patterns (WAI-ARIA APG).

## 2026-11-04 — Establishments fetched per legal unit, merged into the accumulated options

Status: accepted

**Context** — There is no combined endpoint and no establishment tree route, unlike departments: legal units and establishments are two independent collections of the Lucca API, each paginated by cursor and without a sort, joined only by the legal unit each establishment references.

**Decision** — Two calls, combined on the client. The legal-units call drives the top level, page by page as the list scrolls, and unfolding a legal unit fetches its establishments.

**Consequences** — The establishments of a legal unit are merged back into the accumulated option list rather than held in its row: the list a select accumulates is flat, and the hierarchy is only a view built over it. A legal unit is fetched once, however many times it is unfolded. Search needs a third query mode: it hits the establishments collection globally, then unfolds the legal units the matches belong to.

**Rejected options** — Holding each legal unit's establishments in its own row would have to make the tree generator reactive, which the select reads once when its panel opens. Asking the back end for a combined or tree-shaped route was not retained for this cycle.

## 2026-11-04 — No establishment count per legal unit, so no promotion to the rule

Status: superseded · see 2026-11-05, a rule shows its children checked

**Context** — Selecting every establishment of a legal unit should select the legal unit itself. That needs the number of establishments a legal unit holds, which no endpoint returns and no model carries; the only way today is to page through the whole legal unit.

**Decision** — Not implemented for now. The legal-unit checkbox carries three states derived from what is known locally: checked when the legal unit is selected as a rule, mixed when some of its establishments are selected, unchecked otherwise.

**Consequences** — A legal-unit row stays mixed even when every one of its establishments is checked, and promoting a complete set of establishments into the rule is out of scope, which a reviewer could otherwise read as a bug. The tri-state itself is unaffected: the count is only needed to promote a complete set of children into the rule, not to render a partial selection.

**Revisit if** — An endpoint or a model field exposes an establishment count per legal unit, or the back end gains the combined route set aside above.

## 2026-11-04 — The value is an object, and a mandatory field brings its own validator

Status: accepted

**Context** — A legal unit is a rule covering its future establishments and an establishment is an element covering only itself, so the published value has to tell the two apart. `lu-multi-select` publishes a flat `T[]` over a single option type.

**Decision** — The value becomes `{ legalUnits, establishments }`. A consumer that needs the field to be mandatory provides its own validator rather than relying on `Validators.required`.

**Consequences** — `Validators.required` silently passes on a plain object: Angular only treats `null` and an empty `length` or `size` as empty, so an empty selection validates while `lu-form-field` still shows the asterisk — hence the separate validator. `lu-multi-select` keeps working on a flat array internally: the directive only translates the two ends of the form-control contract, the value written in and the value published. It cannot be combined with `withSelectAll`, which rejects any value that is not an array: an incompatibility to document.

**Rejected options** — A discriminated-union array `(LegalUnit | Establishment)[]` keeps `Validators.required` working and the select untouched, needing only an option key that tells the two kinds apart — but it makes every consumer discriminate on each read.

## 2026-11-05 — A rule shows its children checked, and unchecking one breaks it

Status: accepted

**Context** — The specification settles two points: whether a legal unit ever follows from its establishments, and what clicking an establishment that a rule covers does.

**Decision** — Selecting a legal unit shows every establishment it holds as checked, without putting them in the value. Unchecking one breaks the rule: the legal unit leaves the selection and the establishments it covered enter it, the unchecked one excepted. A legal unit box stays empty while its establishments are checked one by one, however many of them are — there is no partial state.

**Consequences** — No tree renders a partially selected parent, departments included. `lu-listbox-option` keeps its `mixed` input, so a consumer can still bind it deliberately. A covered row stays active: the keyboard reaches it and Enter acts on it. Breaking a rule swaps two parts of the selection in a single update — the legal unit out, its other establishments in — rather than a selection followed by an unselection.

**Rejected options** — A covered row left inert makes a rule impossible to undo one establishment at a time, which the specification asks for. A partial box on the legal unit reads as a rule partly applied, which does not exist: the rule is set or it is not, and the establishments checked one by one are a separate fixed list. It could only be exposed through `aria-checked`, which VoiceOver does not announce on the active row of a combobox, while it does announce `aria-selected`.

**Sources** — [Spécifications — LegalUnitAndEtablishmentSelect](https://app.notion.com/p/40ed278ab26e80deade3c68e5e1dbd21) (Notion).

## 2026-11-05 — Unfolding is owned by the tree generator, not by the branch

Status: accepted

**Context** — The specification asks for three things a row cannot deliver on its own: an unfolded legal unit stays unfolded when the panel is closed and opened again, a row folded by hand during a search stays folded until the clue changes, and clearing a search gives every legal unit back the state it had before. A row is rebuilt every time the panel opens, so none of them survives there.

**Decision** — `TreeNode` carries `expanded`, which the tree generator fills from state it owns, and a row only reports what the user asks for. A generator that says nothing leaves the state to the chevron, kept in the row for as long as the panel lives, so a plain `[treeSelect]` keeps working.

**Consequences** — The directive holds the unfolded legal units, a snapshot of them taken when a search begins and given back when it ends, and two sets of children: everything a legal unit holds, kept across searches, and what the current clue matched, which a search shows alone. A match unfolds a legal unit by adding it to the same set, so folding that row by hand simply removes it and nothing puts it back until the next clue — the two search rules fall out of one mechanism. A state change shows only when the options change too, since that is when the select rebuilds its tree.

**Rejected options** — Keeping the state in the row and letting the generator force it open means a row can never be folded against a generator that wants it open, which is exactly what a search has to allow.

## 2026-11-23 — Everything between a tree and its rows is presentational

Status: accepted

**Context** — WebKit exposes a `tree` only when every element between it and each of its `treeitem` rows is a `treeitem`, a `group` or presentational. It checks once, when the tree is created, and keeps the answer: one element without a role, even for the time of a loading state, and VoiceOver reads every row as a plain group, without its expanded state, its position or its selection.

**Decision** — Every element the select stack renders inside a tree, around or between its rows, is a `treeitem`, a `group` or carries `role="presentation"` — the loading message of `lu-listbox` included, since it is in the tree from its first render.

**Consequences** — A component or a wrapper added inside a tree later has to follow the same rule, or the whole tree degrades again in Safari. The loading message keeps its text for screen readers: `presentation` only drops the semantics of a `span`, which has none.

**Sources** — [Tree View pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) (WAI-ARIA APG).
