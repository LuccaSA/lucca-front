# multi-select — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)

## Angular

### Select

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { luCoreSelectTranslations, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { LuMultiSelectInputComponent, luMultiSelectTranslations } from '@lucca-front/ng/multi-select';
```

```html
<lu-form-field>
	<lu-multi-select
		[(ngModel)]="model.example"
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		placeholder="Placeholder"
		clearable
		(panelOpened)="panelOpened()"
		(panelClosed)="panelClosed()"
		(highlightedOption)="highlightedOption($event)"
		(addOption)="addOption($event)"
	/>
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>
```
