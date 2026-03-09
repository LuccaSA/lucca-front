# Modal

Components displayed above the main content.

**Storybook:** `Documentation/Overlays/Modal`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { ILuModalContent, LU_MODAL_DATA, LuModal, LuModalConfig, LuModalModule } from '@lucca-front/ng/modal';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `any` | `-` | - |

### Examples

```html
<p>General Kenobi</p>
```

### When to use

- Important confirmations
- Contextual forms
- Additional information

### When not to use

- Main page content
- Frequent navigation

### Accessibility

- Manage focus trap in modals
- Allow closing with Escape
- Announce opening to screen readers
- Use aria-modal and role="dialog"
