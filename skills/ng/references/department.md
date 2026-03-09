# Department

Components for user data input and validation.

**Storybook:** `Documentation/Forms/DepartmentSelect`

### Imports

```typescript
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `set` | `any` | `-` | - |
| `appInstanceId` | `any` | `-` | - |
| `operations` | `any` | `-` | - |
| `filters` | `any` | `-` | - |
| `uniqueOperation` | `any` | `-` | - |

### CSS Classes

| Class | Type |
|-------|------|
| `.textfield` | Base |
| `.textfield-input` | Base |
| `.textfield-label` | Base |
| `.mod-inline` | Modifier |

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
