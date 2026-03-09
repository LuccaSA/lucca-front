# SCSS Utilities

SCSS utilities, mixins, functions, and CSS custom properties from @lucca-front/scss.

**Package:** `@lucca-front/scss`

## Import

```scss
// Import specific modules
@use '@lucca-front/scss/src/commons' as commons;
@use '@lucca-front/scss/src/commons/utils/media' as media;
@use '@lucca-front/scss/src/commons/config' as config;

// Or import everything
@use '@lucca-front/scss/src/main.scss';
```

## Media Query Mixins

### Breakpoint Values

Default breakpoints (can be customized via `config.$breakpoints`):
- `XS`: 0px (mobile)
- `S`: 480px (small mobile)
- `M`: 768px (tablet)
- `L`: 1024px (desktop)
- `XL`: 1280px (large desktop)

### `minWidth($breakpoint)`

Mobile-first media query (min-width).

```scss
.element {
  padding: 1rem;
  
  @include media.minWidth('M') {
    padding: 2rem; // Applied on tablet and above
  }
  
  @include media.minWidth('L') {
    padding: 3rem; // Applied on desktop and above
  }
}
```

### `maxWidth($breakpoint)`

Desktop-first media query (max-width).

```scss
.sidebar {
  width: 300px;
  
  @include media.maxWidth('M') {
    width: 100%; // Applied on mobile and tablet
  }
}
```

### `between($breakpoint1, $breakpoint2)`

Media query for specific range.

```scss
.element {
  @include media.between('M', 'L') {
    // Only applied between tablet and desktop
    display: flex;
  }
}
```

### Custom Breakpoints

```scss
.element {
  @include media.minWidth(1440px) {
    max-width: 1400px;
  }
}
```

### Container Queries

Use `$at: 'container'` for container queries.

```scss
.card {
  @include media.min('M', $at: 'container') {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

## Utility Classes

### Spacing

Padding utilities (values: 100-800):
```scss
.pr-u-padding100 { padding: 0.25rem; }
.pr-u-padding200 { padding: 0.5rem; }
.pr-u-padding300 { padding: 0.75rem; }
.pr-u-padding400 { padding: 1rem; }
.pr-u-padding500 { padding: 1.5rem; }
.pr-u-padding600 { padding: 2rem; }
.pr-u-padding700 { padding: 3rem; }
.pr-u-padding800 { padding: 4rem; }

// Directional padding
.pr-u-paddingTop400 { padding-top: 1rem; }
.pr-u-paddingBottom400 { padding-bottom: 1rem; }
.pr-u-paddingLeft400 { padding-left: 1rem; }
.pr-u-paddingRight400 { padding-right: 1rem; }

// Horizontal/Vertical
.pr-u-paddingHorizontal400 { padding-left: 1rem; padding-right: 1rem; }
.pr-u-paddingVertical400 { padding-top: 1rem; padding-bottom: 1rem; }
```

Margin utilities (same scale):
```scss
.pr-u-margin400 { margin: 1rem; }
.pr-u-marginTop400 { margin-top: 1rem; }
.pr-u-marginBottom400 { margin-bottom: 1rem; }
// etc.
```

Gap utilities (for flexbox/grid):
```scss
.pr-u-gap400 { gap: 1rem; }
.pr-u-gapHorizontal400 { column-gap: 1rem; }
.pr-u-gapVertical400 { row-gap: 1rem; }
```

### Display

```scss
.pr-u-displayNone { display: none; }
.pr-u-displayBlock { display: block; }
.pr-u-displayInline { display: inline; }
.pr-u-displayInlineBlock { display: inline-block; }
.pr-u-displayFlex { display: flex; }
.pr-u-displayInlineFlex { display: inline-flex; }
.pr-u-displayGrid { display: grid; }
```

### Flexbox

```scss
// Flex direction
.pr-u-flexDirectionRow { flex-direction: row; }
.pr-u-flexDirectionColumn { flex-direction: column; }
.pr-u-flexDirectionRowReverse { flex-direction: row-reverse; }
.pr-u-flexDirectionColumnReverse { flex-direction: column-reverse; }

// Flex wrap
.pr-u-flexWrapNowrap { flex-wrap: nowrap; }
.pr-u-flexWrapWrap { flex-wrap: wrap; }

// Justify content
.pr-u-justifyContentStart { justify-content: flex-start; }
.pr-u-justifyContentEnd { justify-content: flex-end; }
.pr-u-justifyContentCenter { justify-content: center; }
.pr-u-justifyContentSpaceBetween { justify-content: space-between; }
.pr-u-justifyContentSpaceAround { justify-content: space-around; }

// Align items
.pr-u-alignItemsStart { align-items: flex-start; }
.pr-u-alignItemsEnd { align-items: flex-end; }
.pr-u-alignItemsCenter { align-items: center; }
.pr-u-alignItemsBaseline { align-items: baseline; }
.pr-u-alignItemsStretch { align-items: stretch; }
```

### Grid

```scss
.pr-u-gridTemplateColumns2 { grid-template-columns: repeat(2, 1fr); }
.pr-u-gridTemplateColumns3 { grid-template-columns: repeat(3, 1fr); }
.pr-u-gridTemplateColumns4 { grid-template-columns: repeat(4, 1fr); }
```

### Text

```scss
.pr-u-textAlignLeft { text-align: left; }
.pr-u-textAlignCenter { text-align: center; }
.pr-u-textAlignRight { text-align: right; }
.pr-u-textAlignJustify { text-align: justify; }

.pr-u-fontWeightRegular { font-weight: 400; }
.pr-u-fontWeightSemibold { font-weight: 600; }
.pr-u-fontWeightBold { font-weight: 700; }

.pr-u-textTransformUppercase { text-transform: uppercase; }
.pr-u-textTransformLowercase { text-transform: lowercase; }
.pr-u-textTransformCapitalize { text-transform: capitalize; }
```

### Visibility & Accessibility

```scss
// Visually hidden but accessible to screen readers
.pr-u-mask {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

## CSS Custom Properties (Design Tokens)

### Colors

```scss
// Palette colors
var(--palettes-primary-500)
var(--palettes-success-500)
var(--palettes-warning-500)
var(--palettes-error-500)
var(--palettes-neutral-100)
var(--palettes-neutral-900)

// Text colors
var(--colors-text-default)
var(--colors-text-light)
var(--colors-text-dark)
```

### Spacing

```scss
var(--spacings-100) // 0.25rem
var(--spacings-200) // 0.5rem
var(--spacings-300) // 0.75rem
var(--spacings-400) // 1rem
var(--spacings-500) // 1.5rem
var(--spacings-600) // 2rem
var(--spacings-700) // 3rem
var(--spacings-800) // 4rem
```

### Sizes

```scss
var(--sizes-icon-s) // Small icon size
var(--sizes-icon-m) // Medium icon size
var(--sizes-icon-l) // Large icon size
```

### Border Radius

```scss
var(--radii-none) // 0
var(--radii-s) // Small radius
var(--radii-m) // Medium radius
var(--radii-l) // Large radius
var(--radii-full) // Fully rounded (50%)
```

## Common Patterns

### Responsive Container
```scss
.container {
  padding: var(--spacings-400);
  
  @include media.minWidth('M') {
    padding: var(--spacings-600);
  }
  
  @include media.minWidth('L') {
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
  grid-template-columns: 1fr;
  
  @include media.minWidth('M') {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include media.minWidth('L') {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Card with Utilities
```html
<div class="pr-u-padding500 pr-u-displayFlex pr-u-flexDirectionColumn pr-u-gap300">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### Responsive Spacing
```scss
.section {
  @include media.minWidth('M') {
    @extend .pr-u-paddingVertical600;
  }
  
  @include media.maxWidth('M') {
    @extend .pr-u-paddingVertical400;
  }
}
```

## Configuration

You can customize the SCSS configuration:

```scss
// In your main SCSS file
@use '@lucca-front/scss/src/commons/config' with (
  $breakpoints: (
    'XS': 0,
    'S': 576px,
    'M': 768px,
    'L': 992px,
    'XL': 1200px,
    'XXL': 1400px
  )
);
```

## Best Practices

1. **Use design tokens** (CSS custom properties) for colors, spacing, etc.
2. **Mobile-first approach** with `minWidth()` mixin
3. **Utility classes** for quick prototyping
4. **Custom SCSS** for component-specific styles
5. **Container queries** for component-level responsiveness
