# dropdown

## 2026-11-17 — Keyboard shortcuts revealed on hover and focus

Status: accepted · PR #5497

**Context** — Dropdown actions can display their keyboard shortcut. Displayed on every line, shortcuts clutter the menu, whereas a shortcut only matters for the action about to be chosen.

**Decision** — On devices that can hover (`@media (hover: hover)`), the shortcut of an action only appears on hover or keyboard focus (`:focus-visible`) of that action. Elsewhere, shortcuts are always visible.

**Consequences** — The shortcut is hidden through its opacity: it keeps its space, the menu width does not change on hover, and screen readers still read it.

**Rejected options** — None of the other options fits:

- Revealing on hover only: keyboard users would never see the shortcuts.
- Hiding shortcuts on touch screens too: without hover, they would never appear, whereas a tablet may have a physical keyboard.
- Removing the shortcut from the layout (`display: none`): the menu would change width on hover.
