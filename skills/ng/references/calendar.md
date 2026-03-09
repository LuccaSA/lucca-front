# Calendar

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Date/Calendar`

### Imports

```typescript
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuCalendarInputComponent, LuDateAdapterPipe } from '@lucca-front/ng/date';
```

### Examples

```html
<lu-calendar [(ngModel)]=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.button` | Base |
| `.mod-outlined` | Modifier |

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
