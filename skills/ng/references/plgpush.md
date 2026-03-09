# PlgPush

Components to communicate information and states to the user.

**Storybook:** `Documentation/Feedback/PLG Push/Angular/Basic`

### Imports

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
```

### Examples

```html
<lu-plg-push ...${removed ?
```
### CSS Classes

| Class | Type |
|-------|------|
| `.link` | Base |
| `.link-text` | Base |
| `.link-icon` | Base |
| `.mod-icon` | Modifier |
| `.mod-S` | Modifier |
| `.mod-onlyIcon` | Modifier |
| `.mod-ghost` | Modifier |

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
