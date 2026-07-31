# color-picker — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)

## Angular

Component selector : `lu-color-input`

### Configuration des couleurs

Les couleurs disponibles dans le color picker sont à renseigner dans `colors` via un tableau d'objets : 

Il est possible d'associer une couleur de bordure à chaque couleur :

### Input field

```js
import { colorDecoratives500 } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent } from '@lucca-front/ng/forms';
import { generateInputs } from '../../../../../helpers/stories';
```

```html
<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
	<lu-color-input [(ngModel)]="example" [colors]="colors" clearable />
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
