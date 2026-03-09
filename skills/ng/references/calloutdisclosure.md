# CalloutDisclosure

Components to communicate information and states to the user.

**Storybook:** `Documentation/Feedback/Callout Disclosure/Angular`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutDisclosureComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
```

### Examples

```html
<lu-callout-disclosure ......>
<ul lu-callout-feedback-list palette=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.calloutDisclosure` | Base |
| `.calloutDisclosure-summary` | Base |
| `.calloutDisclosure-summary-icon` | Base |
| `.mod-outlined` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-iconless` | Modifier |
| `.mod-S` | Modifier |

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
