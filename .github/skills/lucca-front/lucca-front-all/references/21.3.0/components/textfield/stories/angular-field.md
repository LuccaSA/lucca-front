# textfield — Field _(Angular)_

### ngx-mask

[NPM documentation](https://www.npmjs.com/package/ngx-mask/v/16.0.9)

[Live documentation](https://jsdaddy.github.io/ngx-mask/#1)

```js
import { AsyncPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field
	label="Label"
	tooltip="Je suis un message d’aide"
	inlineMessage="Helper text"
	inlineMessageState="default"
	counter="0"
	iconAItooltip="Donnée remplie automatiquement"
	iconAIalt="Assistant IA"
>
	<lu-text-input required placeholder="Placeholder" [(ngModel)]="example"></lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```

```html
<lu-form-field
	label="Label"
	tooltip="Je suis un message d’aide"
	inlineMessage="Helper text"
	inlineMessageState="default"
	counter="0"
>
	<lu-text-input
		required
		placeholder="Placeholder"
		[(ngModel)]="example"
		mask="SS00 AAAA 0000 0000 0000 9999 9999 9999 99"
	></lu-text-input>
</lu-form-field>
{{ example }}
```

```html
<lu-form-field
	label="Label"
	tooltip="Je suis un message d’aide"
	inlineMessage="Helper text"
	inlineMessageState="default"
	counter="0"
>
	<lu-text-input required hasClearer placeholder="Placeholder" type="password" [(ngModel)]="example"></lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```

```html
<lu-form-field
	label="Label"
	tooltip="Tooltip message"
	inlineMessage="Helper text"
	inlineMessageState="default"
	counter="0"
>
	<lu-text-input
		required
		placeholder="Placeholder"
		[prefix]="prefix"
		[suffix]="suffix"
		[(ngModel)]="example"
	></lu-text-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```

```html
<lu-form-field AI label="Label" iconAItooltip="Donnée remplie automatiquement" iconAIalt="Assistant IA">
	<lu-text-input [(ngModel)]="example" />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```
