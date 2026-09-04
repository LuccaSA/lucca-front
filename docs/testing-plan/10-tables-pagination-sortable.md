# Task 10 — Data table, index table, sortable list, pagination

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/data-table` — `lu-data-table` + body/row/cell directives
- `packages/ng/index-table` — index table row/components
- `packages/ng/sortable-list` — `lu-sortable-list` (drag-reorderable list)
- `packages/ng/pagination` — `lu-pagination`

Skip purely presentational aspects (column layout, styling). Only interactive behavior.

## Before writing

Read each entry point's source and existing specs/stories. For each component, first
enumerate its **outputs and interactive inputs** — those define what to test. If a
component turns out to have no interactive behavior (pure rendering), write nothing for it
and say so in your report.

## Behaviors to cover

Data table / index table (test only what the source actually implements):
- Sortable column headers: click toggles sort direction and emits the sort output with the
  right column/direction payload; `aria-sort` reflects state. Keyboard: header is a button
  (or focusable) and Enter/Space triggers the same sort.
- Row selection if implemented (checkbox column, row click): mouse click and Space on the
  row checkbox toggle selection; select-all header checkbox selects all rows and shows
  indeterminate for partial selection; the selection output emits the selected set.
- Row actions/expansion if implemented: mouse + Enter/Space parity.

Sortable list — mouse (Storybook play function; jsdom cannot do real drag):
- Dragging an item to a new position emits the reorder output with the correct
  from/to indices (CDK DragDrop-based, most likely — check; the test-runner's Playwright
  can do pointer sequences, or use the CDK drop-list events if the play API is too coarse).

Sortable list — keyboard (Jest, this is the important a11y path):
- Check the source for keyboard reordering support (grab with Space/Enter, move with
  arrows). If it exists, test the full cycle: grab → ArrowDown → drop → output emitted
  with new order. **If it does not exist, report it as an accessibility gap** in your
  final summary instead of inventing coverage.

Pagination:
- Clicking next/prev/a page number emits the page-change output with the correct page;
  current page is marked (`aria-current="page"` or equivalent).
- Prev is disabled on the first page, next on the last: clicks emit nothing.
- Keyboard: page controls are real buttons/links reachable by Tab and activated by
  Enter/Space (assert activation emits, not just focusability).
- Page-size selector if present: changing it emits the size output (it may reuse a select
  from task 01 — don't re-test the select itself, just the emitted wiring).

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/data-table packages/ng/index-table packages/ng/sortable-list packages/ng/pagination --isolatedModules=true`
