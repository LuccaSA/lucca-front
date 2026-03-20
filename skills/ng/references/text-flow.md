# Text Flow

Component for rich text flow layout with typography and spacing.

**Storybook:** [Documentation/Texts/Text Flow/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Text Flow - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=30462-137476)  
**Node ID:** `30462-137476`

## Import

```typescript
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
```

## Basic Usage

```html
<lu-text-flow>
  <h1>Title</h1>
  <p>Paragraph text...</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
  </ul>
</lu-text-flow>
```

## Common Patterns

### Article Content
```html
<lu-text-flow>
  <h2>Section</h2>
  <p>Some content...</p>
  <blockquote>Quote...</blockquote>
</lu-text-flow>
```

### Markdown Output
```html
<lu-text-flow>
  <div [innerHTML]="htmlContent"></div>
</lu-text-flow>
```

## Accessibility

- Uses semantic HTML elements inside for structure
- Ensure headings follow proper hierarchy

