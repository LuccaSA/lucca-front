# simple-select — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-simple-select-angular--docs)

## Angular

### Select

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { luCoreSelectTranslations, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { LuSimpleSelectInputComponent, luSimpleSelectTranslations } from '@lucca-front/ng/simple-select';
```

```html
<lu-form-field>
	<lu-simple-select
		placeholder="Placeholder"
		clearable
		(panelOpened)="panelOpened()"
		(panelClosed)="panelClosed()"
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		[(ngModel)]="model.example"
	></lu-simple-select>
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>
```
