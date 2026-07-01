# color-picker — Input field _(Angular)_

```js
import { colorDecoratives500 } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
import { createTestStory, generateInputs, setStoryOptions } from '../../../../../helpers/stories';
import { waitForAngular } from '../../../../../helpers/test';
```

```html
<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
	<lu-color-input [(ngModel)]="example" [colors]="colors" clearable />
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
