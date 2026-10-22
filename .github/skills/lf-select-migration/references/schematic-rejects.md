# What the `lu-select` schematic rejects, and the manual replacement

`npx ng g @lucca-front/ng:lu-select --dryRun --verbose` handles: `lu-select` → `lu-simple-select` /
`lu-multi-select` (+ `*luDisplayer` when it cannot prove the default displayer is enough),
`lu-api-select` → `apiV3` / `apiV4`, `lu-user-select` → `users`, `lu-establishment-select` →
`establishments`, and cleans the imports. Everything below is left in place with a
`<!-- [lu-select migration] REJECTED: … -->` comment.

| Reject | Why the schematic stops | Manual replacement |
|---|---|---|
| Any attribute outside the whitelist (`is-invalid`, `[class.x]`, `size`, `(open)`, `luFormField`…) | It cannot map arbitrary bindings | Move the select inside `lu-form-field` (size, label, error state come from it), drop legacy `textfield` classes, re-add the binding on the new component if it still exists in the DS API |
| `#ref="ngModel"` | Template reference on the directive | Keeps working on the new component (`ngModel` is standard); the schematic is just cautious |
| `lu-option-picker-advanced` with custom content (searchers, groups, pinned option) | Custom panel content has no 1:1 mapping | A directive on `lu-multi-select` implementing `ALuCoreSelectApiDirective` with `getOptions(params, page)`, `optionComparer`, `optionKey`; grouping via `select.groupingSignal.set({ selector, content })`; header via `select.panelHeaderTpl.set(Component)`; a pinned "me" option by prepending it in `getOptions` on page 0 |
| `lu-option-select-all` | Old select-all has no equivalent input | `withSelectAll` on `lu-multi-select`, control typed `LuMultiSelection<T>`, `totalCount` provider or `[totalCount]` input, resolve with `selectionToOptions()`; see feature-checklist.md |
| `lu-department-select` (tree) | Different widget | `lu-multi-select departments clearable` (values become `Department` objects; hydrate from ids against the loaded list) |
| Conditional `[multiple]="cond"` | Two components, not one input | Two selects under `@if`, or decide the mode per screen |
| `ALuEstablishmentService` override | Custom data source | `establishments` directive + `[filters]`; a currency/legal-unit display stays as a `*luDisplayer` / `*luOption` template |
| `lu-api-paged-searcher` / `prem-*-searcher` inside a picker | Legacy API v4 searcher | `apiV4="/…/api/…"` directive with `[filters]`, or the repo's own `ALuCoreSelectApiDirective` subclass when the endpoint is app-specific |

After the schematic, delete every generated `*luDisplayer` that only renders `option.name` (the
default already does) and run `npx ng g @lucca-front/ng:deprecated-resolver` for the deprecated
NgModules and types (`ILuEstablishment`, `ILuDepartment` → organization-structure models or the
core-select types).

## Panel templates (LF 21+/22)

`ALuSelectInputComponent` exposes `panelHeaderTpl` and `panelFooterTpl` as model signals. A
directive can set a component (`hostDirectives: [ɵCoreSelectPanelElement]` if it must be
keyboard-selectable) or a `TemplateRef`. **`lu-multi-select` never renders `panelFooterTpl`**, only
`lu-simple-select` does; a footer on a multi-select shows nothing. `lu-multi-select` grouping ships a
native per-group "select all / deselect all", so a legacy per-group checkbox is deleted, not ported.

## Verified in

`node_modules/@lucca-front/ng/fesm2022/lucca-front-ng-multi-select.mjs` (22.0.2 and 22.0.4): the `lu-multi-select` panel template renders `panelHeaderTpl` only; `lucca-front-ng-simple-select.mjs` renders both. Whitelist and REJECTED comment: `packages/ng/schematics/lu-select` on `LuccaSA/lucca-front` master, Sept 2026. Re-check on the installed version before relying on either.
