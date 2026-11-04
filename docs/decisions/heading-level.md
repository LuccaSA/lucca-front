# heading-level

## 2026-11-04 — Heading inputs: headingLevel and headingStyle

Status: accepted

**Context** — Components that expose a title as a heading name its level `headingLevel`, `hx` or `level`, with different types and defaults.

**Decision** — Heading inputs follow one naming:

- `headingLevel`: aria level of the title, a number from 1 to 6; 3 by default in the page body, 1 for a component that heads the page (`empty-state-page`, `form-header`);
- `headingStyle`: visual size of the title when it differs from its level.

**Consequences** — `card` and `box` follow it. Published inputs get an alias and are deprecated:

- `hx` → `headingLevel`: `empty-state-section`, `empty-state-page`, `callout`;
- `level` → `headingLevel`: `vertical-navigation`;
- `hxStyle` → `headingStyle`: `empty-state-page`;
- `headingLevel` of `resource-card` becomes a number, its string values still accepted;
- exported types follow the same naming (`EmptyStateHeadingLevel`, `EmptyStateHeadingStyle`, `CalloutHeadingLevel`); the `Hx` names are deprecated aliases;
- removing the deprecated inputs, in a major version, comes with an `ng update` migration.

**Rejected options** — `hx` and `hxStyle`: shorter, but `headingLevel` and `headingStyle` are more explicit.
