# Button

Interactive components to trigger user actions.

**Storybook:** `Documentation/Actions/Button/Angular/AI`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

### Examples

```html
<button aria-expanded=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.button` | Base |
| `.numericBadge` | Base |
| `.lucca-icon` | Base |
| `.mod-block` | Modifier |
| `.mod-disclosure` | Modifier |
| `.mod-more` | Modifier |
| `.mod-outlined` | Modifier |
| `.mod-onlyIcon` | Modifier |
| `.is-loading` | State |
| `.is-success` | State |
| `.is-error` | State |

### When to use

- User actions
- Event triggering
- Form submissions

### When not to use

- Simple navigation (use Link)
- Static information display

### Accessibility

- Use appropriate semantic elements (<button>, <a>)
- Provide alternative text for visual elements
- Ensure sufficient contrast
