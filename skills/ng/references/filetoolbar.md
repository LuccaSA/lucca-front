# FileToolbar

Components for user data input and validation.

**Storybook:** `Documentation/File/FileToolbar/HTML&CSS/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```

### CSS Classes

| Class | Type |
|-------|------|
| `.fileToolbar-list-item` | Base |
| `.fileToolbar-list-item-button` | Base |
| `.fileToolbar-list-item-button-icon` | Base |

### When to use

- Data entry
- Forms
- Configuration
- Filters

### When not to use

- Read-only data display
- Navigation

### Accessibility

- Associate each field with a label using for/id
- Provide explicit error messages
- Support keyboard navigation
- Indicate required fields
