# Avatars

Components to display user information.

**Storybook:** `Documentation/Users/Avatar/Angular/Basic`

### Imports

```typescript
import { LuDisplayInitials, LuUserPictureComponent, LuUserPictureModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fields` | `any` | `-` | - |
| `filters` | `any` | `-` | - |
| `orderBy` | `any` | `-` | - |
| `appInstanceId` | `any` | `-` | - |
| `operations` | `any` | `-` | - |
| `enableFormerEmployees` | `any` | `-` | - |
| `disablePrincipal` | `any` | `-` | - |
| `set` | `any` | `-` | - |
| `user` | `LuUserTileUserInput` | `-` | LuUserTileUserInput to display. |
| `role` | `string` | `-` | LuUserTileUserInput role to display |
| `size` | `'L' | 'M' | 'S' | 'XS'` | `-` | Which size should the user tile be? Defaults to medium |

### CSS Classes

| Class | Type |
|-------|------|
| `.userPopover_trigger` | Base |
| `.avatarWrapper` | Base |
| `.avatarWrapper-item` | Base |
| `.mod-placeholder` | Modifier |
| `.mod-AI` | Modifier |
| `.mod-XS` | Modifier |
| `.mod-S` | Modifier |
| `.mod-M` | Modifier |

### When to use

- User display
- Avatars
- Profiles

### When not to use

- Non-user related data

### Accessibility

- Provide alternative text for avatars
- Do not rely solely on images
