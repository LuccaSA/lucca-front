# Pagination

Components for application navigation.

**Storybook:** `Documentation/Navigation/Pagination/Angular`

### Imports

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `from` | `number | null` | `-` | Where the pagination start |
| `to` | `number | null` | `-` | Where the pagination end |
| `itemsCount` | `number | null` | `-` | Total number of items in the pagination |
| `mod` | `'default' | 'compact'` | `default` | Pagination mod (default or compact) |

### CSS Classes

| Class | Type |
|-------|------|
| `.pagination` | Base |
| `.pagination-count` | Base |
| `.pagination-count-current` | Base |
| `.mod-onlyIcon` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-S` | Modifier |
| `.mod-compact` | Modifier |
| `.is-active` | State |
| `.is-ellipsis` | State |

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
