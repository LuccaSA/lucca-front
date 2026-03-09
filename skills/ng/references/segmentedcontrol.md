# SegmentedControl

Components for application navigation.

**Storybook:** `Documentation/Navigation/segmentedControl/Angular/Tabs`

### Imports

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'XS' | 'S' | 'M'` | `-` | The size of the badge |
| `palette` | `Palette` | `none` | The palette to use for this badge. Defaults to 'none' (inherits parent palette) |
| `maxValue` | `number` | `999` | Indicates the maximum value of number for the numeric badge |

### Examples

```html
<ng-template #label> Lorem... </ng-template>
<lu-segmented-control-tabs......>
<lu-segmented-control-tabs-panel [label]=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.demo` | Base |
| `.numericBadge` | Base |
| `.segmentedControl-item` | Base |

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
