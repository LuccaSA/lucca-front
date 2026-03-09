# Skeleton

Loading placeholder components for better perceived performance.

**Storybook:** [Documentation/Loaders/Skeleton/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Skeleton - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=19475-8986)  
**Node ID:** `19475-8986`

## Import

```typescript
import { 
  SkeletonComponent,
  SkeletonTableComponent,
  SkeletonDataTableComponent,
  SkeletonFieldComponent 
} from '@lucca-front/ng/skeleton';
```

## Basic Skeleton

```html
<lu-skeleton [width]="200" [height]="20" />
```

## Inputs

### `width`
Type: `number | string` - Width in pixels or CSS value.

### `height`
Type: `number | string` - Height in pixels or CSS value.

### `rounded`
Type: `boolean` - Makes skeleton rounded (for avatars).

```html
<lu-skeleton [width]="40" [height]="40" rounded />
```

## Skeleton Table

```html
<lu-skeleton-table [rows]="5" [columns]="3" />
```

### Inputs
- `rows` - Type: `number`
- `columns` - Type: `number`

## Skeleton Data Table

```html
<lu-skeleton-data-table [rows]="10" [columns]="4" />
```

## Skeleton Field

For form fields.

```html
<lu-skeleton-field />
```

## Common Patterns

### Loading Card
```html
@if (isLoading) {
  <div class="card">
    <lu-skeleton [width]="60" [height]="60" rounded />
    <lu-skeleton [width]="200" [height]="24" />
    <lu-skeleton [width]="300" [height]="16" />
  </div>
} @else {
  <div class="card">
    <img [src]="user.avatar" />
    <h3>{{ user.name }}</h3>
    <p>{{ user.bio }}</p>
  </div>
}
```

### Loading Table
```html
@if (isLoading) {
  <lu-skeleton-data-table [rows]="10" [columns]="5" />
} @else {
  <lu-data-table [data]="items">...</lu-data-table>
}
```

### Loading Form
```html
@if (isLoading) {
  <lu-skeleton-field />
  <lu-skeleton-field />
  <lu-skeleton-field />
} @else {
  <form>...</form>
}
```

## Accessibility

- Skeletons are marked as aria-busy
- Screen readers announce loading state

