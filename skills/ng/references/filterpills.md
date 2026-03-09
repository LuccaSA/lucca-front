# FilterPills

Components for user data input and validation.

**Storybook:** `Documentation/Forms/FiltersPills/Checkbox/Angular`

### Imports

```typescript
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent, FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent, LuMultiDisplayerDirective, LuMultiSelectCounterDisplayerComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuDisplayerDirective, LuOptionDirective, LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
```

### Examples

```html
<lu-filter-pill label=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.divider` | Base |
| `.filterBar-segmentedControl` | Base |
| `.filterPill` | Base |
| `.mod-button` | Modifier |
| `.mod-selectOption` | Modifier |
| `.is-filled` | State |
| `.is-empty` | State |

### When to use

- Data entry
- Forms
- Configuration
- Filters

### When not to use

- Read-only data display
- Navigation

### Accessibility

- Associate each field with a label using for/id
- Provide explicit error messages
- Support keyboard navigation
- Indicate required fields
