# duration-picker — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-time-duration-picker-angular-form--docs)

## Angular

### Picker angular

Component selector : `lu-duration-picker`

```js
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { DurationPickerComponent } from '@lucca-front/ng/time';
```

```html
<lu-form-field
	[rolePresentationLabel]="true"
	label="Label"
	tooltip="Tooltip message"
	inlineMessage="Helper message"
	inlineMessageState="default"
>
	<lu-duration-picker label="Label" required step="PT1M" [(ngModel)]="example"></lu-duration-picker>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```
