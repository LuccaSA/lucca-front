# Fields

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Fields/[Test] Form Field Async Loading`

### Imports

```typescript
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `errorInlineMessage` | `PortalContent | null` | `null` | Inline message for when the control is in error state |
| `inlineMessageState` | `InlineMessageState | null` | `null` | State of the inline message, will be ignored if form state is invalid |
| `extraDescribedBy` | `string` | `-` | Extra aria-describedby attribute |
| `counter` | `number` | `0` | Max amount of characters allowed, defaults to 0, which means hidden, no maximum |

### Examples

```html
@if(timer$ | async){ <form [formGroup]=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.textField` | Base |
| `.textField-input` | Base |
| `.textField-input-value` | Base |

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
