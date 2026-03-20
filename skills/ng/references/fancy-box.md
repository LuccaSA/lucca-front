# Fancy Box

Decorative container with background images.

**Storybook:** [Documentation/Structure/Fancy Box/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Fancy Box - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=25658-1086)  
**Node ID:** `25658-1086`

## Import

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

## Basic Usage

```html
<lu-fancy-box 
  backgroundLeft="/assets/bg-left.svg"
  backgroundRight="/assets/bg-right.svg"
  foreground="/assets/fg.svg">
  <h3>Content</h3>
  <p>Some description</p>
</lu-fancy-box>
```

## Inputs

### `backgroundLeft` (required)
Type: `string` (URL)

### `backgroundRight` (required)
Type: `string` (URL)

### `foreground`
Type: `string` (URL)

### `size`
Type: `'S' | null` (default: `null`)

```html
<lu-fancy-box backgroundLeft="..." backgroundRight="..." size="S">...</lu-fancy-box>
```

## Common Patterns

### Promo Banner
```html
<lu-fancy-box 
  backgroundLeft="/assets/fancy-left.svg"
  backgroundRight="/assets/fancy-right.svg"
  foreground="/assets/fancy-foreground.svg"
  size="S">
  <h3>New feature</h3>
  <p>Try our new workflow today.</p>
  <button luButton="outlined">Learn more</button>
</lu-fancy-box>
```

### Inline Callout
```html
<lu-fancy-box 
  backgroundLeft="/assets/bg-left.svg"
  backgroundRight="/assets/bg-right.svg">
  <strong>Tip:</strong> You can configure defaults in Settings.
</lu-fancy-box>
```

## Notes

- Provide optimized SVGs for foreground/background images.
- Use `size="S"` for compact layouts.

## Accessibility

- Ensure contrast for text over background
- Use alt text when adding images outside the component
