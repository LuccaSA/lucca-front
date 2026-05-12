# textfield — Field _(Angular)_

### ngx-mask

[NPM documentation](https://www.npmjs.com/package/ngx-mask/v/16.0.9)

[Live documentation](https://jsdaddy.github.io/ngx-mask/#1)

```js
import { AsyncPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
```

```html
<lu-form-field ${…}>
	<lu-text-input ${…} type="password" [(ngModel)]="example"></lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```
