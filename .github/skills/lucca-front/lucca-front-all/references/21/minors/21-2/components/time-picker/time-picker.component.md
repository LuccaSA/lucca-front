# time-picker — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-time-time-picker-angular-form--docs)

## Angular

## Time and Duration picker Angular

## HTML/CSS

### Picker angular

Component selector : `lu-time-picker`

```css
@forward '@lucca-front/scss/src/components/time';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent } from '@lucca-front/ng/time';
```

### Picker basic

```css
@forward '@lucca-front/scss/src/components/time';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<div class="form-field">
	<label for="hour-input" class="formLabel" role="presentation">
		<span aria-hidden="true">Label</span>
	</label>
	<div class="timePicker">
		<fieldset class="timePicker-fieldset">
			<legend><span class="pr-u-mask">Label</span></legend>
			<div class="timePicker-fieldset-group">
				<label class="formLabel pr-u-mask" id="hour-label" for="hour-input">hours</label>
				<div class="timePicker-fieldset-group-textfield">
					<input
						type="text"
						autocomplete="off"
						inputmode="numeric"
						class="timePicker-fieldset-group-textfield-input"
						aria-labelledby="hour-label"
						id="hour-input"
						aria-describedby="helper"
						min="0"
						max="23"
						value="12"
					/>
					<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display">12</span>
				</div>
			</div>
			<div aria-hidden="true" class="timePicker-fieldset-groupSeparator">:</div>
			<div class="timePicker-fieldset-group">
				<label class="formLabel pr-u-mask" id="minutes-label" for="minutes-input">minutes</label>
				<div class="timePicker-fieldset-group-textfield">
					<input
						type="text"
						autocomplete="off"
						inputmode="numeric"
						class="timePicker-fieldset-group-textfield-input"
						aria-labelledby="minutes-label"
						id="minutes-input"
						min="0"
						max="59"
						value="12"
					/>
					<span aria-hidden="true" class="timePicker-fieldset-group-textfield-display">12</span>
				</div>
			</div>
		</fieldset>
	</div>
	<div class="inlineMessage" id="helper">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```
