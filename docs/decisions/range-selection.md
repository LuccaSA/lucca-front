# range-selection

## 2026-11-06 — Shared logic in `core`, exported with the `ɵ` prefix

Status: accepted · PR #5437

**Context** — Range selection (⇧ Shift + click, or ⇧ Shift + Space) comes to three components: `lu-data-table`, `lu-index-table` and `lu-approbation-inbox-list`.

**Decision** — A single implementation in `@lucca-front/ng/core`, exported with the `ɵ` prefix (internal):

- `ɵRangeSelection` holds the logic: remember the last clicked checkbox, compute the range, announce the number of items to screen readers.
- The `luRangeSelection` directive wires the checkbox of an item to the range selection of its container.
- Each selectable item implements `ɵRangeSelectableItem` (state, DOM element, selectable or not).

**Consequences** — The three components behave the same way, but other teams cannot rely on this code: the `ɵ` prefix guarantees no stability.

**Rejected options** — Two other ways to split the code:

- A copy per component: three behaviors to keep aligned, with the same Firefox workaround each time.
- A public API right away: a contract frozen before any usage feedback, where any change would be a breaking change.

**Revisit if** — A need comes up outside Lucca Front (another team, another list with checkboxes).

## 2026-11-06 — Range limited to the displayed page and to selectable items

Status: accepted · PR #5437

**Context** — Between the last clicked checkbox and the one clicked with ⇧ Shift, some items should not change state, and others are not in the DOM.

**Decision** — The range only contains displayed and selectable items:

- disabled items and items in collapsed groups are skipped;
- the range stops at rendered items, so at the displayed page;
- items are sorted in document order, whatever their declaration order.

**Consequences** — With `@for (…; track $index)`, items are reused from one page to the next and the last clicked checkbox stays remembered: after a page change, a range can start from the row at the same position, which now shows another item. The stories recommend tracking by id.

**Rejected options** — A range across pagination: it would require the consumer’s data model (ids, order, pages not loaded), which the components do not have.

**Revisit if** — The components handle pagination themselves.

## 2026-11-09 — Groups and “Select all” reset the anchor

Status: accepted · PR #5437

**Context** — Some checkboxes act on several items at once: “Select all” in the three components, and the group checkboxes of `lu-approbation-inbox-list`. Groups of rows (`tbody`) in `lu-data-table` and `lu-index-table` have no checkbox.

**Decision** — Only items (rows, list items) take part in the range selection, and a checkbox acting on several items resets the anchor:

- the range covers a flat list in document order and goes across groups; collapsed groups are skipped;
- “Select all” and group checkboxes are neither an anchor nor an end of the range: clicking them resets the anchor, so the next ⇧ Shift + click is a plain click;
- the state of these checkboxes follows the items.

**Consequences** — A range never starts from a click made before a global action, which could select many items the user did not expect. After such an action, one plain click is needed before the next range.

**Rejected options** — Two other behaviors after a click on a group or “Select all” checkbox:

- Keep the anchor on the last clicked item: the range then starts from a click the user has moved on from, possibly far away or in another group.
- The group checkbox as an anchor (checking group A, then ⇧ Shift + clicking C2 selects from A to C2): more powerful, but the first or last item has to be picked depending on the direction, and “Select all” has no position.

**Revisit if** — Usage feedback asks for a range starting from a group.

## 2026-11-09 — The announcement counts the items that changed

Status: accepted · PR #5437

**Context** — After a range selection, screen readers announce a number of items. Counting the whole range was misleading: items already in the clicked state were counted as if they had just changed.

**Decision** — The announcement only counts the items whose state changed, the clicked one included, and describes an action, not a state:

- “You just selected 3 items” / “You just unselected 3 items”, in the active voice;
- no announcement when only the clicked item changed: its checkbox already announces it.

**Consequences** — The anchor is usually already in the clicked state, so the number is often one less than the visible range. The total of selected items is not announced.

**Rejected options** — Two other numbers to announce:

- The size of the range: it counts items that did not change.
- The total of selected items: the components only know the displayed page, so the total would be wrong when the consumer keeps the selection of other pages.

**Revisit if** — A component needs to announce its total selection: it would do it itself, with its own wording (for instance “requests” in `lu-approbation-inbox-list`).
