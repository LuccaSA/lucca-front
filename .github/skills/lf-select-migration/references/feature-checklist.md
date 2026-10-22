# Features the old pickers had, and the DS primitive that restores them

Walk this list for every migrated select. Compare with the screen on `main`, not with the template:
the old wrappers added behaviour the template does not show (search, select all, counters).

| Feature | Old form | New form |
|---|---|---|
| Select all | `lu-option-select-all`, `prem-select-multiple` | `withSelectAll` on `lu-multi-select`; control `FormControl<LuMultiSelection<T>>({ mode: 'none' })`; label via `[withSelectAllDisplayerLabel]="pluralLabel"` (renders `${count} ${label}`) or `[withSelectAllDisplayerLabelFn]="(count) => …"`; total via a directive implementing `CoreSelectApiTotalCountProvider` (`totalCount$`, provided under `CORE_SELECT_API_TOTAL_COUNT_PROVIDER`) or `[totalCount]="list.length"` on a static list. The header checkbox is checked when `mode === 'all'` or mixed, so a click from a partial selection clears; do not "fix" it. Resolve with `selectionToOptions` at the boundary (value-shapes.md) |
| Search on a custom multi displayer | free with `lu-option-picker` | The `*luMultiDisplayer` template must contain `<input type="text" luMultiSelectDisplayerInput />` (hidden with `pr-u-mask` while closed if the displayer shows a summary); without it the select is not searchable |
| Counter "N items" | custom badge in the displayer | `lu-multi-select-counter-displayer [label]="pluralLabel" [selected]="values"` inside `*luMultiDisplayer`; no custom badge |
| Former employees / archived toggle | searcher option | A panel header component: `select.panelHeaderTpl.set(ToggleComponent)`; the component injects the directive and sets a param; the directive's `params$` includes it. Since LF 22.0.4 a param change reloads the options on its own (before: 22.0.2 never consumed `paramsChange`, needed a restart helper) |
| Placeholder | shown | A bare `ngModel` gives `""`, which core-select treats as a selected value: initialise the model to `null`, keep `[placeholder]` |
| Size, label, required, error | `label.textfield mod-S mod-long` | `lu-form-field size="S" [label] hiddenLabel width="…"`; the legacy `textfield` wrappers only style the old component and freeze widths (205 px seen). The form-field shows the required star only on a control with a `required` validator |
| Group select-all | custom checkbox per group | Native on `lu-multi-select` grouping: delete the checkbox |
| Pinned "me" option with badge | custom `lu-option` above groups | Prepend it in `getOptions` on page 0; badge with `lu-numeric-badge` in `*luOption` |
| Load more (period lists) | buttons in the picker | `panelHeaderTpl` (future) + `panelFooterTpl` (past). Footer renders on `lu-simple-select` only |
| Clear | `clearable` | `clearable` (same) |
| Currency next to establishment | custom option template | `*luOption` / `*luDisplayer` on `establishments` with `[filters]="{ fields: 'id,name,legalUnit.currency' }"`; a dotted sub-field in `fields` (`legalUnit.currencyId`) 500s on the API, use the object |
| "Without X" synthetic option | directive prepending an option | Small directive on the DS directive that prepends `{ id: null, name }` on page 0 behind a boolean `input()` |
| Autofocus of the search | `paAutofocus` on the picker | Dropped: the DS focuses the clue input on open |

## Loss you cannot restore (as of LF 22.0.4)

- Select-all inside `lu-filter-pill`: the pill label is computed from the internal values and
  ignores the `withSelectAll` context (empty label in mode `all`, excluded count in mode `exclude`).
  Keep such screens without select-all and say so in the PR; open a DS issue.
- The `withSelectAll` displayer has no `min-inline-size: 0` and pushes the chevron out of a narrow
  field; one line in the shame stylesheet (`lu-multi-select-all-displayer { min-inline-size: 0 }`)
  until the DS ships it.

## Verified in

`lucca-front-ng-multi-select.mjs` 22.0.4: `LuMultiSelectAllDisplayerComponent` host styles are `display:block; inline-size:100%` (the counter displayer adds `min-inline-size:0`); the select-all header checkbox is checked when `mode === 'all'` or mixed; `LuMultiSelectWithSelectAllDirective` reads `CORE_SELECT_API_TOTAL_COUNT_PROVIDER` or `LuCoreSelectTotalCountDirective`. Filter-pill label from `valueLength()` in `lucca-front-ng-filter-pills.mjs` 22.0.2 and on master. Re-check on the installed version.
