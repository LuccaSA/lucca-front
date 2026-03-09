# FancyBox

Components for layout structuring.

**Storybook:** `Documentation/Structure/FancyBox/Angular/Basic`

### Imports

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `foreground` | `string` | `-` | foreground image (URL) |
| `size` | `null | 'S'` | `null` | Which size should the callout be? Defaults to small |

### Examples

```html
<lu-fancy-box............> Content </lu-fancy-box>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.fancyBox-content` | Base |
| `.fancyBox-content-foreground` | Base |

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
