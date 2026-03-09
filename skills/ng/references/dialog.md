# Dialog

Components displayed above the main content.

**Storybook:** `Documentation/Overlays/Dialog/Basic`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderComponent, LuDialogRef, LuDialogService, configureLuDialog, injectDialogData, injectDialogRef, provideLuDialog, DialogCloseDirective, DialogHeaderAction, DialogOpenDirective, LuDialogConfig, DIALOG_ROUTE_DISMISS_TRIGGER, dialogRouteFactory, provideDialogRoutingReuseStrategy } from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { CheckboxInputComponent, TextInputComponent, NumberInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { LinkComponent } from '@lucca-front/ng/link';
```

### Examples

```html
<lu-dialog>
<lu-dialog-header>Header</lu-dialog-header>
<lu-dialog-content>
<lu-form-field label=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.dialog_backdrop` | Base |
| `.dialog-inside` | Base |
| `.dialog-inside-formOptional` | Base |
| `.mod-ghost` | Modifier |
| `.mod-drawer` | Modifier |
| `.mod-fromBottom` | Modifier |

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
