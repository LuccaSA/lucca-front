# Button

Button directive for interactive actions.

**Storybook:** [Documentation/Actions/Buttons/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Button - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=6053-35130)  
**Node ID:** `6053-35130`

**Button Group:** [Button Group - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=32845-165556)  
**Node ID:** `32845-165556`

## Import

```typescript
import { ButtonDirective } from '@lucca-front/ng/button';
```

## Basic Usage

```html
<!-- Default button -->
<button type="button" luButton>Button</button>

<!-- Link styled as button -->
<a luButton href="/path">Link Button</a>
```

## Directive: `luButton`

The `luButton` directive is applied to `<button>`, `<a>`, or `<span>` elements.

### Values

| Value | Description |
|-------|-------------|
| `""` (empty) | Default filled button |
| `"outlined"` | Outlined/bordered button |
| `"ghost"` | Transparent background button |
| `"ghost-invert"` | Ghost button for dark backgrounds |
| `"AI"` | AI-styled button (v20.3+) |
| `"AI-invert"` | AI button for dark backgrounds |
| `"text"` | Text-only button, no background |
| `"text-invert"` | Text button for dark backgrounds |

```html
<button luButton>Default</button>
<button luButton="outlined">Outlined</button>
<button luButton="ghost">Ghost</button>
<button luButton="AI">AI Action</button>
```

## Inputs

### `size`
Type: `'M' | 'S' | 'XS'`

Changes the button size. Default is medium (M).

```html
<button luButton size="S">Small</button>
<button luButton size="XS">Extra Small</button>
```

### `palette`
Type: `'none' | 'product' | 'neutral' | 'success' | 'warning' | 'critical'`

Applies a color palette. Not compatible with `luButton="AI"`.

```html
<button luButton palette="success">Success</button>
<button luButton palette="critical">Delete</button>
<button luButton="outlined" palette="warning">Warning</button>
```

### `state`
Type: `'default' | 'loading' | 'error' | 'success'`

Modifies the button state. Shows spinner for loading, checkmark for success.

```html
<button luButton [state]="isLoading ? 'loading' : 'default'">Save</button>
<button luButton state="success">Saved!</button>
```

### `disabled`
Native HTML attribute. Disables the button.

```html
<button luButton disabled>Disabled</button>
<button luButton [disabled]="!isValid">Submit</button>
```

### `block`
Type: `boolean` (default: `false`)

Applies `display: block` to make button full-width.

```html
<button luButton block>Full Width Button</button>
```

### `critical`
Type: `boolean` (default: `false`)

Marks an action with significant or irreversible consequences. Shows critical styling on hover/focus. Only compatible with `outlined` and `ghost`.

```html
<button luButton="outlined" critical>Delete Account</button>
<button luButton="ghost" critical>Remove</button>
```

### `disclosure`
Type: `boolean` (default: `false`)

Indicates the presence of a dropdown menu. Adds a chevron icon.

```html
<button luButton disclosure>Options</button>
```

## With Icons

Import `IconComponent` from `@lucca-front/ng/icon`.

```html
<!-- Icon on left -->
<button luButton>
  <lu-icon icon="plusSign" alt="" />
  Add Item
</button>

<!-- Icon on right -->
<button luButton>
  Next
  <lu-icon icon="arrowRight" alt="" />
</button>

<!-- Icon only (provide alt text for accessibility) -->
<button luButton>
  <lu-icon icon="trash" alt="Delete" />
</button>
```

## With Counter Badge

Import `NumericBadgeComponent` from `@lucca-front/ng/numeric-badge`.

```html
<button luButton>
  Notifications
  <lu-numeric-badge [value]="5" />
</button>
```

## Common Patterns

### Form Submit Button
```html
<button luButton type="submit" [disabled]="form.invalid" [state]="isSubmitting ? 'loading' : 'default'">
  Save Changes
</button>
```

### Destructive Action
```html
<button luButton="outlined" critical (click)="confirmDelete()">
  <lu-icon icon="trash" alt="" />
  Delete
</button>
```

### Dropdown Trigger
```html
<button luButton="ghost" disclosure [luDropdownTrigger]="menu">
  Actions
</button>
```

## Accessibility

- Use `<button>` for actions, `<a>` for navigation
- Always provide `alt` text for icon-only buttons via `<lu-icon alt="...">`
- Use `type="button"` to prevent accidental form submission
- Disabled buttons are not focusable by default
