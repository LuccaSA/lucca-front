# CalloutPopover

Components to communicate information and states to the user.

**Storybook:** `Documentation/Feedback/Callout Popover/Angular`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent, CalloutPopoverComponent } from '@lucca-front/ng/callout';
```

### Examples

```html
<lu-callout-popover...>
<ul lu-callout-feedback-list palette=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.calloutPopover` | Base |
| `.calloutPopover-icon` | Base |
| `.lucca-icon` | Base |
| `.mod-outlined` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-S` | Modifier |
| `.mod-XS` | Modifier |

### When to use

- Success/error messages
- Important alerts
- Contextual information

### When not to use

- Main content
- User actions

### Accessibility

- Use aria-live for dynamic messages
- Associate appropriate role (alert, status)
- Do not rely solely on color
