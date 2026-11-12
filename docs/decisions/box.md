# box

## 2026-11-02 — No dedicated wrapper, boxes are laid out with lu-grid

Status: accepted · PR #5562

**Context** — Boxes are often displayed side by side, in a set number of columns.

**Decision** — No `lu-box-wrapper`: boxes are laid out with `lu-grid` (`columns`, `gap`), whose default gap (`--pr-t-spacings-150`) matches the expected spacing.

**Consequences** — No extra public component to maintain, with a few limits:

- a responsive layout needs a `lu-grid-column` with a responsive `colspan` around each box;
- `lu-grid` columns are `1fr`: unbreakable content (a long URL) can widen a column;
- nothing passes settings (`size`, `theme`) down to the boxes of a set.

**Rejected options** — A `lu-box-wrapper` component, like `lu-resource-card-wrapper`: it was drafted with a `columns` input, but it only did what `lu-grid` already does.

**Revisit if** — Boxes of a set need shared settings (size, theme, layout tied to the box) that `lu-grid` cannot provide.

## 2026-11-02 — Box title exposed as a heading, level 3 by default

Status: accepted · PR #5562

**Context** — The box title must be a heading whose level is set by an input on the component root, since a box can sit anywhere in the page outline.

**Decision** — The title is a `div` with `role="heading"` and `aria-level` bound to `headingLevel`, which defaults to 3.

**Consequences** — The level changes without changing the markup, and the input follows `resource-card` (`headingLevel`, 3 by default).

**Rejected options** — Three alternatives:

- `h1`…`h6` elements: the template would need one branch per level to follow the input.
- No heading by default (`headingLevel = null`): tried, then dropped, since a box title is a section title.
- `hx`, 2 by default, the [fallback value of `aria-level`](https://www.w3.org/TR/wai-aria-1.2/#document-handling_author-errors_states-properties) for `heading`: dropped to align with `resource-card`.

## 2026-11-04 — No CSS class for the fancyWhite theme

Status: accepted · PR #5562

**Context** — `fancyWhite` is one of the six themes, but its background is the same as `white`.

**Decision** — `theme="fancyWhite"` adds no `mod-fancyWhite` class; it only enables the ornaments, like the other fancy themes.

**Rejected options** — An empty `mod-fancyWhite` class, for integrators to hook on: it would declare a class with no style.

**Revisit if** — `fancyWhite` gets a style of its own in Prisme.

## 2026-11-04 — Bubble icon of the header is decorative

Status: accepted · PR #5562

**Context** — `bubbleIcon` displays an icon in a bubble before the box title.

**Decision** — The icon is decorative: `lu-bubble-icon` gets no `alt`, which stays empty.

**Rejected options** — An `alt` input on the box: the icon adds no information to the title next to it.

## 2026-11-04 — Backward compatibility of raw HTML boxes

Status: deferred

**Context** — The rework adds a header and a `.box-slot` around the content. Raw HTML boxes, and the overrides of `--components-box-background`, predate it.

**Decision** — Two fallbacks are kept for now, with no removal planned for v23:

- a box without `.box-slot` keeps its block layout (`:has(.box-slot)` switches to flex);
- `--components-box-background` is still read before `--components-box-backgroundColor`.

**Consequences** — Existing HTML boxes and overrides keep working, at the cost of two code paths in the box layout and background.

**Revisit if** — A major version allows breaking raw HTML boxes, or the fallbacks get in the way of a box evolution.
