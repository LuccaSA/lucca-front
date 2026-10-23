# filterpills

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
| `name` | `name` | `string` | — | — | — | Dans le cas d’un filtre optionnel, permet de faire le lien entre la liste de filtres disponible et l’affichage du filtre… |
| `optional` | `optional` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `grouping` | `grouping` | `string` | `''` | — | — | — |
| `iconOnly` | `iconOnly` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `backdrop` | `backdrop` | `boolean` | `false` | — | `luBooleanAttribute` | — |
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
| `manualApply` | `manualApply` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `segmentedControlTabs` | `segmentedControlTabs` | `FilterBarSegmentedControlTabs \| null` | `null` | — | — | — |
| `resultsCount` | `resultsCount` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |

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

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_FILTER_BAR_INSTANCE` | `FilterBarComponent` | — |
| `LU_FILTER_PILLS_TRANSLATIONS` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 600 available values

## Related files

- 📝 [Code & implementation](./filterpills.component.md)
- 🎨 [Design guidelines](./filterpills.design.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-filterspills-filterpills-angular--docs)

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

#### 22.1.0

##### Added

- `grouping` input to group the pill with the ones sharing the same value in the optional filters list of the filter bar.
- `iconOnly` input to display the pill as an icon-only button, its label being shown as a tooltip.
- `backdrop` input to catch the click that closes the pill popover instead of letting it through to the page.
- `@lucca-front/ng/filter-pills/core` entrypoint exposing the tokens and directives used by the inputs hosted in a pill (`FILTER_PILL_INPUT_COMPONENT`, `FILTER_PILL_HOST_COMPONENT`, `luFilterPillDisplayer`, `luFilterPillLabel`…), still re-exported by `@lucca-front/ng/filter-pills`.

##### Changed

- `FILTER_PILL_HOST_COMPONENT` token is now typed with the `FilterPillHostComponent` interface instead of `FilterPillComponent`.

#### 22.0.6

##### Fixed

- A disabled filter pill no longer shows its clear button.

#### 22.0.0

##### Changed

- Pill popover no longer opens with a blocking backdrop: the rest of the page stays interactive while it is open.

#### 21.4.1

##### Fixed

- Non-breaking space before the colon is now applied to every French locale (`fr-BE`, `fr-CA`…), not only `fr`.
- Margins of a clearable pill.

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
