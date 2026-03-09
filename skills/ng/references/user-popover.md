# User Popover

Popover showing user details on hover or focus.

**Storybook:** [Documentation/Users/User Popover/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [User Popover - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=18202-1181)  
**Node ID:** `18202-1181`

## Import

```typescript
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## Basic Usage

```html
<span [luUserPopover]="user">
  {{ user.firstName }} {{ user.lastName }}
</span>
```

## Inputs

### `luUserPopover` (required)
Type: `ILuUser`

User to display in the popover.

```html
<button luButton="ghost" [luUserPopover]="user">View profile</button>
```

### `luUserPopoverDisabled`
Type: `boolean`

Disables the popover.

```html
<span [luUserPopover]="user" [luUserPopoverDisabled]="true">
  {{ user.firstName }}
</span>
```

### `luUserPopoverEnterDelay`
Type: `number` (default: `300`)

Delay before opening (ms).

### `luUserPopoverLeaveDelay`
Type: `number` (default: `100`)

Delay before closing (ms).

```html
<button type="button"
  [luUserPopover]="user"
  [luUserPopoverEnterDelay]="200"
  [luUserPopoverLeaveDelay]="200">
  User
</button>
```

## Behavior

- Opens on hover and focus
- Uses Popover overlay internally
- No close button (closes on mouse leave / blur)

## Common Patterns

### In Data Table
```html
<lu-data-table-cell>
  <span [luUserPopover]="row.user">{{ row.user.firstName }} {{ row.user.lastName }}</span>
</lu-data-table-cell>
```

### User List
```html
<ul>
  @for (user of users; track user.id) {
    <li><span [luUserPopover]="user">{{ user.firstName }} {{ user.lastName }}</span></li>
  }
</ul>
```

## Docs Highlights

### Trigger class

If `userPopover_trigger` styles are not loaded early, replace with utilities:
`pr-u-buttonReset pr-u-inlineSizeFitContent pr-u-borderRadiusDefault` or `pr-u-borderRadiusFull`.

### Custom store

Provide your own `ILuUserPopoverStore` implementation if needed.

## Accessibility

- Trigger is focusable for keyboard users
- Popover content is announced with proper ARIA roles
