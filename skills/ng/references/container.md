# Container

Layout container component for consistent content width and padding.

**Storybook:** [Documentation/Structure/Container/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { ContainerComponent } from '@lucca-front/ng/container';
```

## Basic Usage

```html
<lu-container>
  <h1>Page Title</h1>
  <p>Content with consistent width and padding.</p>
</lu-container>
```

## Inputs

### `size`
Type: `'S' | 'M' | 'L' | 'XL'` (default: `'L'`) - Max width of the container.

```html
<lu-container size="S">Narrow content</lu-container>
<lu-container size="M">Medium content</lu-container>
<lu-container size="L">Large content</lu-container>
<lu-container size="XL">Extra large content</lu-container>
```

### `noPadding`
Type: `boolean` (default: `false`) - Removes horizontal padding.

```html
<lu-container noPadding>Full width content</lu-container>
```

## Common Patterns

### Page Layout
```html
<lu-page-header>
  <h1>Dashboard</h1>
</lu-page-header>

<lu-container>
  <!-- Main page content -->
  <lu-box heading="Statistics">...</lu-box>
</lu-container>
```

### Centered Form
```html
<lu-container size="S">
  <h2>Sign In</h2>
  <lu-form-field label="Email">
    <lu-text-input [(ngModel)]="email" />
  </lu-form-field>
  <button luButton>Sign In</button>
</lu-container>
```

### Article Layout
```html
<lu-container size="M">
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</lu-container>
```
