# ProgressBar

Components to indicate loading or progress.

**Storybook:** `Documentation/Loaders/Progress Bar/Angular/Basic`

### Imports

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `state` | `'success' | 'error' | 'null'` | `null` | Progress bar state |

### CSS Classes

| Class | Type |
|-------|------|
| `.progress-bar` | Base |

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
