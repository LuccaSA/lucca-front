# Divider

Visual separator component.

**Storybook:** [Documentation/Structure/Divider/Angular](https://storybook.lucca-front.com)

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
