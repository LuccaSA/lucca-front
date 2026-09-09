# form-field — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

## Angular

Mots-clés : champ, formulaire, form-field, input

Component selector : `lu-form-field`

### Field

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_WIDTH, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field
	extraDescribedBy="extra-message"
	label="Label"
	inlineMessage="Helper text"
	errorInlineMessage="Error helper text"
	inlineMessageState="default"
	tooltip="You expected me to be helpful but this is a story!"
>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				required
				[(ngModel)]="model.example"
				placeholder="Placeholder"
			></textarea>
		</div>
	</div>
</lu-form-field>
```

## HTML/CSS

Classe CSS : `.form-field`
