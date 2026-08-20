# switchfield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-fields-switchfield-angular--docs)

## Angular

Component selector : `lu-switch-input`

### Field

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, SwitchInputComponent } from '@lucca-front/ng/forms';
```

```html
<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
	<lu-switch-input [(ngModel)]="example" required />
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```

## HTML/CSS

### Field disabled

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/switchField';
```

```html
<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" aria-describedby="IDmessage" disabled />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Field invalid

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/switchField';
```

```html
<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" aria-describedby="IDmessage" aria-invalid="true" />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Field size

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/switchField';
```

```html
<div class="form-field mod-S">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" aria-describedby="IDmessage" />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Field

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/switchField';
```

```html
<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" aria-describedby="IDmessage" />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```
