# skeleton

## Import

```typescript
import { SkeletonButtonComponent, SkeletonCardComponent, SkeletonDataTableComponent, SkeletonFancyBoxComponent, SkeletonFieldComponent, SkeletonHeaderComponent, SkeletonHighlightDataComponent, SkeletonIndexTableComponent, SkeletonTableComponent, SkeletonUserPopoverComponent } from '@lucca-front/ng/skeleton';
```

## API Reference

### SkeletonButtonComponent (component)

**Selectors:** `lu-skeleton-button`, `pr-skeleton-button`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'XS' \| 'S' \| 'M'` | — | — | — | — |

### SkeletonCardComponent (component)

**Selector:** `lu-skeleton-card`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `descriptionLines` | `descriptionLines` | `number` | `1` | — | `numberAttribute` | — |

### SkeletonDataTableComponent (component)

**Selectors:** `lu-skeleton-data-table`, `pr-skeleton-data-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dataTableBodyOnly` | `dataTableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | `numberAttribute` | — |
| `colsAlign` | `colsAlign` | `Record<number, SkeletonColsAlign>` | — | — | — | — |
| `rows` | `rows` | `number` | `8` | — | `numberAttribute` | — |

### SkeletonFancyBoxComponent (component)

**Selector:** `lu-skeleton-fancy-box`

### SkeletonFieldComponent (component)

**Selectors:** `lu-skeleton-field`, `pr-skeleton-field`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'XS' \| 'S' \| 'M'` | — | — | — | — |
| `rows` | `rows` | `number` | `1` | — | `numberAttribute` | — |

### SkeletonHeaderComponent (component)

**Selectors:** `lu-skeleton-header`, `pr-skeleton-header`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |

### SkeletonHighlightDataComponent (component)

**Selector:** `lu-skeleton-highlight-data`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |

### SkeletonIndexTableComponent (component)

**Selectors:** `lu-skeleton-index-table`, `pr-skeleton-index-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `tableBodyOnly` | `tableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | `numberAttribute` | — |
| `colsAlign` | `colsAlign` | `Record<number, SkeletonColsAlign>` | — | — | — | — |
| `rows` | `rows` | `number` | `8` | — | `numberAttribute` | — |

### SkeletonTableComponent (component)

**Selectors:** `lu-skeleton-table`, `pr-skeleton-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `tableBodyOnly` | `tableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | `numberAttribute` | — |
| `colsAlign` | `colsAlign` | `Record<number, SkeletonColsAlign>` | — | — | — | — |
| `rows` | `rows` | `number` | `8` | — | `numberAttribute` | — |

### SkeletonUserPopoverComponent (component)

**Selector:** `lu-skeleton-user-popover`

## Related files

- 📝 [Code & implementation](./skeleton.component.md)
- 🎨 [Design guidelines](./skeleton.design.md)
- 🎯 [Figma design tokens](./skeleton.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-loaders-skeleton--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

+ component `SkeletonCardComponent` (lu-skeleton-card)
+ component `SkeletonFancyBoxComponent` (lu-skeleton-fancy-box)
+ component `SkeletonHighlightDataComponent` (lu-skeleton-highlight-data)
- component `SkeletonResourceCardComponent` retiré
`SkeletonButtonComponent` :
  + selector `pr-skeleton-button`
`SkeletonDataTableComponent` :
  + selector `pr-skeleton-data-table`
  ~ `cols` : transform ∅ → numberAttribute
  ~ `rows` : transform ∅ → numberAttribute
`SkeletonFieldComponent` :
  + selector `pr-skeleton-field`
  ~ `dark` : boolean, boolean | `${boolean}` → boolean
  ~ `hiddenLabel` : boolean, boolean | `${boolean}` → boolean
  ~ `rows` : number, number | `${number}` → number
`SkeletonHeaderComponent` :
  + selector `pr-skeleton-header`
`SkeletonIndexTableComponent` :
  + selector `pr-skeleton-index-table`
  ~ `cols` : transform ∅ → numberAttribute
  ~ `rows` : transform ∅ → numberAttribute
`SkeletonTableComponent` :
  + selector `pr-skeleton-table`
  ~ `cols` : transform ∅ → numberAttribute
  ~ `rows` : transform ∅ → numberAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `SKELETON_BUTTON_SIZE` and `SKELETON_COLS_ALIGN` constants, together with the `SkeletonButtonSize` and `SkeletonColsAlign` types, are now publicly exported and used to type the `size` and `colsAlign` inputs.

##### Fixed

- Randomized line widths no longer change on every render.

#### 21.2.3

##### Added

- `size` input on `lu-skeleton-field`.

#### 21.0.4

##### Fixed

- `lu-skeleton-field` no longer computes a double percentage for its line widths.

#### 21.0.3

##### Added

- `colsAlign` input on `lu-skeleton-table`, `lu-skeleton-index-table` and `lu-skeleton-data-table` to align the placeholder cells.

#### 21.0.0

##### Added

- `S` and `XS` sizes on `lu-skeleton-button`.
- `lu-skeleton-resource-card` component with the `descriptionLines` input.

#### 20.2.1

##### Fixed

- Default `border-radius` of the square skeleton.

#### 20.1.0

##### Added

- `rows` input on `lu-skeleton-field` to render several lines.
- `hiddenLabel` input on `lu-skeleton-field`.

#### 19.1.0

##### Added

- `lu-skeleton-table` and `lu-skeleton-index-table` components with the `cols`, `rows` and `tableBodyOnly` inputs.
- `lu-skeleton-data-table` component with the `dataTableBodyOnly` input.

#### 18.1.0

##### Added

- First batch of skeleton components: `lu-skeleton-button`, `lu-skeleton-field`, `lu-skeleton-header` and `lu-skeleton-user-popover`, with the `dark` input.
