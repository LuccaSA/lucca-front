# DataTable

Components to display lists and data collections.

**Storybook:** `Documentation/Listings/Data table/Angular/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DataTableBodyComponent, DataTableComponent, DataTableFootComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cols` | `range` | `-` | - |

### Examples

```html
<lu-data-table.....................>
<thead luDataTableHead>
<tr luDataTableRow...>
<th luDataTableCell>...</th>... <th luDataTableCell.........>...</th>
</tr>
</thead>
<tbody luDataTableBody......>... <tr luDataTableRow...>
<th luDataTableCell>......</th>... <td luDataTableCell...>...</td>
</tr>
<tr luDataTableRow.........>
<th luDataTableCell>...</th>... <td luDataTableCell...>...</td>
</tr>
</tbody>...... </lu-data-table> ......
```
### CSS Classes

| Class | Type |
|-------|------|
| `.dataTableWrapper` | Base |
| `.dataTable` | Base |
| `.dataTable-head` | Base |
| `.mod-alignCenter` | Modifier |
| `.mod-alignRight` | Modifier |
| `.mod-alignTop` | Modifier |
| `.mod-cellBorder` | Modifier |
| `.mod-draggable` | Modifier |
| `.is-collapsed` | State |

### When to use

- Collection display
- Data tables
- Item lists

### When not to use

- Single element
- Forms

### Accessibility

- Use semantic structures (table, ul, ol)
- Provide headers for tables
- Support accessible sorting and pagination
