# IndexTable

Components to display lists and data collections.

**Storybook:** `Documentation/Listings/Index Table/Angular/Actions`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { IndexTableActionComponent, IndexTableBodyComponent, IndexTableComponent, IndexTableFootComponent, IndexTableHeadComponent, IndexTableRowCellComponent, IndexTableRowCellHeaderComponent, IndexTableRowComponent, IndexTableActionFileComponent } from '@lucca-front/ng/index-table';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule, LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
```

### Examples

```html
<lu-index-table...>
<thead luIndexTableHead>
<tr luIndexTableRow>
<th luIndexTableCell>Label</th>
<th luIndexTableCell>Label</th>
<th luIndexTableCell actions...>Label</th>
</tr>
</thead>
<tbody luIndexTableBody>
<tr luIndexTableRow>
<th luIndexTableCell><a href=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.userPopover_trigger` | Base |
| `.code` | Base |
| `.indexTable-body-row-cell-subAction` | Base |
| `.mod-actions` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-onlyIcon` | Modifier |
| `.mod-S` | Modifier |
| `.mod-allowTextSelection` | Modifier |
| `.is-closed` | State |

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
