# multi-select — Select _(Angular)_

```js
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
```

```html
<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
	<lu-multi-select
		[(ngModel)]="example"
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		placeholder="Placeholder"
		clearable
	/>
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
