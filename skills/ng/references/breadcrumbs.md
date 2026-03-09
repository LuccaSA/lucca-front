# Breadcrumbs

Components for application navigation.

**Storybook:** `Documentation/Navigation/Breadcrumbs/Angular/Basic`

### Imports

```typescript
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
```

### Examples

```html
<lu-breadcrumbs ...>
<a *luBreadcrumbsLink routerLink=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.breadcrumbs` | Base |
| `.breadcrumbs-list` | Base |
| `.breadcrumbs-list-item` | Base |
| `.mod-compact` | Modifier |

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
