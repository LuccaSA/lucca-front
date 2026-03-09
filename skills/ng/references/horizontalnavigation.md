# HorizontalNavigation

Components for application navigation.

**Storybook:** `Documentation/Navigation/HorizontalNavigation/Angular`

### Imports

```typescript
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `null | 'S'` | `null` | Which size should the horizontal navigation be? Defaults and small |

### Examples

```html
<lu-horizontal-navigation...>
<a *luHorizontalNavigationLink class=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.horizontalNavigation-list-item-action` | Base |
| `.horizontalNavigation-list` | Base |
| `.horizontalNavigation-list-item` | Base |
| `.is-disabled` | State |

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
