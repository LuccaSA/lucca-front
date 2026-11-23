# box-disclosure

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
