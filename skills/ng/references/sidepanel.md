# Sidepanel

Components displayed above the main content.

**Storybook:** `Documentation/Overlays/Sidepanel`

### Imports

```typescript
import { ILuModalContent, LuModal, LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
```

### Examples

```html
<p>General Kenobi</p>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.button` | Base |
| `.mod-outlined` | Modifier |

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
