# time — Range picker _(Angular)_

```js
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent, TimeRangePickerComponent } from '@lucca-front/ng/time';
import { generateInputs } from '../../../../helpers/stories';
```

```html
<lu-form-field label="Period" inlineMessage="Helper message" inlineMessageState="default">
	<lu-time-range-picker step="PT1M" max="23:59:59" [forceMeridiemDisplay]="false" [(ngModel)]="example" />
</lu-form-field>

<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
