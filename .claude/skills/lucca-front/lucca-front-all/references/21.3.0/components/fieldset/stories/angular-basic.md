# fieldset — Basic _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FIELDSET_SIZE, FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

```html
<form luForm>
	<lu-fieldset heading="Title">
		<lu-grid mode="form">
			<lu-grid-column colspan="2">
				<lu-form-field label="Label">
					<lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="2">
				<lu-form-field label="Label">
					<lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" />
				</lu-form-field>
			</lu-grid-column>
		</lu-grid>
	</lu-fieldset>
</form>
```
