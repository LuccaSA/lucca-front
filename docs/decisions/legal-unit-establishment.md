# legal-unit-establishment

## 2026-11-04 — Legal units fold their establishments behind a disclosure

Status: accepted

**Context** — A single multi-select has to list legal units and their establishments, so that a legal unit can be selected as a rule covering its future establishments. The guideline offers two renderings: establishments always visible under their legal unit, or folded behind a chevron.

**Decision** — Establishments are folded. A legal-unit row is a `treeitem` that expands and collapses its own establishments, collapsed by default, and a search expands the legal units whose establishment matches the clue.

**Consequences** — No disclosure exists anywhere in the select stack today, so this is net-new across three published entrypoints: `lu-listbox-option` gains an expanded state, a chevron, `aria-expanded` and the `aria-level` / `aria-setsize` / `aria-posinset` that a collapsible tree requires; `core-select`'s key manager gains ArrowRight / ArrowLeft, being vertical and Home/End only; `listboxOption` gains the matching states. `lu-simple-select` renders `lu-tree-branch simpleMode` for departments and shares those components, so its fallout has to be checked. Establishments are no longer loaded with the legal units, which is what makes the fetch decision below necessary.

**Rejected options** — Always-nested rendering needs no new primitive — `lu-tree-branch` already renders a selectable, checkbox-bearing parent row with nested children, shipping today for `departments` on `lu-multi-select`, and the `.mod-multiple` indentation reset is scoped to `[role='group']` so it does not fight a `treeitem` — but it loads every establishment of every legal unit up front, which is unusable for the organizations this field exists for.

**Sources** — [Guideline](https://app.notion.com/p/luccasoftware/Guideline-S-lection-d-unit-s-l-gales-et-tablissements-3ddd278ab26e80e1aeb8d26675efc059) (Notion), [#5540](https://github.com/LuccaSA/lucca-front/issues/5540).

## 2026-11-04 — Establishments fetched per legal unit, merged into the accumulated options

Status: accepted

**Context** — There is no combined endpoint and no establishment tree route, unlike departments: `/organization/structure/api/legal-units` and `/organization/structure/api/establishments` are two independent paginated collections, joined only by the `legalUnit` object each establishment embeds.

**Decision** — Two calls, combined on the client. The legal-units call drives the top level and expanding a legal unit fetches its establishments; `[establishments]` already issues that scoped request in `#getLegalUnitOptions`, which gains a `legalUnitId` input and a page-by-page form instead of recursing to exhaustion.

**Consequences** — Per-branch results are merged back into the accumulated option list rather than held in the branch, because the accumulator is a single array indexed by page number (`core-select/input/select-input.utils.ts:98-108`) and the hierarchy is only a pipe over that flat list (`multi-select/panel/panel.component.html:113-114`). Search needs a third query mode — hit the establishments endpoint globally, then expand the matching parents — and has to compose with the sort flip from `legalunit.name,name` to `name` that a non-empty clue already triggers (`core-select/establishment/establishments.directive.ts:79`, `:118-121`).

**Rejected options** — Owning branch state in the tree generator would mean signalising `select.treeGenerator`, a public field the panel snapshots at construction and feeds to `[tree]` (`core-select/input/select-input.component.ts:235`, `multi-select/panel/panel.component.ts:75`); making it reactive flips the listbox role mid-panel. Asking the back end for a combined or tree-shaped route was not retained for this cycle.

## 2026-11-04 — No establishment count per legal unit, so no promotion to the rule

Status: superseded · see 2026-11-05, a rule shows its children checked

**Context** — Selecting every establishment of a legal unit should select the legal unit itself. That needs the number of establishments a legal unit holds, which no endpoint returns and no model carries; the only way today is to page the whole legal unit at 20 per request.

**Decision** — Not implemented for now. The legal-unit checkbox carries three states derived from what is known locally: checked when the legal unit is selected as a rule, mixed when some of its establishments are selected, unchecked otherwise.

**Consequences** — A legal-unit row stays mixed even when every one of its establishments is checked, and the fourth key point of #5540 is out of scope — to be stated in the PR description, or a reviewer reads it as a bug. The tri-state itself is unaffected: the count is only needed to promote a complete set of children into the rule, not to render a partial selection. The `mixed` input and its states already exist on `lu-listbox-option`; only the forwarding from `lu-select-option` and the computation of "some but not all" are missing, `ɵIsSelectedStrategy.isGroupSelected` being boolean.

**Revisit if** — An endpoint or a model field exposes an establishment count per legal unit, or the back end gains the combined route set aside above.

## 2026-11-04 — The value is an object, and a mandatory field brings its own validator

Status: accepted

**Context** — A legal unit is a rule covering its future establishments and an establishment is an element covering only itself, so the published value has to tell the two apart. `lu-multi-select` publishes a flat `T[]` over a single option type.

**Decision** — The value becomes `{ legalUnits, establishments }`. A consumer that needs the field to be mandatory provides its own validator rather than relying on `Validators.required`.

**Consequences** — `Validators.required` silently passes on a plain object: Angular's `isEmptyInputValue` tests only `null` and `length`/`size`, so an empty selection validates while `lu-form-field` still shows the asterisk — hence the separate validator. Nine members of `lu-multi-select` assume an array (`multi-select/input/select-input.component.ts:117`, `:122`, `:128`, `:131`, `:132`, `:136`, `:212`, `:216`, plus the panel's `selectedOptions` mirror) and are rebound from the directive's constructor, the way `withSelectAll` rebinds ten without touching the shell (`multi-select/input/select-all/with-select-all.directive.ts:110-120`). The two directives become mutually exclusive, since `withSelectAll.writeValue` throws on array values (`:181-183`) and is already documented on `establishments` (`docs/multi-select-all.md:63`): an incompatibility to document.

**Rejected options** — A discriminated-union array `(LegalUnit | Establishment)[]` keeps `Validators.required` working and every array-assuming member intact, needing only a kind-aware `optionKey` the way `departments` already reconciles `TreeNode<T>` options with a `T` value — but it makes every consumer discriminate on each read.

## 2026-11-05 — A rule shows its children checked, and unchecking one breaks it

Status: accepted

**Context** — The specification was rewritten and settles the two points left open: whether a legal unit ever follows from its establishments, and what clicking an establishment that a rule covers does.

**Decision** — Selecting a legal unit shows every establishment it holds as checked, without putting them in the value. Unchecking one breaks the rule: the legal unit leaves the selection and the establishments it covered enter it, the unchecked one excepted. A legal unit box stays empty while its establishments are checked one by one, however many of them are — there is no partial state.

**Consequences** — The indeterminate state is dropped from the tree: `lu-tree-branch` no longer computes it, so no tree renders a partially selected parent — departments included, which had gained one as a side effect of the previous reading. The forwarding that makes `lu-listbox-option.mixed` reachable from a select is kept, so a consumer can still bind it deliberately. A covered row is no longer disabled: the key manager reaches it again and Enter acts on it. Breaking a rule swaps two parts of the selection in a single update, which `toggleOptions` cannot express — it selects or unselects, never both — so the panel of `lu-multi-select` gains `swapSelection`.

**Rejected options** — Leaving a covered row inert followed the earlier mock, which showed the children checked but said nothing about clicking them. It makes a rule impossible to undo one establishment at a time, which the specification now asks for.

**Sources** — [Spécifications — LegalUnitAndEtablishmentSelect](https://app.notion.com/p/luccasoftware/Guideline-S-lection-d-unit-s-l-gales-et-tablissements-3ddd278ab26e80e1aeb8d26675efc059) (Notion), [#5540](https://github.com/LuccaSA/lucca-front/issues/5540).

## 2026-11-05 — Unfolding is owned by the tree generator, not by the branch

Status: accepted

**Context** — The specification asks for three things a branch cannot deliver: an unfolded legal unit stays unfolded when the panel is closed and opened again, a row folded by hand during a search stays folded until the clue changes, and clearing a search gives every legal unit back the state it had before. A branch dies with the panel, so none of them survives there.

**Decision** — `TreeNode` carries `expanded`, which the generator fills from state it owns, and a branch only reports what the user asks through `optionExpandedChange$`. A generator that says nothing leaves the state to the chevron, kept in the branch for as long as the panel lives, so a plain `[treeSelect]` keeps working.

**Consequences** — The directive holds the unfolded ids, a snapshot of them taken when a search begins and given back when it ends, and two sets of children: everything a legal unit holds, cached across searches, and what the current clue matched, which a search shows alone. A match unfolds a legal unit by adding it to the same set, so folding that row by hand simply removes it and nothing puts it back until the next clue — the two search rules fall out of one mechanism. The panel is the only renderer that re-runs `generateTrees` on an option change, which is what makes a state change visible: a generator that changes its mind without the options changing would not repaint.

**Rejected options** — Keeping the state in the branch and forcing it from the generator (`forced || local`) was the first shape. A branch could then never be folded against a generator that wanted it open, which is exactly what a search has to allow.
