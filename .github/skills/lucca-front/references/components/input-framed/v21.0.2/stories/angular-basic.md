# input-framed — Basic _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, InputFramedComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-form-field label="Label" layout="fieldset">
	<div class="inputFramedWrapper">
		<lu-grid columns="2">${…}</lu-grid>
	</div>
</lu-form-field>
```

```html
<lu-form-field label="Label" layout="fieldset">
	<div class="inputFramedWrapper">${…}</div>
</lu-form-field>
```

```html
<lu-form-field label="Label" errorInlineMessage="Error inline message">
	<lu-radio-group-input [(ngModel)]="example" framed required${…}${…}>
		<lu-grid columns="2">${…}</lu-grid>
	</lu-radio-group-input>
</lu-form-field>
```

```html
<lu-form-field label="Label" errorInlineMessage="Error inline message">
	<lu-radio-group-input [(ngModel)]="example" framed required${…}${…}>
		${…}
	</lu-radio-group-input>
</lu-form-field>
```
