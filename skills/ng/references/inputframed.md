# InputFramed

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Input Framed/Angular/Basic`

### Imports

```typescript
import { FormFieldComponent, InputFramedComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
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
<lu-form-field label=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.grid-column` | Base |
| `.inputFramedWrapper` | Base |
| `.inputFramed` | Base |
| `.mod-alignCenter` | Modifier |
| `.mod-autoAtMediaMinXXS` | Modifier |
| `.mod-L` | Modifier |

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
