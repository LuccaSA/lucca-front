# lucca-front — Interaction Testing Plan

A component-by-component testing plan for the non-deprecated parts of `@lucca-front/ng`.
Each numbered file in this folder is a **self-contained prompt** designed to be given to a
coding agent (including smaller models) as a single task.

## How to use

1. Always provide **two files** to the agent: `00-conventions.md` + one numbered task file.
   The conventions file is the shared preamble (stack, patterns, rules, definition of done);
   the task file is the scope.
2. Run one task file per agent/session. Task files are independent of each other and can run
   in parallel, **except** 01 must land before 08 (tree-select reuses the select test suite
   factory conventions).
3. Each task tells the agent to read the component source and existing tests first. Do not
   skip that step when relaying the prompt.

## Scope rules (already applied — do not re-litigate in tasks)

**Excluded as deprecated/legacy** (do not write tests for these entry points):
`api`*, `core`, `core-select` (tested indirectly via selects), `date`, `department`,
`dialog` legacy `LuModal*`, `divider`, `dropdown` (panel component is `@deprecated`,
replaced by the new menu approach), `empty-state`, `establishment`, `formly`, `input`,
`modal`, `number` (module), `option` (all of it), `popover` (v1), `popup`, `safe-content`,
`scroll`, `select` (legacy `lu-select`), `sidepanel`, `simple-select/api` directive aliases,
`title`, `toast` module (the `LuToastsComponent` itself is active), `tooltip` NgModules
(the directive/panel are active), `user` modules.

\* deprecated NgModules only — where a standalone component inside the entry point is not
deprecated, it stays in scope and is listed in a task file.

**Excluded as non-interactive** (no tests wanted — rendering-only components would only get
"it exists" tests, which this plan forbids): `icon`, `software-icon`, `bubble-icon`,
`bubble-illustration`, `skeleton`, `loading`, `status-badge`, `numeric-badge`, `new-badge`,
`tag`, `box`, `container`, `fancy-box`, `grid`, `footer`, `page-header`, `error-page`,
`code`, `highlight-text`, `highlight-data`, `resource-card`, `comment`, `activity-feed`,
`gauge`, `progress-bar`, `progress-stepper`, `inline-message`, `app-layout`/`main-layout`
(layout shells), `form-header`, `form-label`.

## Task files and priority

| # | File | Scope | Priority |
|---|------|-------|----------|
| 01 | `01-simple-multi-select.md` | `simple-select`, `multi-select` (shared core-select behavior) | P1 |
| 02 | `02-date2.md` | `date2`: date-input, date-range-input, calendar2 | P1 |
| 03 | `03-time.md` | `time`: time-picker, time-range-picker | P1 |
| 04 | `04-form-inputs.md` | `forms`: checkbox, radio-group, switch, number, phone-number, color, text, textarea + `number-format` directive + `form-field` wiring | P1 |
| 05 | `05-rich-text-multilanguage.md` | `forms`: rich-text-input, multilanguage-input | P2 |
| 06 | `06-dialog.md` | `dialog`: LuDialogService, dialog component, routing container | P1 |
| 07 | `07-popover2-tooltip.md` | `popover2`, `tooltip` (directive + panel) | P1 |
| 08 | `08-tree-select-listbox.md` | `tree-select`, `listbox` | P2 |
| 09 | `09-filter-pills.md` | `filter-pills`: filter-bar + pill types | P2 |
| 10 | `10-tables-pagination-sortable.md` | `data-table`, `index-table`, `sortable-list`, `pagination` | P2 |
| 11 | `11-navigation.md` | `breadcrumbs`, `segmented-control`, `segmented-control-tabs`, `horizontal-navigation`, `vertical-navigation` | P3 |
| 12 | `12-actions-feedback.md` | `button`, `chip`, `clear`, `toast` (LuToastsComponent), `callout` (disclosure + popover), `read-more`, `user-popover`, `impersonation`, `file-upload` (dropzone/entry, active parts) | P3 |

P1 = form controls and overlays with the richest mouse/keyboard contracts — highest
regression risk. P3 = simpler click/focus contracts.

## What "done" means for the whole plan

- Every in-scope interactive behavior has either a Jest spec (jsdom-compatible behavior) or
  a Storybook play-function test story (geometry/focus-trap/real-browser behavior), per the
  layer-selection rule in `00-conventions.md`.
- `npm run ci-test` passes; `npm run test-storybook` passes against a built Storybook.
- No test asserts mere existence, class names without behavior, or private component state.
