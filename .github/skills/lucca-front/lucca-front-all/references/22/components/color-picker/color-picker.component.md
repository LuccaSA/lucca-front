# color-picker — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)

## Angular

Component selector : `lu-color-input`

### Configuration des couleurs

Les couleurs disponibles dans le color picker sont à renseigner dans `colors` via un tableau d'objets :

### Input field

```js
import { colorDecoratives500 } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { useStoryModel, createTestStory, generateInputs, setStoryOptions } from '../../../../../helpers/stories';
import { waitForAngular } from '../../../../../helpers/test';
```

```html
<lu-form-field ${…}>
	<lu-color-input [(ngModel)]="model.example" [colors]="colors" ${…} />
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>
```
