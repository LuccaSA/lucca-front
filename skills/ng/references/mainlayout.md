# MainLayout

Components for layout structuring.

**Storybook:** `Documentation/Structure/Main Layout/Angular/Basic`

### Imports

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headerSticky` | `any` | `-` | - |

### Examples

```html
<lu-main-layout......>...... ... ... </lu-main-layout>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.fakeContent` | Base |
| `.mainLayout-sidebar` | Base |
| `.container` | Base |
| `.mod-overflow` | Modifier |

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
