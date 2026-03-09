# Links

Interactive components to trigger user actions.

**Storybook:** `Documentation/Actions/Link/Angular/TEST`

### Imports

```typescript
import { LinkComponent } from '@lucca-front/ng/link';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `routerLinkCommands` | `LuRouterLink['routerLink'] | null` | `null` | Target page address |

### Examples

```html
And this is the second page !
```
### CSS Classes

| Class | Type |
|-------|------|
| `.link` | Base |
| `.lucca-icon` | Base |
| `.icon-arrowExternal` | Base |
| `.mod-icon` | Modifier |
| `.mod-decorationHover` | Modifier |
| `.is-disabled` | State |

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
