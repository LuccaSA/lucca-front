# Avatar (User Picture)

User avatar component showing a picture or initials.

**Storybook:** [Documentation/Users/Avatar/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Avatar - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=3107-7885)  
**Node ID:** `3107-7885`

## Import

```typescript
import { LuUserPictureComponent } from '@lucca-front/ng/user';
```

## Basic Usage

```html
<lu-user-picture [user]="user" />
```

## Inputs

### `user`
Type: `LuUserPictureUserInput`

```typescript
user = { firstName: 'Jane', lastName: 'Doe', pictureHref: 'https://...' };
```

### `size`
Type: `'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'`

```html
<lu-user-picture [user]="user" size="XL" />
```

### `AI`
Type: `boolean` (default: `false`)

```html
<lu-user-picture [user]="user" AI />
```

## Common Patterns

### With Popover
```html
<button type="button" [luUserPopover]="user">
  <lu-user-picture [user]="user" size="S" />
</button>
```

