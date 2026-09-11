# phonenumberfield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-phonenumberfield-angular--docs)

## Angular

Component selector : `lu-phone-number-input`

### Number input

```js
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FormFieldComponent } from '@lucca-front/ng/form-field';
import { PHONE_NUMBER_INPUT_AUTOCOMPLETE, PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field
	[rolePresentationLabel]="true"
	label="Phone"
	tooltip="Tooltip message"
	inlineMessage="Helper message"
	inlineMessageState="default"
	errorInlineMessage="Invalid Phone Number"
>
	<lu-phone-number-input label="Phone" [country]="country" [(ngModel)]="model.example" #result="ngModel" required />
</lu-form-field>
@if (result.invalid && result.errors.validPhoneNumber) {
	<div>{{ result.errors.validPhoneNumber }}</div>
}
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
```
