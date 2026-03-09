# Callout

Components to communicate information and states to the user.

**Storybook:** `Documentation/Feedback/Callout/Angular/AI`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
```

### Examples

```html
<lu-callout AI iconAlt=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.suggestion` | Base |
| `.suggestion-form-field` | Base |
| `.suggestion-callout` | Base |
| `.mod-outlined` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-inline` | Modifier |
| `.mod-AI` | Modifier |

### When to use

- Success/error messages
- Important alerts
- Contextual information

### When not to use

- Main content
- User actions

### Accessibility

- Use aria-live for dynamic messages
- Associate appropriate role (alert, status)
- Do not rely solely on color
