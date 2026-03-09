# Listing

Components to display lists and data collections.

**Storybook:** `Documentation/Listings/Listing/Angular/Basic`

### Imports

```typescript
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | `LuccaIcon | null` | `null` | Adds an icon to the listing item |
| `palette` | `Palette` | `none` | Applies a color palette to the listing |

### Examples

```html
<lu-listing........................>
<lu-listing-item>item</lu-listing-item>
<lu-listing-item...>item</lu-listing-item>
<lu-listing-item> item <lu-listing.....................>
<lu-listing-item>item</lu-listing-item>
<lu-listing-item>item</lu-listing-item>
<lu-listing-item>item</lu-listing-item>
</lu-listing>
</lu-listing-item>
</lu-listing>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.listing` | Base |
| `.listing-item` | Base |
| `.listing-item-content` | Base |
| `.mod-checklist` | Modifier |
| `.mod-inline` | Modifier |
| `.mod-divider` | Modifier |
| `.mod-icons` | Modifier |

### When to use

- Collection display
- Data tables
- Item lists

### When not to use

- Single element
- Forms

### Accessibility

- Use semantic structures (table, ul, ol)
- Provide headers for tables
- Support accessible sorting and pagination
