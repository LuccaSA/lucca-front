# User Tile

User tile component for displaying user identity and role.

**Storybook:** [Documentation/Users/User Tile/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [User Tile - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=6053-35161)  
**Node ID:** `6053-35161`

## Import

```typescript
import { LuUserTileComponent } from '@lucca-front/ng/user';
```

## Basic Usage

```html
<lu-user-tile [user]="user" />
```

```typescript
user = {
  firstName: 'Jane',
  lastName: 'Doe',
  jobTitle: 'Product Manager',
  pictureHref: 'https://example.com/avatar.jpg'
};
```

## Inputs

### `user`
Type: `LuUserTileUserInput`

```typescript
interface LuUserTileUserInput {
  firstName: string;
  lastName: string;
  jobTitle?: string | null;
  picture?: { href: string } | null;
  pictureHref?: string | null;
}
```

### `size`
Type: `'L' | 'M' | 'S' | 'XS'` (default: `'M'`)

```html
<lu-user-tile [user]="user" size="S" />
```

### `role`
Type: `string`

```html
<lu-user-tile [user]="user" role="Manager" />
```

### `displayFormat`
Type: `LuDisplayFormat`

Changes display format (e.g. first/last name order).

## Common Patterns

### In Lists
```html
<ul>
  @for (user of users; track user.id) {
    <li><lu-user-tile [user]="user" size="S" /></li>
  }
</ul>
```

### With Actions
```html
<div class="user-row">
  <lu-user-tile [user]="user" />
  <button luButton="ghost">Edit</button>
</div>
```

## Accessibility

- User name is text, not only avatar
- Use descriptive labels when actions are attached

