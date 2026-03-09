# Display

Components to display user information.

**Storybook:** `Documentation/Users/Display/Basic`

### Imports

```typescript
import { ILuUser, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials, LuUserDisplayModule } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca-front/ng/button';
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
| `displayFormat` | `'...Object.values(LuDisplayFullname)'...` | `-` | - |

### CSS Classes

| Class | Type |
|-------|------|
| `.userPopover_trigger` | Base |

### When to use

- User display
- Avatars
- Profiles

### When not to use

- Non-user related data

### Accessibility

- Provide alternative text for avatars
- Do not rely solely on images
