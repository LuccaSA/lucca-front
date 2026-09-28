# skeleton

## Import

```typescript
import { SkeletonButtonComponent, SkeletonDataTableComponent, SkeletonFieldComponent, SkeletonHeaderComponent, SkeletonIndexTableComponent, SkeletonResourceCardComponent, SkeletonTableComponent, SkeletonUserPopoverComponent } from '@lucca-front/ng/skeleton';
```

## API Reference

### SkeletonButtonComponent (component)

**Selector:** `lu-skeleton-button`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'XS' \| 'S' \| 'M'` | — | — | — | — |

### SkeletonDataTableComponent (component)

**Selector:** `lu-skeleton-data-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dataTableBodyOnly` | `dataTableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | — | — |
| `colsAlign` | `colsAlign` | `Record<number, SkeletonColsAlign>` | — | — | — | — |
| `rows` | `rows` | `number` | `8` | — | — | — |

### SkeletonFieldComponent (component)

**Selector:** `lu-skeleton-field`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean, boolean \| `${boolean}`` | `false` | — | `booleanAttribute` | — |
| `hiddenLabel` | `hiddenLabel` | `boolean, boolean \| `${boolean}`` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'XS' \| 'S' \| 'M'` | — | — | — | — |
| `rows` | `rows` | `number, number \| `${number}`` | `1` | — | `numberAttribute` | — |

### SkeletonHeaderComponent (component)

**Selector:** `lu-skeleton-header`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |

### SkeletonIndexTableComponent (component)

**Selector:** `lu-skeleton-index-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `tableBodyOnly` | `tableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | — | — |
| `colsAlign` | `colsAlign` | `Record<number, SkeletonColsAlign>` | — | — | — | — |
| `rows` | `rows` | `number` | `8` | — | — | — |

### SkeletonResourceCardComponent (component)

**Selector:** `lu-skeleton-resource-card`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `descriptionLines` | `descriptionLines` | `number` | `0` | — | `numberAttribute` | — |

### SkeletonTableComponent (component)

**Selector:** `lu-skeleton-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `tableBodyOnly` | `tableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | — | — |
| `colsAlign` | `colsAlign` | `Record<number, SkeletonColsAlign>` | — | — | — | — |
| `rows` | `rows` | `number` | `8` | — | — | — |

### SkeletonUserPopoverComponent (component)

**Selector:** `lu-skeleton-user-popover`

## Related files

- 📝 [Code & implementation](./skeleton.component.md)
- 🎨 [Design guidelines](./skeleton.design.md)
- 🎯 [Figma design tokens](./skeleton.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-loaders-skeleton--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

+ component `SkeletonUserPopoverComponent` (lu-skeleton-user-popover)
`SkeletonDataTableComponent` :
  ~ `colsAlign` : Record<number, ColAlignDataTable> → Record<number, SkeletonColsAlign>
`SkeletonIndexTableComponent` :
  ~ `colsAlign` : Record<number, ColAlignIndexTable> → Record<number, SkeletonColsAlign>
`SkeletonTableComponent` :
  ~ `colsAlign` : Record<number, ColAlignTable> → Record<number, SkeletonColsAlign>

### 21.2.4

`SkeletonFieldComponent` :
  + `size` : 'XS' | 'S' | 'M'

### 21.0.3

`SkeletonDataTableComponent` :
  + `colsAlign` : Record<number, ColAlignDataTable>
`SkeletonIndexTableComponent` :
  + `colsAlign` : Record<number, ColAlignIndexTable>
`SkeletonTableComponent` :
  + `colsAlign` : Record<number, ColAlignTable>

### 21.0.0

Composant introduit (`SkeletonButtonComponent`, `SkeletonDataTableComponent`, `SkeletonFieldComponent`, `SkeletonHeaderComponent`, `SkeletonIndexTableComponent`, `SkeletonResourceCardComponent`, `SkeletonTableComponent`).
