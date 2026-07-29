# switchfield — Field _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, SwitchInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
	<lu-switch-input [(ngModel)]="example" required />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```
