# Tags

Components for typography and textual content.

**Storybook:** `Documentation/Texts/Tags/Angular/Basic`

### Imports

```typescript
import { TagComponent } from '@lucca-front/ng/tag';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'S' | 'M' | 'L'` | `M` | Which size should the tag be? Defaults to medium |
| `link` | `string` | `-` | For routerLink usage |

### CSS Classes

| Class | Type |
|-------|------|
| `.tag` | Base |
| `.lucca-icon` | Base |
| `.icon-heart` | Base |
| `.mod-AI` | Modifier |
| `.mod-outlined` | Modifier |
| `.mod-L` | Modifier |
| `.mod-M` | Modifier |
| `.mod-S` | Modifier |

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
