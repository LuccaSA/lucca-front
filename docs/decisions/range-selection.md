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

## 2026-11-09 — Groups are not part of the range

Status: proposed · PR #5437

**Context** — The three components group their items: grouped `tbody` in `lu-data-table` and `lu-index-table`, `lu-approbation-inbox-list-group` in `lu-approbation-inbox-list`. Only the latter has a checkbox per group, which checks or unchecks the whole group.

**Decision** — Only items (rows, list items) take part in the range selection:

- the range covers a flat list in document order and goes across groups; collapsed groups are skipped;
- in `lu-approbation-inbox-list`, the group checkbox does not carry the directive: it is neither an anchor nor an end of the range, and clicking it does not move the anchor;
- the state of the group checkboxes and of “Select all” is computed from the items.

**Consequences** — After a click on a group checkbox, a ⇧ Shift + click starts from the last clicked *item*, which can be in another group. A ⇧ Shift + click on a group checkbox behaves like a plain click.

**Rejected options** — Two ways to make the group checkbox part of the range:

- The group checkbox as an anchor: it stands for several items, so the first or the last one would have to be picked depending on the direction of the range.
- A ⇧ Shift + click on the group checkbox extending the range to the end of the group: `ɵRangeSelectableItem` would have to support composite items.

**Revisit if** — Usage feedback shows that the anchor staying on an item after a group click confuses users.
