# Icon

Component to display icons from the Lucca icon library.

**Storybook:** [Documentation/Texts/Icons/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
```

## Basic Usage

```html
<lu-icon icon="heart" alt="Favorite" />
```

## Inputs

### `icon` (required)
Type: `LuccaIcon` (string)

The name of the icon to display. See the icon library for available icons.

```html
<lu-icon icon="user" alt="User" />
<lu-icon icon="settings" alt="Settings" />
<lu-icon icon="trash" alt="Delete" />
<lu-icon icon="plusSign" alt="Add" />
```

### `alt`
Type: `string`

Alternative text for accessibility. Required for meaningful icons, empty for decorative icons.

```html
<!-- Meaningful icon - provide alt text -->
<lu-icon icon="trash" alt="Delete item" />

<!-- Decorative icon - empty alt (icon is supplementary to text) -->
<button luButton>
  <lu-icon icon="plusSign" alt="" />
  Add Item
</button>
```

### `size`
Type: `'XS' | 'S' | 'M' | 'L' | 'XL'`

Changes the icon size.

```html
<lu-icon icon="heart" alt="" size="XS" />  <!-- 12px -->
<lu-icon icon="heart" alt="" size="S" />   <!-- 16px -->
<lu-icon icon="heart" alt="" size="M" />   <!-- 24px (default) -->
<lu-icon icon="heart" alt="" size="L" />   <!-- 32px -->
<lu-icon icon="heart" alt="" size="XL" />  <!-- 48px -->
```

## Common Icons

### Navigation & Actions
```html
<lu-icon icon="arrowLeft" alt="Back" />
<lu-icon icon="arrowRight" alt="Next" />
<lu-icon icon="arrowChevronBottom" alt="Expand" />
<lu-icon icon="arrowChevronRight" alt="Open" />
<lu-icon icon="menu" alt="Menu" />
<lu-icon icon="search" alt="Search" />
```

### Status & Feedback
```html
<lu-icon icon="signConfirm" alt="Success" />
<lu-icon icon="signClose" alt="Close" />
<lu-icon icon="signWarning" alt="Warning" />
<lu-icon icon="signError" alt="Error" />
<lu-icon icon="infoCircle" alt="Information" />
```

### Common Actions
```html
<lu-icon icon="plusSign" alt="Add" />
<lu-icon icon="trash" alt="Delete" />
<lu-icon icon="pencil" alt="Edit" />
<lu-icon icon="copy" alt="Copy" />
<lu-icon icon="download" alt="Download" />
<lu-icon icon="upload" alt="Upload" />
```

### Objects & Entities
```html
<lu-icon icon="user" alt="User" />
<lu-icon icon="users" alt="Team" />
<lu-icon icon="folder" alt="Folder" />
<lu-icon icon="file" alt="File" />
<lu-icon icon="calendar" alt="Date" />
<lu-icon icon="clock" alt="Time" />
```

## Usage in Buttons

```html
<!-- Icon with text -->
<button luButton>
  <lu-icon icon="plusSign" alt="" />
  Add Item
</button>

<!-- Icon only button (alt text required!) -->
<button luButton>
  <lu-icon icon="trash" alt="Delete" />
</button>

<!-- Icon on right -->
<button luButton>
  Next
  <lu-icon icon="arrowRight" alt="" />
</button>
```

## Usage with Other Components

### In Form Fields
```html
<lu-form-field label="Search">
  <lu-icon icon="search" alt="" />
  <lu-text-input [(ngModel)]="query" />
</lu-form-field>
```

### In Callouts
```html
<lu-callout state="success">
  <lu-icon icon="signConfirm" alt="" />
  Operation completed successfully
</lu-callout>
```

### In Chips
```html
<lu-chip icon="user" unkillable>John Doe</lu-chip>
```

### In Links
```html
<a luLink href="/settings">
  <lu-icon icon="settings" alt="" />
  Settings
</a>
```

## Dynamic Icons

```html
<lu-icon [icon]="getStatusIcon(status)" [alt]="status" />
```

```typescript
getStatusIcon(status: string): LuccaIcon {
  switch (status) {
    case 'success': return 'signConfirm';
    case 'error': return 'signError';
    case 'warning': return 'signWarning';
    default: return 'infoCircle';
  }
}
```

## Conditional Rendering

```html
@if (hasNotifications) {
  <lu-icon icon="bell" alt="Notifications" />
}

<lu-icon [icon]="isExpanded ? 'arrowChevronTop' : 'arrowChevronBottom'" alt="" />
```

## Accessibility

### Meaningful Icons
Icons that convey information must have `alt` text:
```html
<lu-icon icon="signWarning" alt="Warning: Action required" />
```

### Decorative Icons
Icons that are purely decorative or accompany text should have empty `alt`:
```html
<button luButton>
  <lu-icon icon="download" alt="" />
  Download Report
</button>
```

### Icon-only Buttons
When using icon-only buttons, always provide `alt` text:
```html
<button luButton>
  <lu-icon icon="trash" alt="Delete this item" />
</button>
```

## Icon Library

For a complete list of available icons, see the Storybook documentation or the `@lucca-front/icons` package.

Common icon categories:
- **Arrows**: `arrowLeft`, `arrowRight`, `arrowUp`, `arrowDown`, `arrowChevron*`
- **Signs**: `signConfirm`, `signClose`, `signWarning`, `signError`, `signInfo`
- **Actions**: `plusSign`, `minusSign`, `pencil`, `trash`, `copy`, `download`, `upload`
- **Objects**: `user`, `users`, `folder`, `file`, `calendar`, `clock`, `settings`
- **Communication**: `mail`, `phone`, `chat`, `bell`

