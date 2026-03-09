# Intl

Components for layout structuring.

**Storybook:** `Documentation/Intl/Basic`

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

### Examples

```html
<lu-pagination [from]=
```

### When to use

- Content organization
- Layout
- Containers

### When not to use

- Interactive components

### Accessibility

- Use appropriate landmarks
- Maintain logical reading order
- Structure content semantically
