# Tag

Tag component for labels and categorization.

**Storybook:** [Documentation/Texts/Tag/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Tag - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=7765-34927)  
**Node ID:** `7765-34927`

## Import

```typescript
import { TagComponent } from '@lucca-front/ng/tag';
```

## Basic Usage

```html
<lu-tag>New</lu-tag>
<lu-tag palette="product">Product</lu-tag>
```

## Inputs

### `palette`
Type: `Palette`

Applies a color palette.

```html
<lu-tag palette="success">Success</lu-tag>
<lu-tag palette="warning">Warning</lu-tag>
<lu-tag palette="critical">Critical</lu-tag>
```

### `size`
Type: `'S' | 'M'` (default: `'M'`)

```html
<lu-tag size="S">Small</lu-tag>
```

## Common Patterns

### Status Tag
```html
<lu-tag palette="success">Active</lu-tag>
<lu-tag palette="warning">Pending</lu-tag>
```

### Filter Tag
```html
<lu-tag palette="neutral">Marketing</lu-tag>
<lu-tag palette="neutral">Finance</lu-tag>
```

## Accessibility

- Tags should include text labels
- Use meaningful palette to complement text

