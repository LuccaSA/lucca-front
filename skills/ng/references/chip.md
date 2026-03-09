# Chip

Components to display lists and data collections.

**Storybook:** `Documentation/Listings/Chip/Angular/Basic`

### Imports

```typescript
import { ChipComponent } from '@lucca-front/ng/chip';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'S' | null` | `null` | Which size should the chip be? Defaults or small |

### Examples

```html
<lu-chip..................>Label</lu-chip>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.chip` | Base |
| `.chip-kill` | Base |
| `.chip-icon` | Base |
| `.mod-product` | Modifier |
| `.mod-S` | Modifier |
| `.is-disabled` | State |

### When to use

- Collection display
- Data tables
- Item lists

### When not to use

- Single element
- Forms

### Accessibility

- Use semantic structures (table, ul, ol)
- Provide headers for tables
- Support accessible sorting and pagination
