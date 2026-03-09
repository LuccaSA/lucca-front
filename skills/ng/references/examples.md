# Examples

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Examples/Angular`

### Imports

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FormHeaderComponent } from '@lucca-front/ng/form-header';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'M' | 'S' | null` | `null` | Which size should the chip be? Defaults or small |

### Examples

```html
<form luForm maxWidth>
<lu-form-header>Form title</lu-form-header>
<lu-fieldset heading=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.form` | Base |
| `.form-header` | Base |
| `.form-header-title` | Base |
| `.mod-maxWidth` | Modifier |
| `.mod-form` | Modifier |

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
