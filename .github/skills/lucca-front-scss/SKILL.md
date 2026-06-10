---
name: lucca-front-scss
description: Authoring SCSS for the Lucca Front design system. Covers class naming conventions, modifiers, states, file structure, logical properties, and highlight-prisme registration. Use when writing or editing SCSS for Lucca Front components, QA stories styling, or registering new components.
---

## Rules

1. **Angular over HTML** — use `<lu-*>` components in stories, not raw CSS classes
2. **Class structure** — `.componentClass-descendantClass` mirrors DOM: `.numericBadge-value`, `.indexTable-body-row`
3. **Low specificity** — `.header-menu-logo` not `.header .menu .logo`
4. **Modifiers** — `.mod-<name>` always paired with base class, never standalone — `.mod-S`, `.mod-compact`
5. **States** — `.is-<name>` always paired with base class — `.is-loading`, `.is-disabled`
6. **Media queries in context** — inside their selector, not a separate section
7. **Nested override** — scope with parent class: `.parentComponent-action .button`
8. **Logical properties** — `inline-size` / `block-size` / `margin-inline-start`, never `width` / `height` / `margin-left`

## File structure per component

```
packages/scss/src/components/<componentName>/
├── component.scss   ← base styles
├── vars.scss        ← CSS custom properties
├── mods.scss        ← .mod-* variants
├── states.scss      ← .is-* states
└── exports.scss     ← re-exports mixins
```

## Class naming

- **Block**: camelCase — `.numericBadge`, `.indexTable`, `.activityFeed`
- **Descendant**: hyphen-separated — `.numericBadge-value`, `.indexTable-body-row`
- **Modifier**: `.mod-<name>` — `.mod-S`, `.mod-block`, `.mod-onlyIcon`
- **State**: `.is-<name>` — `.is-loading`, `.is-error`, `.is-disabled`
- **Palette**: `.palette-<name>` — `.palette-product`, `.palette-neutral`

## Registering a new component

When adding a new component, update `packages/scss/src/commons/utils/highlight-prisme.scss`:

1. Add its CSS class to **HTML COMPONENTS OUTSIDE** (or INSIDE if it renders inside a container)
2. Add its Angular selector to **ANGULAR COMPONENTS OUTSIDE** (or INSIDE)

Example for a new `progressStepper` component:
```scss
// HTML COMPONENTS OUTSIDE — Loaders section
.progressStepper,

// ANGULAR COMPONENTS OUTSIDE — Loaders section
lu-progress-stepper,
```

## CSS custom properties

Tokens follow the pattern `--pr-t-<category>-<property>` (e.g. `--pr-t-color-text`, `--pr-t-border-radius-100`).
Palette shades: `--palettes-<palette>-<shade>` (e.g. `--palettes-neutral-600`, `--palettes-product-500`).

## Quick checklist

- [ ] Class names are camelCase (block) with hyphen-separated descendants
- [ ] No physical properties — use logical equivalents
- [ ] `.mod-*` and `.is-*` classes never used standalone
- [ ] Media queries inside their selector block
- [ ] New component registered in `highlight-prisme.scss`
- [ ] Styles split across correct files (`vars`, `mods`, `states`, `component`)
