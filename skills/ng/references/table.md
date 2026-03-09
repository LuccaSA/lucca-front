# Table

Components to display lists and data collections.

**Storybook:** `Documentation/Listings/Table/Actions`

### Imports

```typescript
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { ButtonComponent } from '@lucca-front/ng/button';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | `string | null` | `null` | Icon image (URL) |
| `topRightBackground` | `string` | `https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg` | Top right background image (URL) |
| `topRightForeground` | `string` | `https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg` | Top right foreground image (URL) |
| `bottomLeftBackground` | `string` | `https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg` | Bottom left background image (URL) |
| `bottomLeftForeground` | `string` | `https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg` | Bottom left foreground image (URL) |
| `contentBackgroundColor` | `string` | `var(--pr-t-elevation-surface-default` | Background color for content (text) |
| `slotTop` | `PortalContent` | `-` | Add content above heading |
| `heading` | `string` | `-` | The title of the empty state section |
| `description` | `PortalContent` | `-` | The description of the empty state section |
| `navSideCompact` | `any` | `-` | - |

### Examples

```html
<!-- header height passed with CSS var -->
<table class=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.table` | Base |
| `.table-head` | Base |
| `.table-head-row` | Base |
| `.mod-actions` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-onlyIcon` | Modifier |
| `.mod-S` | Modifier |
| `.mod-card` | Modifier |
| `.is-collapsed` | State |

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
