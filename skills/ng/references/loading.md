# Loading

Components to indicate loading or progress.

**Storybook:** `Documentation/Loaders/Loading/Angular/Basic`

### Imports

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `block` | `any` | `-` | - |

### CSS Classes

| Class | Type |
|-------|------|
| `.loading` | Base |

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
