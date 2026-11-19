# reorder

## 2026-11-18 — The handle is a component that renders its own button

Status: accepted · PR #5497

**Context** — The handle has to be a design system button (`luButton`), which brings its own style without relying on global CSS. But `luButton` is a component, and Angular refuses two components on the same element: a handle set as an attribute on a `<button>` cannot carry `luButton`.

**Decision** — `<lu-reorder-handle>` is an element that renders its own `luButton="ghost"` button and its icon. Dragging starts from this button. Two sizes: `S` (default) and `XS`.

**Consequences** — Consumers choose neither the icon nor the content of the button. They can set a class on the element to place it.

**Rejected options** — None of the other options fits:

- Handle as an attribute on a `<button>`, with the button classes copied by hand: it relies on the global button CSS and duplicates what `luButton` computes.
- Handle as a directive: a directive has no template, whereas the move menu is defined in the handle template.

## 2026-11-18 — Handle disabled when its item cannot move anywhere

Status: accepted · PR #5497

**Context** — An item alone in its list, with no connected list accepting it, cannot be moved.

**Decision** — The handle button gets a real `disabled`, and dragging with a pointer no longer starts from the handle.

**Consequences** — The handle leaves the tab order. Screen readers still announce it as a disabled button in browse mode.

**Rejected options** — `aria-disabled`, which keeps the handle focusable: a tab stop that leads nowhere, and dragging with a pointer was still possible.

## 2026-11-18 — Focus and announcement only for an applied move

Status: accepted · PR #5497

**Context** — After a move, the handle of the item gets the focus back and its new position is announced. But the app's `(luReorder)` handler is the one that moves the item: it may refuse the move, or only apply it after an API call.

**Decision** — On the next render, focus and announcement only happen if the item has moved: within its list, it is at its new position; to another list, it has left its own. Otherwise, nothing happens.

**Consequences** — A move applied later, asynchronously, is neither announced nor followed by the focus.

**Rejected options** — Waiting for the list to change to announce an asynchronous move: the list would have to be watched for an unknown time, with a point at which to give up.

**Revisit if** — Apps move their items after an API call and need the announcement.
