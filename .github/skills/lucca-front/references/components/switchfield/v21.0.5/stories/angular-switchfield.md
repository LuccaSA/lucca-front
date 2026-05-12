# switchfield — Switchfield _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, SwitchInputComponent } from '@lucca-front/ng/forms';
```

```html
<lu-form-field${…}>
	<lu-switch-input [(ngModel)]="example"${…} />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```
