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
