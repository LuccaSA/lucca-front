# Status Badge

Badge component for displaying status/state.

**Storybook:** [Documentation/Texts/StatusBadge/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
```

## Basic Usage

```html
<lu-status-badge state="success">Active</lu-status-badge>
```

## Inputs

### `state`
Type: `'success' | 'warning' | 'error' | 'info' | 'default'`

```html
<lu-status-badge state="success">Approved</lu-status-badge>
<lu-status-badge state="warning">Pending</lu-status-badge>
<lu-status-badge state="error">Rejected</lu-status-badge>
<lu-status-badge state="info">In Progress</lu-status-badge>
```

### `palette`
Type: `Palette` - Color palette (alternative to state).

```html
<lu-status-badge palette="product">Premium</lu-status-badge>
```

## Common Patterns

### Order Status
```html
<lu-status-badge [state]="getOrderState(order.status)">
  {{ order.status }}
</lu-status-badge>
```

```typescript
getOrderState(status: string): 'success' | 'warning' | 'error' {
  switch (status) {
    case 'delivered': return 'success';
    case 'pending': return 'warning';
    case 'cancelled': return 'error';
    default: return 'info';
  }
}
```

### User Status
```html
<lu-status-badge [state]="user.isActive ? 'success' : 'error'">
  {{ user.isActive ? 'Active' : 'Inactive' }}
</lu-status-badge>
```

### In Data Table
```html
<lu-data-table-cell>
  <lu-status-badge [state]="item.state">{{ item.statusLabel }}</lu-status-badge>
</lu-data-table-cell>
```

### Multiple States
```html
<lu-status-badge state="success">Validated</lu-status-badge>
<lu-status-badge state="warning">Needs Review</lu-status-badge>
<lu-status-badge state="error">Blocked</lu-status-badge>
```

## Accessibility

- Status is announced to screen readers
- Color is not the only indicator (includes text)

