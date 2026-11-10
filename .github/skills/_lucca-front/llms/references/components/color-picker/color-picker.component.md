# color-picker — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)

## Angular

Component selector : `lu-color-input`

### Configuration des couleurs

Les couleurs disponibles dans le color picker sont à renseigner dans `colors` via un tableau d'objets :

### Input field

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, luColorTranslations } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field>
	<lu-color-input [(ngModel)]="model.example" [colors]="colors" clearable />
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>
```
