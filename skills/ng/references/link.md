# Link

Styled anchor component for navigation.

**Storybook:** [Documentation/Actions/Links/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Link - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=3082-283)  
**Node ID:** `3082-283`

## Import

```typescript
import { LinkComponent } from '@lucca-front/ng/link';
```

## Basic Usage

```html
<a luLink href="/page">Go to page</a>
<a luLink routerLink="/dashboard">Dashboard</a>
```

## Directive: `luLink`

Applied to `<a>` elements for consistent link styling.

### Values

| Value | Description |
|-------|-------------|
| `""` (empty) | Default link style |
| `"button"` | Button-like link |

```html
<a luLink href="/home">Standard Link</a>
<a luLink="button" href="/action">Button Link</a>
```

## Inputs

### `disabled`
Type: `boolean` (default: `false`)

Disables the link (prevents navigation).

```html
<a luLink href="/page" [disabled]="!canNavigate">Link</a>
```

## With Icons

```html
<a luLink href="/settings">
  <lu-icon icon="settings" alt="" />
  Settings
</a>

<a luLink href="/external" target="_blank">
  External Link
  <lu-icon icon="arrowExternal" alt="Opens in new tab" />
</a>
```

## Common Patterns

### Navigation Link
```html
<a luLink routerLink="/users" routerLinkActive="is-active">Users</a>
```

### External Link
```html
<a luLink href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
  <lu-icon icon="arrowExternal" alt="Opens in new tab" />
</a>
```

### Back Link
```html
<a luLink (click)="goBack()">
  <lu-icon icon="arrowLeft" alt="" />
  Back
</a>
```

## Accessibility

- Use `<a>` for navigation, `<button>` for actions
- External links should indicate they open in new tab
- Use `rel="noopener noreferrer"` for external links with `target="_blank"`
