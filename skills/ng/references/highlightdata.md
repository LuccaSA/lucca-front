# HighlightData

Components for layout structuring.

**Storybook:** `Documentation/Structure/Highlight data/Angular/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
```

### Examples

```html
<lu-highlight-data ...>...</lu-highlight-data>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.highlightData` | Base |
| `.highlightData-content` | Base |
| `.highlightData-content-title` | Base |
| `.mod-outlined` | Modifier |
| `.mod-valueFirst` | Modifier |
| `.mod-nested` | Modifier |
| `.mod-S` | Modifier |
| `.mod-XS` | Modifier |

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
