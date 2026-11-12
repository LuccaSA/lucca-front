# ornament

## 2026-11-03 — Ornament extracted into its own component

Status: accepted · PR #5562

**Context** — The bubble + illustration combo is meant to be shared by several components, and Figma now has a dedicated component for it.

**Decision** — `lu-ornament` gets its own entrypoint and CDN folder (`visuals/ornament`). `lu-box` is its first consumer.

**Consequences** — `box` depends on `ornament` and `safe-content`: `HttpClient` is required as soon as a bubble is displayed.

**Rejected options** — Keeping the ornaments inside `box`: the code would be duplicated in the next consumer, and the gap with Figma would grow.

## 2026-11-03 — highlight-data does not use ornament yet

Status: deferred

**Context** — `lu-highlight-data` displays the same bubble + illustration combo, with its own markup and CDN paths.

**Decision** — It keeps its own implementation for now; moving it to `lu-ornament` is left for later.

**Consequences** — Two implementations of the same combo live side by side until then.

**Revisit if** — `highlight-data` is reworked, or one of the two implementations needs a fix the other also needs.
