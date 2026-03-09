# VerticalNavigation

Components for application navigation.

**Storybook:** `Documentation/Navigation/VerticalNavigation/Angular/Disabled`

### Imports

```typescript
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | `LuccaIcon | null` | `null` | adds an icon to the vertical navigation link |
| `label` | `string | null` | `null` | Changes the text displayed by the vertical navigation item |
| `level` | `number` | `3` | Defines aria level for heading title |

### Examples

```html
<lu-vertical-navigation heading=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.verticalNavigation` | Base |
| `.verticalNavigation-sectionTitle` | Base |
| `.verticalNavigation-list` | Base |
| `.mod-child` | Modifier |
| `.mod-iconless` | Modifier |

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
