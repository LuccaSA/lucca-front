# TextFlow

Components for typography and textual content.

**Storybook:** `Documentation/Texts/Text flow/Angular/Basic`

### Imports

```typescript
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
```

### Examples

```html
<lu-text-flow>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>Paragraph</p>
<p>Paragraph</p>
<h2>Heading 2</h2>
<p>Paragraph</p>
<ul>
<li>List item</li>
<li>List item</li>
<li>List item</li>
</ul>
<h3>Heading 3</h3>
<p>Paragraph</p>
<h4>Heading 4</h4>
<ol>
<li>List item</li>
<li>List item</li>
<li>List item</li>
</ol>
</lu-text-flow>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.textFlow` | Base |

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
