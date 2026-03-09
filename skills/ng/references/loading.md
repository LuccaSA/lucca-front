# Loading

Loading indicator component.

**Storybook:** [Documentation/Loaders/Loading/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```

## Basic Usage

```html
<lu-loading />
```

## Inputs

### `size`
Type: `'XS' | 'S' | 'M' | 'L'` (default: `'M'`)

```html
<lu-loading size="S" />
<lu-loading size="L" />
```

### `label`
Type: `string` - Accessible label for screen readers.

```html
<lu-loading label="Loading data..." />
```

## Common Patterns

### Page Loading
```html
@if (isLoading) {
  <lu-loading size="L" label="Loading..." />
} @else {
  <div>Content</div>
}
```

### Button Loading State
Use `state="loading"` on buttons instead:
```html
<button luButton [state]="isLoading ? 'loading' : 'default'">Save</button>
```

### With Skeleton (preferred)
```html
@if (isLoading) {
  <lu-skeleton-table [rows]="5" [columns]="3" />
} @else {
  <lu-data-table>...</lu-data-table>
}
```

## Accessibility

- Always provide `label` for context
