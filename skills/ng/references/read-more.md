# Read More

Expandable text component for long content blocks.

**Storybook:** [Documentation/Texts/Read More/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Read More - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=27984-1100)  
**Node ID:** `27984-1100`

## Import

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
```

## Basic Usage

```html
<lu-read-more>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</lu-read-more>
```

## Inputs

### `lines`
Type: `number` (default: `3`)

Number of lines visible before collapsing.

```html
<lu-read-more [lines]="2">
  Long content here...
</lu-read-more>
```

### `expanded`
Type: `boolean` (two-way)

Controls expanded state.

```html
<lu-read-more [(expanded)]="isExpanded">
  Long content...
</lu-read-more>
```

## Common Patterns

### Product Description
```html
<lu-read-more [lines]="4">
  {{ product.description }}
</lu-read-more>
```

### User Bio
```html
<lu-read-more [lines]="3">
  {{ user.bio }}
</lu-read-more>
```

### FAQ Answer
```html
<lu-read-more [lines]="5">
  {{ faq.answer }}
</lu-read-more>
```

## Accessibility

- Toggle is keyboard accessible
- Expanded state announced to screen readers
- Use clear text for expand/collapse labels

