# Task 01 — Simple select & multi select

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/simple-select` — `LuSimpleSelectInputComponent` (`lu-simple-select`)
- `packages/ng/multi-select` — `LuMultiSelectInputComponent` (`lu-multi-select`) and its
  displayer/counter sub-components
- Shared behavior lives in `packages/ng/core-select` (do **not** test core-select directly;
  test it through the two public components)

**Out of scope**: the deprecated `ALuSimpleSelectApiDirective` / `LuSimpleSelectApiV4Directive`
aliases in `packages/ng/simple-select/api/`; the legacy `select` entry point; API-backed
directives (grouped data sources are fine to use as fixtures, HTTP directives are not the
subject here).

## Before writing

1. Read `packages/ng/core-select/input/select-input.component.spec.ts` — there is an
   existing **shared test-suite factory** `runALuSelectInputComponentTestSuite(...)`.
   Extend this factory for behaviors common to both selects; put component-specific tests
   in each component's own spec.
2. Read existing specs and stories:
   `packages/ng/simple-select/**/*.spec.ts`, `packages/ng/multi-select/**/*.spec.ts`,
   `stories/documentation/forms/select/*.stories.ts` (several already have play functions —
   list them and do not duplicate).
3. Read both components' templates to get the real roles/testids (the trigger is a
   `combobox`, the panel a `listbox` with `option` children).

## Behaviors to cover (Jest, via the shared factory where common)

Mouse — both selects:
- Click on the trigger opens the panel; click again closes it.
- Click on an option: simple select sets the FormControl to that entity and closes the
  panel; multi select toggles the entity in the array value and keeps the panel open.
- Click on the clearer (when `clearable`) resets to the empty value (`null` / `[]`) and
  does not open the panel.
- Click outside the open panel closes it without changing the value.
- Disabled select: click opens nothing, value unchanged.

Keyboard — both selects:
- ArrowDown/ArrowUp on the closed trigger opens the panel (an existing test covers
  ArrowDown-opens — check before adding).
- Arrow keys move the active option (assert via `aria-activedescendant` or the visually
  active option's attribute, whichever the template exposes).
- Enter selects the active option (simple: sets value + closes; multi: toggles, stays open).
- Escape closes the panel without changing the value and returns focus to the trigger.
- Tab from the open combobox: panel closes, value untouched.
- Typing in the search input (when a searcher/clue is enabled) filters options; check the
  source for the clue input/output name and assert the filtered option list.

Multi select specific:
- Selected values render as chips/displayers in the trigger; clicking a chip's remove
  affordance removes only that entity from the value.
- The "select all" behavior if the component or an official directive provides one.

Forms contract (both, per conventions): value updates, `writeValue`, `disable()`,
`touched` on blur, clearing to empty value.

## Storybook play functions (real browser)

Only where jsdom lies: panel positioning is not testable here — skip it. Add/extend play
stories in `stories/documentation/forms/select/` for: focus returning to the combobox after
Escape and after option selection (already partially covered — extend, don't duplicate),
and multi-select chip removal via keyboard.

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/simple-select packages/ng/multi-select packages/ng/core-select --isolatedModules=true`
