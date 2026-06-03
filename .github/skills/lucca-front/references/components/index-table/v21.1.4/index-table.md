# index-table

## Import

```typescript
import { IndexTableBodyComponent, IndexTableRowCellHeaderComponent, IndexTableRowCellComponent, IndexTableHeadComponent, IndexTableRowComponent, IndexTableComponent } from '@lucca-front/ng/index-table';
```

## Basic Usage

```html
<lu-index-table> <thead luIndexTableHead> <tr luIndexTableRow> <th luIndexTableCell>Label</th> <th luIndexTableCell>Label</th> <th luIndexTableCell>Label</th> </tr> </thead> <tbody luIndexTableBody> <tr luIndexTableRow> <th luIndexTableCell> <a luIndexTableAction href="#">link</a> </th> <td luIndexTableCell>Content</td> <td luIndexTableCell>Content</td> </tr> <tr luIndexTableRow> <td luIndexTableCell colspan="3">Content</td> </tr> <tr luIndexTableRow> <th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th> <td luIndexTableCell>Content</td> <td luIndexTableCell>Content Content Content</td> </tr> </tbody>
</lu-index-table>
```

## API Reference

### IndexTableBodyComponent (component)

**Selector:** `tbody[luIndexTableBody]`

### IndexTableRowCellHeaderComponent (component)

**Selector:** `th[luIndexTableCell]`

### IndexTableRowCellComponent (component)

**Selector:** `td[luIndexTableCell]`

### IndexTableHeadComponent (component)

**Selector:** `thead[luIndexTableHead]`

### IndexTableRowComponent (component)

**Selector:** `tr[luIndexTableRow]`

### IndexTableComponent (component)

**Selector:** `lu-index-table`

## Related files

- 📝 [Code & implementation](./index-table.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../index-table.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)
- 📋 [Changelog](../index-table.changelog.md)
