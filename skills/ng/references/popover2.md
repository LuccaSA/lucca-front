# Popover2

Components displayed above the main content.

**Storybook:** `Documentation/Overlays/Popover2/Angular`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
```

### CSS Classes

| Class | Type |
|-------|------|
| `.demo` | Base |
| `.popover-contentOptional` | Base |
| `.verticalNavigation` | Base |
| `.mod-iconless` | Modifier |

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
