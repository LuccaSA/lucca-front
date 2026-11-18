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
