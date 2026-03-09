# Footer

Components for layout structuring.

**Storybook:** `Documentation/Structure/Footer/Angular/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { FooterComponent } from '@lucca-front/ng/footer';
```

### Examples

```html
<lu-footer.........>
<ng-container footerContent> Content </ng-container>
<button type=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.footer-containerOptional` | Base |
| `.footer-content` | Base |
| `.footer-actions` | Base |
| `.mod-outlined` | Modifier |

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
