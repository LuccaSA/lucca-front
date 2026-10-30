# multilanguagefield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)

## Angular

### Field

```js
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { luMultilanguageInputTranslations, MultilanguageInputComponent, MultilanguageTranslation } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field>
	<lu-multilanguage-input
		[formControl]="formControl"
		placeholder="Placeholder"
		(translateWithAI)="onTranslateWithAI($event)"
	/>
</lu-form-field>
<pr-story-model-display>{{ formControl.value | json }}</pr-story-model-display>
```
