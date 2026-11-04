# box

## 2026-10-20 — Box disclosure built on details / summary, without hx

Status: accepted · PR #5562

**Context** — `lu-box-disclosure` folds the content of a box under a clickable title, like `callout-disclosure`.

**Decision** — It is built on `<details>` / `<summary>`, with no `hx` input: the title is not exposed as a heading.

**Consequences** — Native keyboard behaviour and open state come for free; the title of a disclosure does not appear in the heading outline.

**Rejected options** — Two ways of keeping a heading:

- A heading inside the `<summary>`: its semantics are not consistently exposed to screen readers.
- A custom disclosure (button inside a heading): more code to maintain, and a gap with `callout-disclosure`.

**Sources** — On headings inside a summary:

- S. O’Hara, [details summary](https://www.scottohara.me/blog/2022/09/12/details-summary.html) (2022).

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

## 2026-11-02 — Box title exposed as a heading, level 2 by default

Status: accepted · PR #5562

**Context** — The box title must be a heading whose level is set by an input on the component root, since a box can sit anywhere in the page outline.

**Decision** — The title is a `div` with `role="heading"` and `aria-level` bound to `hx`, which defaults to 2.

**Consequences** — The level changes without changing the markup, and the default is the one a heading gets without `aria-level`. This differs from `empty-state-section` (`hx`) and `resource-card` (`headingLevel`), which default to 3.

**Rejected options** — Two alternatives:

- `h1`…`h6` elements: the template would need one branch per level to follow the input.
- No heading by default (`hx = null`): tried, then dropped, since a box title is a section title.

**Sources** — The fallback value of `aria-level`:

- W3C, [WAI-ARIA 1.2, Handling Author Errors](https://www.w3.org/TR/wai-aria-1.2/#document-handling_author-errors_states-properties) (2023): `heading` falls back to `aria-level` 2.

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
