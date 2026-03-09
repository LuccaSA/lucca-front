# Numeric Badge

Badge component for displaying counts and numbers.

**Storybook:** [Documentation/Texts/NumericBadge/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Numeric Badge - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=3200-26461)  
**Node ID:** `3200-26461`

## Import

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

## Basic Usage

```html
<lu-numeric-badge [value]="5" />
```

## Inputs

### `value`
Type: `number` - The number to display.

### `max`
Type: `number` - Maximum value. Shows "99+" style when exceeded.

```html
<lu-numeric-badge [value]="150" [max]="99" /> <!-- Shows "99+" -->
```

### `palette`
Type: `Palette` - Color palette.

```html
<lu-numeric-badge [value]="3" palette="critical" />
```

## Common Patterns

### Notifications Badge
```html
<button luButton="ghost">
  <lu-icon icon="bell" alt="Notifications" />
  <lu-numeric-badge [value]="unreadCount" />
</button>
```

### Tab with Count
```html
<button luButton="ghost">
  Inbox
  <lu-numeric-badge [value]="messageCount" [max]="99" />
</button>
```

### Menu Item Badge
```html
<lu-vertical-navigation-link icon="messages" routerLink="/messages">
  Messages
  <lu-numeric-badge [value]="newMessages" palette="product" />
</lu-vertical-navigation-link>
```

### Status Indicator
```html
<div class="status">
  <span>Active Users</span>
  <lu-numeric-badge [value]="activeUserCount" palette="success" />
</div>
```

## Accessibility

- Badge value announced to screen readers
- Hidden when value is 0
