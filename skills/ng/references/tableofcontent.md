# TableOfContent

Components for application navigation.

**Storybook:** `Documentation/Navigation/TableOfContent/Angular/Basic`

### Imports

```typescript
import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
```

### CSS Classes

| Class | Type |
|-------|------|
| `.tableOfContent` | Base |
| `.tableOfContent-list` | Base |
| `.tableOfContent-list-item` | Base |
| `.is-active` | State |

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
