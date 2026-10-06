# grid

## Import

```typescript
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

## API Reference

### GridColumnComponent (component)

**Selectors:** `lu-grid-column`, `[lu-grid-column]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `colspan` | `colspan` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `rowspan` | `rowspan` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `column` | `column` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `row` | `row` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `align` | `align` | `GridColumnAlignment \| null` | `null` | — | — | — |
| `justify` | `justify` | `GridColumnAlignment \| null` | `null` | — | — | — |
| `responsive` | `responsive` | `ResponsiveConfig<GridColumnResponsive, number>` | — | — | — | — |

### GridComponent (component)

**Selectors:** `lu-grid`, `[lu-grid]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `container` | `container` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `columns` | `columns` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `colspan` | `colspan` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `rowspan` | `rowspan` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `mode` | `mode` | `GridMode \| null` | `null` | — | — | — |
| `gap` | `gap` | `Gap \| null` | `null` | — | — | — |
| `columnGap` | `columnGap` | `Gap \| null` | `null` | — | — | — |
| `rowGap` | `rowGap` | `Gap \| null` | `null` | — | — | — |

## Type definitions

- [`Gap`](../../types/Gap.md) — 13 available values

## Related files

- 📝 [Code & implementation](./grid.component.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`GridColumnComponent` :
  ~ `colspan` : transform numberAttribute → luNullableNumberAttribute
  ~ `rowspan` : transform numberAttribute → luNullableNumberAttribute
  ~ `column` : transform numberAttribute → luNullableNumberAttribute
  ~ `row` : transform numberAttribute → luNullableNumberAttribute
`GridComponent` :
  ~ `container` : transform booleanAttribute → luBooleanAttribute
  ~ `columns` : transform numberAttribute → luNullableNumberAttribute
  ~ `colspan` : transform numberAttribute → luNullableNumberAttribute
  ~ `rowspan` : transform numberAttribute → luNullableNumberAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `GRID_GAP`, `GRID_MODE`, `GRID_COLUMN_ALIGNMENT` and `GRID_COLUMN_RESPONSIVE` constants, together with the `Gap`, `GridMode`, `GridColumnAlignment` and `GridColumnResponsive` types, are now publicly exported and used to type the grid inputs.

#### 21.0.0

##### Added

- `colspan` and `rowspan` inputs on `lu-grid-column`.

#### 20.3.2

##### Changed

- `lu-grid` and `lu-grid-column` can now be used as attribute selectors (`[lu-grid]`, `[lu-grid-column]`) to keep a semantic host element.

#### 20.3.1

##### Fixed

- `responsive` input parsing for responsive column definitions.

#### 20.3.0

##### Added

- `lu-grid` component (`grid`) with the `columns`, `mode`, `gap`, `columnGap`, `rowGap`, `container`, `align` and `justify` inputs, and the `LU_GRID_INSTANCE` injection token.
- `lu-grid-column` component with the `column`, `row` and `responsive` inputs.

#### 18.3.0

##### Changed

- Reverted the grid width management introduced earlier and fixed the grid `max-inline-size`.

#### 18.1.1

##### Changed

- Default grid gap set to the `150` spacing token.
