# form-field — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

## Angular

### Field

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_LAYOUT, FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent, InputDirective, luFormFieldTranslations } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field
	label="Label"
	inlineMessage="Helper text"
	errorInlineMessage="Error helper text"
	tooltip="You expected me to be helpful but this is a story!"
	iconAIalt="Assistant IA"
	iconAItooltip="Donnée remplie automatiquement"
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
