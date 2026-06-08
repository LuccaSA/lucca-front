# simple-select — Select _(Angular)_

```js
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
```

```html
<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
	<lu-simple-select
		placeholder="Placeholder"
		clearable
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		[(ngModel)]="example"
	></lu-simple-select>
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
