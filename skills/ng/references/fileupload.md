# FileUpload

Components for user data input and validation.

**Storybook:** `Documentation/File/FileUpload/Angular/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { FileEntry, FileEntryComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
```

### Examples

```html
<lu-form-field label=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.fileEntryDisplayWrapper` | Base |

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
