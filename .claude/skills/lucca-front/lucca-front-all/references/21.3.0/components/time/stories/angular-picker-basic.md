# time — Picker basic _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { BASE_PICKER_SIZE, TimePickerComponent } from '@lucca-front/ng/time';
```

```html
<lu-form-field
	[label]="labelID"
	[rolePresentationLabel]="true"
	tooltip="Tooltip message"
	inlineMessage="Helper message"
	inlineMessageState="default"
>
	<lu-time-picker
		label="Label"
		required
		step="PT1M"
		max="23:59:59"
		[forceMeridiemDisplay]="undefined"
		[(ngModel)]="example"
	/>
	<ng-template #labelID>
		<span aria-hidden="true">Label</span>
	</ng-template>
</lu-form-field>

<pr-story-model-display>{{ example }}</pr-story-model-display>
```
