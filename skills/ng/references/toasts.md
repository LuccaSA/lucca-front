# Toasts

Components displayed above the main content.

**Storybook:** `Documentation/Overlays/Toasts`

### Imports

```typescript
import { LuToastInput, LuToastType, LuToastsComponent, LuToastsService, defaultToastDuration } from '@lucca-front/ng/toast';
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
