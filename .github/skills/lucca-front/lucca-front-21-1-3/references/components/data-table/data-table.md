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
| `groupButtonAlt` | `groupButtonAlt` | `string \| null` | `null` | — | — | Texte alternatif restitué au focus de l'action sur le groupe. |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `expanded` | `unknown` | — |

### DataTableRowCellHeaderComponent (component)

**Selector:** `th[luDataTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `fixedWidth` | `fixedWidth` | `string \| null` | `null` | — | — | — |
| `inlineSize` | `inlineSize` | `string \| null` | `null` | — | — | Modifie la largeur d'une colonne lorsque layoutFixed est activé. |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `sort` | `null | 'none' | 'ascending' | 'descending'` | — |

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
| `selectedLabel` | `selectedLabel` | `string \| null` | `null` | — | — | Texte alternatif restitué à la sélection d'une ligne. |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `selected` | `boolean` | — |

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
| `noOverflow` | `noOverflow` | `boolean` | `false` | — | `booleanAttribute` | — |
| `responsive` | `responsive` | `ResponsiveConfig<'layoutFixed', true>` | — | — | — | — |
| `verticalAlign` | `verticalAlign` | `null \| 'top' \| 'middle' \| 'bottom'` | `null` | — | — | Aligne le contenu des cellules verticalement. |
| `stickyColsStart` | `stickyColsStart` | `number` | `0` | — | `numberAttribute` | — |
| `stickyColsEnd` | `stickyColsEnd` | `number` | `0` | — | `numberAttribute` | — |

## Related files

- 📝 [Code & implementation](./data-table.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./data-table.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.3/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)
- 📋 [Changelog](./data-table.changelog.md)
