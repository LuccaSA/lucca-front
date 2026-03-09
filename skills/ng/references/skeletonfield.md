# SkeletonField

Components to indicate loading or progress.

**Storybook:** `Documentation/Loaders/Skeleton/Skeleton Field`

### Imports

```typescript
import { SkeletonFieldComponent } from '@lucca-front/ng/skeleton';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'XS' | 'S' | 'M'` | `-` | Changes the size of the skeleton button |
| `cols` | `number` | `5` | Defines the number of cols (5 by default) |
| `rows` | `number` | `8` | Defines the number of row (8 by default) |
| `dark` | `boolean, boolean | `${boolean}`` | `false` | Applies dark color for skeleton |
| `hiddenLabel` | `boolean, boolean | `${boolean}`` | `false` | Hide the field label skeleton |


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
