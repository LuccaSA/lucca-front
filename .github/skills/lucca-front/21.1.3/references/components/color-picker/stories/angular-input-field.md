# color-picker — Input field _(Angular)_

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
