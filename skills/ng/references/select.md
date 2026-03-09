# Select

Components to display user information.

**Storybook:** `Documentation/Users/Select/Homonymes`

### Imports

```typescript
import { LuApiPagedSearcherComponent } from '@lucca-front/ng/api';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuForOptionsDirective, LuOptionItemComponent, LuOptionPickerAdvancedComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuUserDisplayPipe, LuUserHomonymsComponent, LuUserMeOptionDirective, ILuUser, LuUserSelectModule, LuUserModule } from '@lucca-front/ng/user';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `set` | `any` | `-` | - |
| `standard` | `any` | `-` | - |
| `api` | `any` | `-` | - |
| `fields` | `any` | `-` | - |
| `filters` | `any` | `-` | - |
| `orderBy` | `any` | `-` | - |
| `sort` | `any` | `-` | - |
| `debounceTime` | `any` | `-` | - |

### CSS Classes

| Class | Type |
|-------|------|
| `.textfield` | Base |
| `.textfield-input` | Base |
| `.lu-picker-content-option` | Base |
| `.mod-block` | Modifier |

### When to use

- User display
- Avatars
- Profiles

### When not to use

- Non-user related data

### Accessibility

- Provide alternative text for avatars
- Do not rely solely on images
