# ListboxOption

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Listbox Option/Angular/Add option`

### Imports

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent, Treeitem } from '@lucca-front/ng/listbox';
import { LoadingComponent } from '@lucca-front/ng/loading';
```

### CSS Classes

| Class | Type |
|-------|------|
| `.listboxOption` | Base |
| `.listboxOption-content` | Base |
| `.listboxOption-content-checkboxField` | Base |
| `.mod-add` | Modifier |
| `.mod-select` | Modifier |
| `.is-hovered` | State |

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
