# ColorInput

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Fields/Color Picker/Angular`

### Imports

```typescript
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent } from '@lucca-front/ng/forms';
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
<lu-color-input [(ngModel)]=
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
