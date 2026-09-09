# filterbar

## Import

```typescript
import { FilterPillComponent, FilterBarComponent, FilterViewSelectorComponent, FilterPillAddonBeforeDirective, FilterPillAddonAfterDirective, FilterPillDisplayerDirective, FilterPillLabelDirective } from '@lucca-front/ng/filter-pills';
```

## API Reference

### FilterPillComponent (component)

**Selector:** `lu-filter-pill`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `name` | `name` | `string` | — | — | — | — |
| `optional` | `optional` | `boolean` | `false` | — | `luBooleanAttribute` | — |
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

### FilterViewSelectorComponent (component)

**Selector:** `lu-filter-view-selector`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `views` | `views` | `T[]` | — | ✅ | — | — |
| `viewLabel` | `viewLabel` | `(view: T) => string` | `(view) => (view as { name: string }).name` | — | — | — |
| `optionComparer` | `optionComparer` | `(a: T, b: T) => boolean` | `filterViewDefaultOptionComparer` | — | — | — |
| `optionKey` | `optionKey` | `(view: T) => unknown` | `filterViewDefaultOptionKey` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `renameView` | `renameView` | `T` | — |
| `deleteView` | `deleteView` | `T` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `selectedView` | `T \| null` | — | — |

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
| `LU_FILTER_BAR_INSTANCE` | `FilterBarComponent` | — |
| `FILTER_PILL_INPUT_COMPONENT` | `FilterPillInputComponent` | — |
| `FILTER_PILL_HOST_COMPONENT` | `FilterPillComponent` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 585 available values

## Related files

- 📝 [Code & implementation](./filterbar.component.md)
- 🎨 [Design guidelines](./filterbar.design.md)
- 🎯 [Figma design tokens](./filterbar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

+ component `FilterViewSelectorComponent` (lu-filter-view-selector)
`FilterPillComponent` :
  ~ `optional` : transform booleanAttribute → luBooleanAttribute
+ token `LU_FILTER_BAR_INSTANCE` : FilterBarComponent
