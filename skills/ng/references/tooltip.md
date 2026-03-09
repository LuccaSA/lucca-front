# Tooltip

Components displayed above the main content.

**Storybook:** `Documentation/Overlays/Tooltip/Ellipsis tests`

### Imports

```typescript
import { LuTooltipModule, LuTooltipTriggerDirective, LuTooltipPanelComponent } from '@lucca-front/ng/tooltip';
import { IconComponent } from '@lucca-front/ng/icon';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `luTooltipEnterDelay` | `number` | `-` | - |
| `table` | `any` | `-` | - |

### Examples

```html
<h1>With ellipsis after few seconds</h1>
<div class=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.test` | Base |
| `.ellipsis` | Base |
| `.width400` | Base |

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
