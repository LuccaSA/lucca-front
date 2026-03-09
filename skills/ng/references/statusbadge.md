# StatusBadge

Components for typography and textual content.

**Storybook:** `Documentation/Texts/StatusBadge/Angular`

### Imports

```typescript
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'L' | 'M'` | `M` | Changes the size of the status badge (Medium by default or L) |
| `palette` | `Palette | null` | `null` | Applies a color palette to the status badge |

### Examples

```html
<lu-status-badge label=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.statusBadge` | Base |
| `.mod-L` | Modifier |

### When to use

- Text formatting
- Labels
- Badges
- Tags

### When not to use

- Interactive actions
- Forms

### Accessibility

- Use logical heading hierarchy
- Ensure sufficient text contrast
- Avoid text in images
