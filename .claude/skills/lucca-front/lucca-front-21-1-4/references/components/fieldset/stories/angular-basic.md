# fieldset — Basic _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

```html
@let column = { colspanAtMediaMinXXS: 2 };

<lu-fieldset heading="Title">
	<lu-grid mode="form">
		<lu-grid-column colspan="4" [responsive]="column">
			<lu-form-field label="Label">
				<lu-text-input type="text" [(ngModel)]="example1" />
			</lu-form-field>
		</lu-grid-column>
		<lu-grid-column colspan="4" [responsive]="column">
			<lu-form-field label="Label">
				<lu-text-input type="text" [(ngModel)]="example2" />
			</lu-form-field>
		</lu-grid-column>
	</lu-grid>
</lu-fieldset>
```
