# Date2

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Date2/Calendar`

### Imports

```typescript
import { Calendar2Component, DateInputComponent, CalendarShortcut, DateRange, DateRangeInputComponent, PremadeShortcuts, CalendarMode } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `props` | `any` | `-` | - |

### Examples

```html
<lu-calendar2 [hideToday]=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.calendar` | Base |
| `.calendar-name` | Base |
| `.calendar-name-button` | Base |
| `.is-overflow` | State |
| `.is-daysOff` | State |
| `.is-current` | State |

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
