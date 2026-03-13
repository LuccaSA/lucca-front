# Chip

Compact component for tags, filters, and selections.

**Storybook:** [Documentation/Data/Chip/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Chip - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=3098-3077)  
**Node ID:** `3098-3077`

## Import

```typescript
import { ChipComponent } from '@lucca-front/ng/chip';
```

## Basic Usage

```html
<lu-chip>Label</lu-chip>

<!-- As a button -->
<button luChip>Clickable Chip</button>

<!-- As a link -->
<a luChip href="/filter">Filter Chip</a>
```

## Inputs

### `unkillable`
Type: `boolean` (default: `false`)

Makes the chip non-removable (hides the kill/remove button).

```html
<lu-chip unkillable>Permanent Tag</lu-chip>
```

### `disabled`
Type: `boolean` (default: `false`)

Disables the chip.

```html
<lu-chip disabled>Disabled Chip</lu-chip>
```

### `size`
Type: `'S' | null` (default: `null`)

Changes the chip size. Default is medium, `'S'` for small.

```html
<lu-chip size="S">Small Chip</lu-chip>
```

### `palette`
Type: `string` (e.g., `'product'`)

Applies a color palette to the chip.

```html
<lu-chip palette="product">Product Chip</lu-chip>
```

### `state`
Type: `'warning' | 'critical' | null` (default: `null`)

Sets a feedback state. Automatically adds the appropriate icon and palette.

```html
<lu-chip state="warning">Warning</lu-chip>
<lu-chip state="critical">Error</lu-chip>
```

### `icon`
Type: `LuccaIcon | null` (default: `null`)

Displays an icon in the chip. Overridden by `state` if both are set.

```html
<lu-chip icon="heart">Favorite</lu-chip>
```

### `withEllipsis`
Type: `boolean` (default: `false`)

Truncates long text with ellipsis and shows full text in a tooltip on hover.

```html
<lu-chip withEllipsis>Very long label that will be truncated</lu-chip>
```

## Outputs

### `kill`
Type: `EventEmitter<Event>`

Emitted when the remove/kill button is clicked (only when `unkillable` is `false`).

```html
<lu-chip (kill)="removeItem($event)">Removable</lu-chip>
```

```typescript
removeItem(event: Event) {
  // Handle chip removal
  this.items = this.items.filter(item => item !== selectedItem);
}
```

## Common Patterns

### Filter Chips
```html
<div class="filters">
  @for (filter of activeFilters; track filter.id) {
    <lu-chip (kill)="removeFilter(filter)">
      {{ filter.label }}
    </lu-chip>
  }
</div>
```

### Selection Display
```html
<div class="selected-items">
  @for (item of selectedItems; track item.id) {
    <lu-chip size="S" (kill)="deselect(item)">
      {{ item.name }}
    </lu-chip>
  }
</div>
```

### Status Chips (non-removable)
```html
<lu-chip unkillable state="warning">Pending Review</lu-chip>
<lu-chip unkillable state="critical">Rejected</lu-chip>
<lu-chip unkillable palette="product">Active</lu-chip>
```

### With Custom Icon
```html
<lu-chip icon="user" unkillable>John Doe</lu-chip>
<lu-chip icon="officeBuildingCity" unkillable>Paris Office</lu-chip>
```

## Accessibility

- Remove button is keyboard accessible
- Chip can be focused and activated with Enter/Space when using `button[luChip]`
- `withEllipsis` provides tooltip for truncated text
- State icons have appropriate alt text for screen readers
