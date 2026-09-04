# Task 09 — Filter pills & filter bar

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/filter-pills` — `LuFilterBarComponent`, `LuFilterPillComponent`, and the
  pill-type directives/components exported from `public-api.ts` (enumerate them: there are
  typically select-pill, date-pill, checkbox-pill variants — list what actually exists).

## Before writing

1. Read `packages/ng/filter-pills/**/*.spec.ts` and
   `stories/documentation/filter-pills/*.stories.ts` (play functions likely exist — list
   them, extend rather than duplicate).
2. Pills wrap other in-scope components (selects, date inputs) inside a popover2-based
   panel. Do **not** re-test the inner components' behavior (tasks 01/02 own that); test
   the **pill layer**: open/close, value summary display, clearing, and the bar's
   composition behavior.

## Behaviors to cover

Pill — mouse:
- Clicking a pill opens its editing panel; choosing a value closes it (if the pill type
  auto-closes — assert per type) and the pill label reflects the chosen value summary.
- Clearing a pill (its clear affordance) empties the bound control and resets the label
  to the placeholder.
- Click outside the open panel closes it, keeping the previously committed value.

Pill — keyboard:
- Tab reaches each pill in the bar in order; Enter/Space opens the focused pill's panel.
- Escape closes the panel without committing in-progress changes (verify: does Escape
  revert or commit? assert the implemented semantics) and returns focus to the pill.
- A cleared/removed pill does not break the Tab sequence.

Filter bar:
- The bar renders one pill per configured filter and emits its combined filter
  value/output when any pill changes (check the output API in the source — this is the
  bar's core contract; assert emitted payloads precisely).
- "Additional filters" / overflow behavior if the bar has one (a "more filters" affordance
  is common — check): opening it by mouse and keyboard, and pills chosen from it join the bar.
- Resetting the bar (if a reset API/affordance exists) clears all pills and emits the
  empty state.

Forms/controls contract: pills bind to FormControls or an equivalent filter model — assert
values flow both ways (programmatic set updates pill labels).

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/filter-pills --isolatedModules=true`
