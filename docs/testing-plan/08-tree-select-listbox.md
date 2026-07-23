# Task 08 — Tree select & Listbox

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.
**Prerequisite task**: 01 (select suite) should be merged first — reuse its patterns and,
where applicable, the shared `runALuSelectInputComponentTestSuite` factory.

## Scope

- `packages/ng/tree-select` — `LuTreeSelectDirective` (verify export list in
  `public-api.ts`; overlay-based hierarchical select)
- `packages/ng/listbox` — `LuListboxComponent` (`lu-listbox`)

**Out of scope**: legacy `option`/`tree-option` entry points (deprecated).

## Before writing

1. Read both sources: tree-select builds on core-select — identify what is tree-specific
   (expand/collapse, parent/child selection propagation) vs inherited (already covered by
   task 01; do not re-test inherited basics beyond one smoke path).
2. Read existing specs and stories (`stories/documentation/forms/tree-select*`,
   `stories/documentation/listbox*`) — list play functions before writing.
3. Get the real roles from the templates (`tree`/`treeitem` with `aria-expanded`, or
   listbox/option with `aria-level` — assert whichever pattern is implemented).

## Behaviors to cover

Tree select — mouse:
- Clicking a parent node's expander expands/collapses its children without selecting.
- Clicking a leaf selects it (single mode: sets value + closes; multi mode: toggles).
- Multi mode parent selection: does selecting a parent select all descendants? Read the
  source and assert the actual propagation, including the parent's indeterminate state
  when only some children are selected (if implemented).

Tree select — keyboard:
- ArrowUp/ArrowDown move through **visible** nodes only (collapsed children skipped).
- ArrowRight expands a collapsed parent / moves to first child if already expanded;
  ArrowLeft collapses / moves to parent — the standard tree pattern; verify against the
  implementation and test exactly what it handles.
- Enter/Space selects the active node; Escape closes without value change, focus returns
  to the trigger.
- Search/clue typing filters the tree; matching children keep their parents visible
  (assert the actual filtering semantics from the source).

Listbox — mouse:
- Click selects an option (and toggles in multi mode, if it has one — check).
- Disabled options are not selectable.

Listbox — keyboard:
- Arrow keys move the active option; Home/End jump to first/last (verify these are
  handled); Enter/Space select; type-ahead (first-letter jump) if implemented.
- Selection state exposed via `aria-selected`; active option via focus or
  `aria-activedescendant` — assert the mechanism used.

Forms contract per conventions for each CVA in scope (tree-select value type is
entity-or-array; listbox — check whether it's a CVA at all before assuming).

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/tree-select packages/ng/listbox --isolatedModules=true`
