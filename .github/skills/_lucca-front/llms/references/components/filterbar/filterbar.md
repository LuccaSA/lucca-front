# filterbar

**Sommaire**

- Import
- API Reference
  - FilterPillComponent (component)
  - FilterBarComponent (component)
  - FilterViewSelectorComponent (component)
  - FilterPillAddonBeforeDirective (directive)
  - FilterPillAddonAfterDirective (directive)
  - Injection tokens
- Type definitions
- Related files
- Changelog
  - 22.1.0
  - 22.0.5
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { FilterPillComponent, FilterBarComponent, FilterViewSelectorComponent, FilterPillAddonBeforeDirective, FilterPillAddonAfterDirective } from '@lucca-front/ng/filter-pills';
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
| `grouping` | `grouping` | `string` | `''` | — | — | — |
| `iconOnly` | `iconOnly` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `backdrop` | `backdrop` | `boolean` | `false` | — | `luBooleanAttribute` | — |
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
| `manualApply` | `manualApply` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `segmentedControlTabs` | `segmentedControlTabs` | `FilterBarSegmentedControlTabs \| null` | `null` | — | — | — |
| `resultsCount` | `resultsCount` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |

### FilterViewSelectorComponent (component)

**Selector:** `lu-filter-view-selector`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `views` | `views` | `T[]` | — | ✅ | — | Affiche les vues via SegmentedControl. |
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

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_FILTER_BAR_INSTANCE` | `FilterBarComponent` | — |
| `LU_FILTER_PILLS_TRANSLATIONS` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 600 available values

## Related files

- 📝 [Code & implementation](./filterbar.component.md)
- 🎨 [Design guidelines](./filterbar.design.md)
- 🎯 [Figma design tokens](./filterbar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular-segmented-control-tabs--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.1.0

- directive `FilterPillDisplayerDirective` retiré
- directive `FilterPillLabelDirective` retiré
`FilterPillComponent` :
  + `grouping` : string
  + `iconOnly` : boolean
  + `backdrop` : boolean
`FilterBarComponent` :
  + `segmentedControlTabs` : FilterBarSegmentedControlTabs | null
  + `resultsCount` : unknown
- token `FILTER_PILL_INPUT_COMPONENT` retiré
- token `FILTER_PILL_HOST_COMPONENT` retiré

### 22.0.5

`FilterBarComponent` :
  + `manualApply` : boolean
+ token `LU_FILTER_PILLS_TRANSLATIONS` : unknown

### 22.0.0

+ component `FilterViewSelectorComponent` (lu-filter-view-selector)
`FilterPillComponent` :
  ~ `optional` : transform booleanAttribute → luBooleanAttribute
+ token `LU_FILTER_BAR_INSTANCE` : FilterBarComponent

### Notes de release (ZeroHeight)

#### 21.1.0

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 20.1.0

##### Changed

- The bar relies on `lu-scroll-box` to scroll its pills, with the matching shadows.

#### 19.2.0

##### Added

- `lu-filter-bar` component (`filterBar`) with the `intl` input, laying out a collection of `lu-filter-pill`.
- `[luFilterPillAddonBefore]` and `[luFilterPillAddonAfter]` directives to project content before and after the pills.
