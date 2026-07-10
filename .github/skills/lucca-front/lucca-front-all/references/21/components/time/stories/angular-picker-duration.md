# time — Picker duration _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { BASE_PICKER_SIZE, DurationPickerComponent } from '@lucca-front/ng/time';
```

```html
<lu-form-field
	[rolePresentationLabel]="true"
	label="Label"
	tooltip="Tooltip message"
	inlineMessage="Helper message"
	inlineMessageState="default"
>
	<lu-duration-picker label="Label" required step="PT1M" max="PT99H" [(ngModel)]="example" />
</lu-form-field>

<pr-story-model-display>{{ example }}</pr-story-model-display>
```
