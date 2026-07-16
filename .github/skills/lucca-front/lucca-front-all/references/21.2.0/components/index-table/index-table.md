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
| `groupButtonAlt` | `groupButtonAlt` | `string \| null` | `null` | — | — | Texte restitué par le bouton du groupe. |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `expanded` | `unknown` | — |

### IndexTableRowCellHeaderComponent (component)

**Selector:** `th[luIndexTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selectable` | `selectable` | `boolean` | `false` | — | `booleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `booleanAttribute` | Masque les cellules d'en-tête du tableau. |
| `actions` | `actions` | `boolean` | `false` | — | `booleanAttribute` | — |
| `inlineSize` | `inlineSize` | `number` | `0` | — | `numberAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `sort` | `null | 'none' | 'ascending' | 'descending'` | — |

### IndexTableRowCellComponent (component)

**Selector:** `td[luIndexTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `allowTextSelection` | `allowTextSelection` | `boolean` | `false` | — | `booleanAttribute` | — |
| `tfoot` | `tfoot` | `boolean` | `false` | — | `booleanAttribute` | — |

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
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `stack` | `stack` | `number` | `1` | — | `numberAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `selected` | `boolean` | — |

### IndexTableComponent (component)

**Selector:** `lu-index-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selectable` | `selectable` | `boolean` | `false` | — | `booleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `layoutFixed` | `layoutFixed` | `boolean` | `false` | — | `booleanAttribute` | Applique une largeur fixe aux colonnes. |
| `empty` | `empty` | `boolean` | `false` | — | `booleanAttribute` | Affiche un empty state à la place des lignes de tableau. |
| `responsive` | `responsive` | `ResponsiveConfig<'layoutFixed', true>` | — | — | — | — |

## Related files

- 📝 [Code & implementation](./index-table.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./index-table.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.0/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)
- 📋 [Changelog](./index-table.changelog.md)
