# ReadMore

Components for typography and textual content.

**Storybook:** `Documentation/Texts/ReadMore/Angular/AI`

### Imports

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { TagComponent } from '@lucca-front/ng/tag';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `lineClamp` | `number` | `5` | Change the number of lines displayed when collapsed |
| `surface` | `null | 'sunken' | 'default' | string` | `null` | Apply the spacing of the Text Flow component |
| `innerContent` | `null | string` | `null` | Allow content to be passed via innerHTML |

### Examples

```html
<lu-read-more...... />
```
### CSS Classes

| Class | Type |
|-------|------|
| `.box` | Base |
| `.mod-elementAfterText` | Modifier |

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
