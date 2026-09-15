# filterpills

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
| `name` | `name` | `string` | — | — | — | Dans le cas d’un filtre optionnel, permet de faire le lien entre la liste de filtres disponible et l’affichage du filtre… |
| `optional` | `optional` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `label` | `label` | `string` | — | ✅ | — | Modifie le label du filtre. |
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

- 📝 [Code & implementation](./filterpills.component.md)
- 🎨 [Design guidelines](./filterpills.design.md)
- 🎯 [Figma design tokens](./filterpills.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-filterspills-filterpills-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

+ component `FilterViewSelectorComponent` (lu-filter-view-selector)
`FilterPillComponent` :
  ~ `optional` : transform booleanAttribute → luBooleanAttribute
+ token `LU_FILTER_BAR_INSTANCE` : FilterBarComponent

### Notes de release (ZeroHeight)

#### 21.3.0

##### Fixed

- Accessibility of the pill: labelling and keyboard handling of the trigger.

#### 21.1.0

##### Added

- `placeholder` input to replace the default placeholder of the pill.

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 20.3.0

##### Fixed

- The checkbox layout is no longer applied when the projected select already displays checkboxes.

#### 20.1.3

##### Fixed

- Default value handling: `isEmpty` detection and `clearable` behaviour.

#### 20.1.1

##### Fixed

- `displayed` model is now kept in sync with the pill value.

#### 20.1.0

##### Changed

- Tooltip behaviour and `max-inline-size` of the pill adjusted.

#### 19.3.2

##### Fixed

- Handling of nested select inputs inside a pill.

#### 19.2.6

##### Fixed

- `clearable` behaviour of the pill.

#### 19.2.4

##### Fixed

- API v4 initialization logic no longer triggers useless API calls.

#### 19.2.0

##### Added

- `lu-filter-pill` component (`filterPill`) with the required `label` input plus `name`, `icon`, `optional` and `intl`, and the `displayed` model.
- `[luFilterPillLabel]` and `[luFilterPillDisplayer]` directives to customize the label and the displayed value.
