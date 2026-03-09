# EmptyState

Components to communicate information and states to the user.

**Storybook:** `Documentation/Feedback/Empty State/Angular/Page`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
```

### Examples

```html
<lu-empty-state-page heading=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.emptyState` | Base |
| `.emptyState-container` | Base |
| `.emptyState-content` | Base |
| `.mod-page` | Modifier |
| `.mod-outlined` | Modifier |
| `.mod-center` | Modifier |
| `.mod-action` | Modifier |
| `.mod-L` | Modifier |

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
