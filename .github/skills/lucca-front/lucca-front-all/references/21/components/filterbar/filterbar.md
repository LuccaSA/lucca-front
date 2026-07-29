# filterbar

## Import

```typescript
import { FilterPillComponent, FilterBarComponent, FilterPillAddonBeforeDirective, FilterPillAddonAfterDirective, FilterPillDisplayerDirective, FilterPillLabelDirective } from '@lucca-front/ng/filter-pills';
```

## API Reference

### FilterPillComponent (component)

**Selector:** `lu-filter-pill`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `name` | `name` | `string` | — | — | — | — |
| `optional` | `optional` | `boolean` | `false` | — | `booleanAttribute` | — |
| `label` | `label` | `string` | — | ✅ | — | — |
| `placeholderOverride` | `placeholder` | `string \| null` | `null` | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `displayed` | `unknown` | — | — |

### FilterBarComponent (component)

**Selector:** `lu-filter-bar`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### FilterPillAddonBeforeDirective (directive)

**Selector:** `[luFilterPillAddonBefore]`

### FilterPillAddonAfterDirective (directive)

**Selector:** `[luFilterPillAddonAfter]`

### FilterPillDisplayerDirective (directive)

**Selector:** `[luFilterPillDisplayer]`

### FilterPillLabelDirective (directive)

**Selector:** `[luFilterPillLabel]`

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `FILTER_PILL_INPUT_COMPONENT` | `FilterPillInputComponent` | — |
| `FILTER_PILL_HOST_COMPONENT` | `FilterPillComponent` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 582 available values

## Related files

- 📝 [Code & implementation](./filterbar.component.md)
- 🎨 [Design guidelines](./filterbar.design.md)
- 🎯 [Figma design tokens](./filterbar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.1.0

`FilterPillComponent` :
  + `intl` : unknown
  ~ `placeholder` : string → string | null, défaut this.intl.placeholder → null
`FilterBarComponent` :
  + `intl` : unknown

### 21.0.0

Composant introduit (`FilterPillComponent`, `FilterBarComponent`, `FilterPillAddonBeforeDirective`, `FilterPillAddonAfterDirective`, `FilterPillDisplayerDirective`, `FilterPillLabelDirective`).
