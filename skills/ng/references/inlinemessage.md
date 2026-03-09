# InlineMessage

Components for user data input and validation.

**Storybook:** `Documentation/Forms/InlineMessage/Angular/Basic`

### Imports

```typescript
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `state` | `InlineMessageState` | `-` | Inline message state |
| `size` | `'S' | 'M'` | `-` | Which size should the inline message be? Default, medium or small |

### CSS Classes

| Class | Type |
|-------|------|
| `.inlineMessage` | Base |
| `.inlineMessage-content` | Base |
| `.lucca-icon` | Base |
| `.mod-S` | Modifier |
| `.is-success` | State |
| `.is-warning` | State |
| `.is-error` | State |

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
