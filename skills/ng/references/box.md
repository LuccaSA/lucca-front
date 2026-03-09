# Box

Components for layout structuring.

**Storybook:** `Documentation/Structure/Box/Angular/Basic`

### Imports

```typescript
import { BoxComponent } from '@lucca-front/ng/box';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
```

### Examples

```html
<lu-form-field label=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.form-field` | Base |
| `.formLabel` | Base |
| `.checkboxField` | Base |
| `.mod-withArrow` | Modifier |
| `.mod-inline` | Modifier |
| `.mod-onlyIcon` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-toggle` | Modifier |

### When to use

- Content organization
- Layout
- Containers

### When not to use

- Interactive components

### Accessibility

- Use appropriate landmarks
- Maintain logical reading order
- Structure content semantically
