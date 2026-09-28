# data-table

## Import

```typescript
import { DataTableBodyComponent, DataTableRowCellHeaderComponent, DataTableRowCellComponent, DataTableFootComponent, DataTableHeadComponent, DataTableRowComponent, DataTableComponent } from '@lucca-front/ng/data-table';
```

## Basic Usage

```html
<lu-data-table> <thead luDataTableHead> <tr luDataTableRow> <th luDataTableCell>header</th> <th luDataTableCell>header</th> </tr> </thead> <tbody luDataTableBody> <tr luDataTableRow> <th luDataTableCell>header</th> <td luDataTableCell>cell</td> </tr> <tr luDataTableRow> <th luDataTableCell>header</th> <td luDataTableCell>cell</td> </tr> </tbody>
</lu-data-table>
```

## API Reference

### DataTableBodyComponent (component)

**Selector:** `tbody[luDataTableBody]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `group` | `group` | `PortalContent \| null` | `null` | — | — | — |
| `groupButtonAlt` | `groupButtonAlt` | `string \| null` | `null` | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |

### DataTableRowCellHeaderComponent (component)

**Selector:** `th[luDataTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `fixedWidth` | `fixedWidth` | `string \| null` | `null` | — | — | — |
| `inlineSize` | `inlineSize` | `string \| null` | `null` | — | — | Modifie la largeur d’une colonne lorsque layoutFixed est activé. |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `sort` | `DataTableSort \| null` | — | — |

### DataTableRowCellComponent (component)

**Selector:** `td[luDataTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `actions` | `actions` | `boolean` | `false` | — | `booleanAttribute` | — |

### DataTableFootComponent (component)

**Selector:** `tfoot[luDataTableFoot]`

### DataTableHeadComponent (component)

**Selector:** `thead[luDataTableHead]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `sticky` | `sticky` | `boolean` | `false` | — | `booleanAttribute` | — |

### DataTableRowComponent (component)

**Selector:** `tr[luDataTableRow]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `selectedLabel` | `selectedLabel` | `string \| null` | `null` | — | — | Texte alternatif restitué à la sélection d’une ligne. |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `selected` | `boolean` | — | — |

### DataTableComponent (component)

**Selector:** `lu-data-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `hover` | `hover` | `boolean` | `false` | — | `booleanAttribute` | — |
| `selectable` | `selectable` | `boolean` | `false` | — | `booleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `layoutFixed` | `layoutFixed` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cellBorder` | `cellBorder` | `boolean` | `false` | — | `booleanAttribute` | — |
| `nested` | `nested` | `boolean` | `false` | — | `booleanAttribute` | — |
| `drag` | `drag` | `boolean` | `false` | — | `booleanAttribute` | — |
| `noOverflow` | `noOverflow` | `boolean` | `false` | — | `booleanAttribute` | Désactive le défilement horizontal du tableau. Celui-ci prendra alors la place nécessaire pour afficher tout son contenu… |
| `responsive` | `responsive` | `ResponsiveConfig<'layoutFixed', true>` | — | — | — | — |
| `verticalAlign` | `verticalAlign` | `DataTableVerticalAlign \| null` | `null` | — | — | Aligne le contenu des cellules verticalement. |
| `stickyColsStart` | `stickyColsStart` | `number` | `0` | — | `numberAttribute` | Nombre de colonnes figées depuis la gauche. Non compatible avec l’usage de colspan. |
| `stickyColsEnd` | `stickyColsEnd` | `number` | `0` | — | `numberAttribute` | Nombre de colonnes figées depuis la droite. Non compatible avec l’usage de colspan. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DATA_TABLE_INSTANCE` | `DataTableComponent` | — |

## Related files

- 📝 [Code & implementation](./data-table.component.md)
- 🎨 [Design guidelines](./data-table.design.md)
- 🎯 [Figma design tokens](./data-table.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

`DataTableRowCellHeaderComponent` :
  ~ (model) `sort` : null | 'none' | 'ascending' | 'descending' → DataTableSort | null
`DataTableComponent` :
  ~ `verticalAlign` : null | 'top' | 'middle' | 'bottom' → DataTableVerticalAlign | null
+ token `LU_DATA_TABLE_INSTANCE` : DataTableComponent

### 21.1.0

`DataTableRowComponent` :
  + `intl` : unknown

### 21.0.0

Composant introduit (`DataTableBodyComponent`, `DataTableRowCellHeaderComponent`, `DataTableRowCellComponent`, `DataTableFootComponent`, `DataTableHeadComponent`, `DataTableRowComponent`, `DataTableComponent`).
