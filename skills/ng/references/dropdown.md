# Dropdown

Components displayed above the main content.

**Storybook:** `Documentation/Overlays/Dropdown/Angular/Basic`

### Imports

```typescript
import { LuDropdownModule, LuDropdownTriggerDirective, DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent } from '@lucca-front/ng/dropdown';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverPosition } from '@lucca-front/ng/popover2';
```

### CSS Classes

| Class | Type |
|-------|------|
| `.button` | Base |
| `.dropdown-list-option` | Base |
| `.dropdown-list-option-action` | Base |
| `.mod-critical` | Modifier |
| `.is-disabled` | State |

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
