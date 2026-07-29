# input-framed — Basic _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, InputFramedComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-form-field label="Label" errorInlineMessage="Error inline message">
	<lu-radio-group-input [(ngModel)]="example" framed required>
		<lu-radio value="A">Option A</lu-radio>
		<lu-radio value="B">Option B</lu-radio>
		<lu-radio value="C" disabled>Option C</lu-radio>
		<lu-radio value="D">Option D</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
```
