# multi-select — Select _(Angular)_

```js
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
```

```html
<lu-form-field ${…}>
	<lu-multi-select
		[(ngModel)]="example"
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		${…}
	/>
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
