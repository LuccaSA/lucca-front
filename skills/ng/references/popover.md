# Popover

Components to display user information.

**Storybook:** `Documentation/Users/Popover/Angular`

### Imports

```typescript
import { ILuUser } from '@lucca-front/ng/user';
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
| `.lu-popover-content` | Base |
| `.userPopover` | Base |
| `.mod-S` | Modifier |
| `.mod-circle` | Modifier |
| `.is-loading` | State |

### When to use

- User display
- Avatars
- Profiles

### When not to use

- Non-user related data

### Accessibility

- Provide alternative text for avatars
- Do not rely solely on images
