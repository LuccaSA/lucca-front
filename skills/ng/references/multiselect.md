# MultiSelect

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Fields/Multi Select/Angular`

### Imports

```typescript
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `set` | `any` | `-` | - |
| `optionComparer` | `any` | `-` | - |
| `optionKey` | `any` | `-` | - |
| `public` | `any` | `-` | - |
| `scrollIntoViewOptions` | `any` | `-` | - |
| `tooltip` | `string` | `-` | - |

### Examples

```html
<lu-form-field ..., argTypes, )}>
<lu-multi-select [(ngModel)]=
```

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
