# Gauge

Components to indicate loading or progress.

**Storybook:** `Documentation/Loaders/Gauge/Angular/Basic`

### Imports

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `alt` | `string` | `-` | Defines the text alt attribute used for accessibility |

### Examples

```html
<lu-gauge............ />
```
### CSS Classes

| Class | Type |
|-------|------|
| `.gauge-circleBackground` | Base |
| `.gauge-circleBar` | Base |

### When to use

- Data loading
- Async actions
- Progress indication

### When not to use

- Immediately available content

### Accessibility

- Announce loading with aria-busy
- Provide descriptive alternative text
- Inform when loading completes
