---
name: lucca-front-scss
description: "SCSS utilities, mixins, and design tokens for Lucca Front design system. Use when developers ask about responsive design, spacing utilities, media queries, or SCSS configuration in Lucca projects."
---

# @lucca-front/scss — SCSS Utilities & Design Tokens

## Quick Start

```scss
// Import in your main SCSS file
@use '@lucca-front/scss/src/main.scss';

// Or import specific modules
@use '@lucca-front/scss/src/commons/utils/media' as media;
```

```json
// Install package
{
  "dependencies": {
    "@lucca-front/scss": "^latest"
  }
}
```

## What's Included

- **Utility Classes**: Spacing, display, flexbox, grid, text alignment
- **Media Query Mixins**: Responsive breakpoints
- **Design Tokens**: CSS custom properties for colors, spacing, sizes
- **Configuration**: Customizable breakpoints and settings

## Main Reference

For complete documentation, see: [utilities.md](references/utilities.md)

## Quick Reference

### Media Queries

```scss
@use '@lucca-front/scss/src/commons/utils/media' as media;

.element {
  // Mobile-first (min-width)
  @include media.minWidth('M') { ... }  // Tablet and above
  @include media.minWidth('L') { ... }  // Desktop and above
  
  // Desktop-first (max-width)
  @include media.maxWidth('M') { ... }  // Mobile and tablet
  
  // Range
  @include media.between('M', 'L') { ... }  // Only tablet
}
```

### Utility Classes

```html
<!-- Spacing -->
<div class="pr-u-padding400 pr-u-margin200">...</div>

<!-- Flexbox -->
<div class="pr-u-displayFlex pr-u-flexDirectionColumn pr-u-gap300 pr-u-alignItemsCenter">
  ...
</div>

<!-- Text -->
<p class="pr-u-textAlignCenter pr-u-fontWeightBold">...</p>
```

### Design Tokens

```scss
.element {
  // Spacing
  padding: var(--spacings-400);
  gap: var(--spacings-300);
  
  // Colors
  color: var(--palettes-primary-500);
  background: var(--palettes-neutral-100);
  
  // Radius
  border-radius: var(--radii-m);
}
```

## Breakpoints

| Name | Value | Device |
|------|-------|--------|
| XS | 0px | Mobile |
| S | 480px | Small mobile |
| M | 768px | Tablet |
| L | 1024px | Desktop |
| XL | 1280px | Large desktop |

## Spacing Scale

| Token | Value | Use For |
|-------|-------|---------|
| 100 | 0.25rem (4px) | Tight spacing |
| 200 | 0.5rem (8px) | Small gaps |
| 300 | 0.75rem (12px) | Default gaps |
| 400 | 1rem (16px) | Standard spacing |
| 500 | 1.5rem (24px) | Medium spacing |
| 600 | 2rem (32px) | Large spacing |
| 700 | 3rem (48px) | Section spacing |
| 800 | 4rem (64px) | Major sections |

## Common Patterns

### Responsive Layout
```scss
.container {
  padding: var(--spacings-400);
  
  @include media.minWidth('M') {
    padding: var(--spacings-600);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Responsive Grid
```scss
.grid {
  display: grid;
  gap: var(--spacings-400);
  
  @include media.minWidth('M') {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include media.minWidth('L') {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Component with Utilities
```html
<div class="pr-u-displayFlex pr-u-gap400 pr-u-padding500">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Best Practices

1. ✅ **Use design tokens** for consistent theming
2. ✅ **Mobile-first** approach with `minWidth()`
3. ✅ **Utility classes** for rapid development
4. ✅ **Custom SCSS** for complex components
5. ✅ **Container queries** for component responsiveness

## Full Documentation

See [utilities.md](references/utilities.md) for:
- Complete list of utility classes
- All media query mixins
- Design token reference
- Configuration options
- Advanced patterns

