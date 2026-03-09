# SkipLinks

Components for application navigation.

**Storybook:** `Documentation/Navigation/SkipLinks/Basic`

### Imports

```typescript
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
```

### Examples

```html
<lu-skip-links />
<div id=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.button` | Base |
| `.lucca-icon` | Base |
| `.icon-app` | Base |
| `.mod-onlyIcon` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-withIcon` | Modifier |

### When to use

- Page navigation
- Menus
- Breadcrumbs
- Pagination

### When not to use

- Actions (use Button)
- Data display

### Accessibility

- Use appropriate nav landmarks
- Indicate current page with aria-current
- Support keyboard navigation
