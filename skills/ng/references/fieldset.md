# Fieldset

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Fieldset/Angular/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

### Examples

```html
@let column = { colspanAtMediaMinXXS: 2 }; ... <lu-fieldset...............>
<lu-grid mode=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.fieldset-title-content-text-helper` | Base |
| `.grid` | Base |
| `.grid-column` | Base |
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
