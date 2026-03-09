# NumericBadge

Components for typography and textual content.

**Storybook:** `Documentation/Texts/NumericBadge/Angular/Basic`

### Imports

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'XS' | 'S' | 'M'` | `-` | The size of the badge |
| `palette` | `Palette` | `none` | The palette to use for this badge. Defaults to 'none' (inherits parent palette) |
| `maxValue` | `number` | `999` | Indicates the maximum value of number for the numeric badge |

### Examples

```html
<lu-numeric-badge ... [value]=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.numericBadge` | Base |
| `.mod-S` | Modifier |
| `.mod-XS` | Modifier |
| `.is-loading` | State |

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
