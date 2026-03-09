# Divider

Visual separator component.

**Storybook:** [Documentation/Structure/Divider/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Divider - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=8487-40717)  
**Node ID:** `8487-40717`

Un Divider est un élément graphique utilisé pour délimiter ou séparer différentes sections ou contenus dans une interface. Les Dividers sont souvent employés pour améliorer la lisibilité, l'organisation et la hiérarchie visuelle d'une interface.

**Documentation:** [Prisme Design System - Divider](https://prisme.lucca.io/94310e217/p/22632c-divider)

## Import

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
```

## Basic Usage

```html
<div>Section 1</div>
<lu-divider />
<div>Section 2</div>
```

## Inputs

### `vertical`
Type: `boolean` (default: `false`) - Creates a vertical divider.

```html
<div class="flex">
  <span>Item 1</span>
  <lu-divider vertical />
  <span>Item 2</span>
</div>
```

### `label`
Type: `string` - Adds label text in the middle of the divider.

```html
<lu-divider label="OR" />
```

## Common Patterns

### Section Separator
```html
<section>
  <h2>Personal Information</h2>
  <!-- form fields -->
</section>

<lu-divider />

<section>
  <h2>Contact Information</h2>
  <!-- form fields -->
</section>
```

### With Label
```html
<button luButton>Sign in</button>
<lu-divider label="OR" />
<button luButton="outlined">Sign up</button>
```

### In Toolbar
```html
<div class="toolbar">
  <button luButton="ghost">Edit</button>
  <lu-divider vertical />
  <button luButton="ghost">Delete</button>
  <lu-divider vertical />
  <button luButton="ghost">Share</button>
</div>
```
