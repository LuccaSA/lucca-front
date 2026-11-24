# range-selection

## 2026-11-06 — Shared logic in `core`, exported with the `ɵ` prefix

Status: accepted · PR #5437

**Context** — Range selection (⇧ Shift + click, or ⇧ Shift + Space) comes to three components: `lu-data-table`, `lu-index-table` and `lu-approbation-inbox-list`.

**Decision** — A single implementation in `@lucca-front/ng/core`, exported with the `ɵ` prefix (internal):

- `ɵRangeSelection` holds the logic: remember the last clicked checkbox, compute the range, announce the number of items to screen readers.
- The `luRangeSelection` directive wires the checkbox of an item to the range selection of its container. It gets the item by injection, not through a template input.
- Each selectable item implements `ɵRangeSelectableItem` (state, selectable or not) and provides itself to its checkbox.

**Consequences** — The three components behave the same way, but other teams cannot rely on this code: the `ɵ` prefix guarantees no stability. Every selectable table and list gets the range selection, with no input to enable or disable it:

- a range emits a selection change for each item it changes, so a consumer calling an API on each change makes as many calls;
- a range clears the text selection of the page, which a ⇧ Shift + click would otherwise extend.

**Rejected options** — Two other ways to split the code:

- A copy per component: three behaviors to keep aligned, with the same Firefox workaround each time.
- A public API right away: a contract frozen before any usage feedback, where any change would be a breaking change.

**Revisit if** — A need comes up outside Lucca Front (another team, another list with checkboxes), or a consumer needs to disable the range selection.

## 2026-11-06 — Range limited to the displayed page and to selectable items

Status: accepted · PR #5437

**Context** — Between the last clicked checkbox and the one clicked with ⇧ Shift, some items should not change state, some are hidden in collapsed groups, and others are not in the DOM.

**Decision** — The range contains the selectable items of the displayed page:

- disabled items are skipped;
- items in collapsed groups are part of the range only when their group has a checkbox, which stands for them and previews their change: in `lu-approbation-inbox-list`, they are included; in `lu-data-table` and `lu-index-table`, whose groups have no checkbox, they are skipped;
- an anchor that became disabled or hidden in a collapsed group is ignored, its checkbox being out of use or out of sight: the next ⇧ Shift + click is a plain click;
- the range stops at rendered items, so at the displayed page;
- items are sorted in document order, whatever their registration order: it is the displayed order, whatever the sort, the insertions or the components wrapping the items.

**Consequences** — With `@for (…; track $index)`, items are reused from one page to the next and the last clicked checkbox stays remembered: after a page change, a range can start from the row at the same position, which now shows another item. The stories recommend tracking by id. In `lu-approbation-inbox-list`, a range can change requests the user does not see, through the checkbox of their group, and the announcement counts them. “Select all” changes hidden items in all three components: its label says it acts on everything.

**Rejected options** — Other ways to define the range:

- Always skipping the items of collapsed groups: in `lu-approbation-inbox-list`, the group checkbox is part of what the user sees between the two ends, and it previews the change of its items.
- Always including them: in tables, a range would change rows that nothing on screen stands for, without any preview.
- A range across pagination: it would require the consumer’s data model (ids, order, pages not loaded), which the components do not have.
- The order of Angular queries instead of the document order: it misses the items wrapped in a component of the consumer.

**Revisit if** — The components handle pagination themselves, or groups of rows get a checkbox in tables.

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

## 2026-11-24 — The range is previewed on the checkboxes while Shift is held

Status: accepted · PR #5437

**Context** — Nothing shows what a ⇧ Shift + click will change: after other clicks, it can change more items than expected.

**Decision** — While ⇧ Shift is held, the checkboxes that a click on the hovered or focused checkbox would change show their future state:

- the preview follows the last hovered or focused checkbox, in real time; hovering its table cell is enough;
- only the checkboxes whose state would change are marked, the anchor is not: it keeps its state;
- the checkboxes whose state follows the items preview it too, mixed state included: “Select all” and group checkboxes of `lu-approbation-inbox-list`, and “Select all” of the tables when the table manages it (`autoSelectAllOnPage`);
- a checkbox about to be checked shows a pale check (`product-100` background, `product-700` border), a checkbox about to be unchecked becomes an empty grey box (`neutral-100` background, `neutral-600` border): the borders keep a 3:1 contrast with the background;
- the preview only shows while the pointer or the focus is in the list.
- no preview in forced colors mode (Windows high contrast): the system colors erase the shades, and a checkbox about to be checked would look checked.

**Consequences** — The preview is visual only and not announced to screen readers: the range selection works without it. Disabled items are not marked, which shows that they are skipped. While going back with ⇧ Shift + Tab, the preview shows on the checkboxes and disappears on the links, where Space does not select. A checkbox about to be unchecked has the background of a checked disabled checkbox, but its dark border and the missing check set it apart, and the preview only shows on items the user has just seen enabled.

**Rejected options** — Other ways to show the range or its start:

- Showing the anchor alone, on its row or on its checkbox: it tells where the range starts, not what will change; on the row, it is also too close to the selected, hovered and current row states.
- Previewing the range on the rows: it shows the extent of the range, not the effect of the click, and it competes with the row states.
- Following the hovered or focused row: a click on the row does not toggle its checkbox, and opens the link covering it in `lu-index-table` and `lu-approbation-inbox-list`, so the preview would promise a result the click does not give.
- A grey check for an item about to be unchecked: a remaining check does not read as a future state.
- Showing it whenever Shift is held: typing a capital letter in a field elsewhere on the page would show it.
- Inverting each item of the range instead of giving it the state of the clicked one: it breaks the convention of file managers and mail clients, would undo the click made on the anchor, and gives a mixed result from a mixed range.

**Revisit if** — Users do not notice the preview, or design tokens are created for these states.

## 2026-11-24 — Groups start or end a range, “Select all” starts it from the first item

Status: accepted · PR #5437

**Context** — Some checkboxes act on several items at once: “Select all” in the three components, and the group checkboxes of `lu-approbation-inbox-list`. Groups of rows (`tbody`) in `lu-data-table` and `lu-index-table` have no checkbox.

**Decision** — These checkboxes take part in the range selection at their position in the list:

- the range covers a flat list in document order and goes across groups; the items of collapsed groups follow the rule of the entry “Range limited to the displayed page and to selectable items”;
- a group checkbox is an anchor or an end of the range at the position of its header: the items between the group and the other end take the new state, and the group checkbox changes its own items as usual;
- “Select all” has no position: after a click on it, the next ⇧ Shift + click starts the range from the first item. “Select all”, then ⇧ Shift + click on the fifth item, selects everything but the first five items;
- the state of these checkboxes follows the items.

**Consequences** — A range never starts from a click made before “Select all”. Downwards from a group, the items of the group are part of the range: unchecking a group, then checking an item further down with ⇧ Shift, checks the group again. The preview shows it before the click.

**Rejected options** — Other behaviors after a click on a group or “Select all” checkbox:

- Reset the anchor, so that the next ⇧ Shift + click is a plain click: safe, but “select all, then remove the first items” needs one more click, and a group cannot start a range.
- Keep the anchor on the last clicked item: the range would start from a click the user has moved on from, possibly far away or in another group.
- “Select all” as an end of the range: it already changes every item, a range would add nothing.

**Revisit if** — The preview shows that users are surprised by the items of the anchor group being part of the range.

## 2026-11-24 — Tables can manage “Select all” on the page

Status: accepted · PR #5437

**Context** — In `lu-data-table` and `lu-index-table`, the “Select all” checkbox of the head row is wired by the consumer, who binds `selected` and `mixed` with their own logic, sometimes across several pages. The tables do not know what it stands for, so they cannot preview its future state.

**Decision** — The `autoSelectAllOnPage` input of the head row lets the table manage it:

- its state follows all the rows of the page, groups collapsed and disabled rows included: checked, unchecked or mixed;
- a click unselects the enabled rows when they are all selected, and selects them otherwise; disabled rows never change;
- it is disabled when no row of the page is enabled;
- the table owns its state: the `selected` and `mixed` inputs of the head row are ignored, and the head row emits nothing;
- its future state is previewed while Shift is held.

**Consequences** — The common case needs no code anymore, and the preview of the head row is right by construction, as the same rule computes the state and the preview. The consumer listens to the rows only. When the enabled rows are all selected but a disabled one is not, a click on the mixed checkbox unselects them, where a mixed checkbox usually selects everything: selecting would change nothing. Without the input, nothing changes: the consumer keeps their logic and the head row is not previewed.

**Rejected options** — Other ways to preview the head row:

- Deducing its state from the rows of the page without an input: wrong when “Select all” acts on several pages, and a wrong preview undermines the whole preview.
- An input only declaring that the consumer’s logic follows the rows (`selectAllFollowsRows`): the consumer would still have to copy the rule exactly, disabled rows included.
- Exposing the future state of the rows to the consumer: a public contract on the internals of the range selection, and row identities the tables do not have.
- `autoSelectAll` or `selectAllPage`: the first one does not tell the scope, the second one also reads as “all pages”.
- A state following the enabled rows only: the checkbox would always match what its click does, but it would not sum up the page, unchecked while a disabled row is selected.
- Writing the state into the `selected` model of the head row: the head row would emit changes the user did not make, and a former `(selectedChange)` handler of the consumer would run along with the table.
- Hiding the checkbox when no row is enabled: an empty head cell, and a layout changing with the rows.

**Revisit if** — A consumer needs the preview with a “Select all” acting on several pages.
