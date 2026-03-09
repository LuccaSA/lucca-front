# ResourceCard

Components for layout structuring.

**Storybook:** `Documentation/Structure/Resource Card/Angular/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective, LuTooltipModule } from '@lucca-front/ng/tooltip';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `wrapperDraggable` | `any` | `-` | - |
| `wrapperGrid` | `any` | `-` | - |

### Examples

```html
<lu-resource-card-wrapper.........>......</lu-resource-card-wrapper>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.resourceCardContainer` | Base |
| `.resourceCard` | Base |
| `.resourceCard-layout` | Base |
| `.is-disabled` | State |

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
