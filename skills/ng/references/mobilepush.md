# MobilePush

Components to communicate information and states to the user.

**Storybook:** `Documentation/Feedback/Mobile Push/Angular/Basic`

### Imports

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
```

### Examples

```html
<lu-mobile-push ...> Posez une absence depuis n’importe où avec l’application Lucca. </lu-mobile-push>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.mobilePush-containerWrapper` | Base |
| `.mobilePush` | Base |
| `.mobilePush-icons` | Base |
| `.mod-S` | Modifier |

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
