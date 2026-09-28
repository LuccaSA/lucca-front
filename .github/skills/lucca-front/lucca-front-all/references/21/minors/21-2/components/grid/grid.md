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
| `colspan` | `colspan` | `unknown` | `null` | — | `numberAttribute` | — |
| `rowspan` | `rowspan` | `unknown` | `null` | — | `numberAttribute` | — |
| `column` | `column` | `unknown` | `null` | — | `numberAttribute` | — |
| `row` | `row` | `unknown` | `null` | — | `numberAttribute` | — |
| `align` | `align` | `'start' \| 'center' \| 'end' \| 'auto' \| null` | `null` | — | — | — |
| `justify` | `justify` | `'start' \| 'center' \| 'end' \| 'auto' \| null` | `null` | — | — | — |
| `responsive` | `responsive` | `ResponsiveConfig<'row' \| 'column' \| 'rowspan' \| 'colspan', number>` | — | — | — | — |

### GridComponent (component)

**Selectors:** `lu-grid`, `[lu-grid]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `container` | `container` | `boolean` | `false` | — | `booleanAttribute` | — |
| `columns` | `columns` | `unknown` | `null` | — | `numberAttribute` | — |
| `colspan` | `colspan` | `unknown` | `null` | — | `numberAttribute` | — |
| `rowspan` | `rowspan` | `unknown` | `null` | — | `numberAttribute` | — |
| `mode` | `mode` | `'form' \| 'auto' \| ResponsiveProperty<'auto'> \| null` | `null` | — | — | — |
| `gap` | `gap` | `Gap \| null` | `null` | — | — | — |
| `columnGap` | `columnGap` | `Gap \| null` | `null` | — | — | — |
| `rowGap` | `rowGap` | `Gap \| null` | `null` | — | — | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`GridColumnComponent`, `GridComponent`).
