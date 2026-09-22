# Task 11 — Navigation components

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/segmented-control` — `lu-segmented-control`
- `packages/ng/segmented-control-tabs` — `lu-segmented-control-tabs`
- `packages/ng/breadcrumbs` — `lu-breadcrumbs`
- `packages/ng/horizontal-navigation`, `packages/ng/vertical-navigation`

## Before writing

Read each source and its stories. Distinguish two families: **value selectors** (segmented
control is likely a CVA or has a selection model) and **link containers** (breadcrumbs,
navigations render router links — their "interaction" is mostly link semantics plus any
collapse/overflow behavior). Enumerate outputs first; test only real behavior.

## Behaviors to cover

Segmented control (value selector):
- Click on a segment selects it: FormControl/output gets the segment's value, previous
  segment deselects, ARIA state updates (`aria-pressed`/`aria-checked`/`aria-selected` —
  assert the pattern used).
- Keyboard: the implemented pattern — either roving arrows (radio-like: arrows move+select,
  one tab stop) or tab-through buttons (Enter/Space selects). Read the source, assert
  exactly that pattern, including that the non-implemented alternative isn't half-present.
- Disabled segment: not selectable by mouse, skipped or inert for keyboard.
- CVA contract if it's a CVA (writeValue selects the right segment, disable, etc.).

Segmented control tabs:
- Same interaction checks as above, plus: selecting a tab shows the associated panel
  (assert panel content swap) and wires `role="tab"` / `aria-selected` /
  `aria-controls` → `role="tabpanel"` if implemented.

Breadcrumbs:
- Items render as links with correct hrefs (use RouterTestingHarness or provideRouter with
  test routes; assert navigation on click).
- Overflow/collapse behavior if implemented (an ellipsis item expanding hidden crumbs):
  mouse click and Enter both expand; hidden crumbs become reachable by Tab.
- The current page item is not a link (or is `aria-current="page"`) — assert the pattern.

Horizontal / vertical navigation:
- Active item tracking: the item matching the active route/value is marked
  (`aria-current` or active class-as-behavior).
- Expand/collapse of sub-sections (vertical nav commonly has collapsible groups): mouse
  click and Enter/Space parity; `aria-expanded` reflects state; collapsed children are
  removed from Tab order.
- Any overflow "more" menu in horizontal nav: open by mouse and keyboard, items inside
  are activatable.

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/segmented-control packages/ng/segmented-control-tabs packages/ng/breadcrumbs packages/ng/horizontal-navigation packages/ng/vertical-navigation --isolatedModules=true`
