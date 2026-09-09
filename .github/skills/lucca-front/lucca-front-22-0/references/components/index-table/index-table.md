# index-table

## Import

```typescript
import { IndexTableActionFileComponent, IndexTableActionComponent, IndexTableBodyComponent, IndexTableRowCellHeaderComponent, IndexTableRowCellComponent, IndexTableFootComponent, IndexTableHeadComponent, IndexTableRowComponent, IndexTableComponent } from '@lucca-front/ng/index-table';
```

## Basic Usage

```html
<lu-index-table> <thead luIndexTableHead> <tr luIndexTableRow> <th luIndexTableCell>Label</th> <th luIndexTableCell>Label</th> <th luIndexTableCell>Label</th> </tr> </thead> <tbody luIndexTableBody> <tr luIndexTableRow> <th luIndexTableCell> <a luIndexTableAction href="#">link</a> </th> <td luIndexTableCell>Content</td> <td luIndexTableCell>Content</td> </tr> <tr luIndexTableRow> <td luIndexTableCell colspan="3">Content</td> </tr> <tr luIndexTableRow> <th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th> <td luIndexTableCell>Content</td> <td luIndexTableCell>Content Content Content</td> </tr> </tbody>
</lu-index-table>
```

## API Reference

### IndexTableActionFileComponent (component)

**Selector:** `input[luIndexTableAction]`

### IndexTableActionComponent (component)

**Selectors:** `button[luIndexTableAction]`, `a[luIndexTableAction]`, `label[luIndexTableAction]`

### IndexTableBodyComponent (component)

**Selector:** `tbody[luIndexTableBody]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `group` | `group` | `PortalContent \| null` | `null` | — | — | Regroupe des lignes de tableau en les rendant dépliables. |
| `groupButtonAlt` | `groupButtonAlt` | `string \| null` | `null` | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |

### IndexTableRowCellHeaderComponent (component)

**Selector:** `th[luIndexTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selectable` | `selectable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `luBooleanAttribute` | Masque les cellules d’en-tête du tableau. |
| `actions` | `actions` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `inlineSize` | `inlineSize` | `number` | `0` | — | `luNumberAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `sort` | `IndexTableSort \| null` | — | — |

### IndexTableRowCellComponent (component)

**Selector:** `td[luIndexTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `allowTextSelection` | `allowTextSelection` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `tfoot` | `tfoot` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### IndexTableFootComponent (component)

**Selector:** `tfoot[luIndexTableFoot]`

### IndexTableHeadComponent (component)

**Selector:** `thead[luIndexTableHead]`

### IndexTableRowComponent (component)

**Selector:** `tr[luIndexTableRow]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selectedLabel` | `selectedLabel` | `string \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `mixed` | `mixed` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un état de sélection mixte (-) à la checkbox d'une ligne. |
| `stack` | `stack` | `number` | `1` | — | `luNumberAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `selected` | `boolean` | — | — |

### IndexTableComponent (component)

**Selector:** `lu-index-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selectable` | `selectable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `layoutFixed` | `layoutFixed` | `boolean` | `false` | — | `luBooleanAttribute` | Applique une largeur fixe aux colonnes. |
| `empty` | `empty` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche un empty state à la place des lignes de tableau. |
| `responsive` | `responsive` | `ResponsiveConfig<'layoutFixed', true>` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_INDEX_TABLE_INSTANCE` | `IndexTableComponent` | — |

## Related files

- 📝 [Code & implementation](./index-table.component.md)
- 🎨 [Design guidelines](./index-table.design.md)
- 🎯 [Figma design tokens](./index-table.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`IndexTableActionFileComponent`, `IndexTableActionComponent`, `IndexTableBodyComponent`, `IndexTableRowCellHeaderComponent`, `IndexTableRowCellComponent`, `IndexTableFootComponent`, `IndexTableHeadComponent`, `IndexTableRowComponent`, `IndexTableComponent`).
