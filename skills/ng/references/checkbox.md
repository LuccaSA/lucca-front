# Checkbox

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Fields/CheckboxField/Angular`

### Imports

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

### CSS Classes

| Class | Type |
|-------|------|
| `.form-field` | Base |
| `.formLabel` | Base |
| `.checkboxField` | Base |
| `.mod-checklist` | Modifier |
| `.mod-selectOption` | Modifier |
| `.mod-S` | Modifier |

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
