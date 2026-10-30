# radiofield — Code & Implementation

**Sommaire**

- Angular
  - Field
- HTML/CSS
  - Field disabled
  - Field inline
  - Field invalid
  - Field size
  - Field


📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)

## Angular

### Field

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RADIO_GROUP_INPUT_ARROW, RADIO_GROUP_INPUT_FRAMED_SIZE, RADIO_GROUP_INPUT_SIZE, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field>
	<lu-radio-group-input [(ngModel)]="model.example">
		<lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
		<lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
		<ng-template #template>
			<strong>Option</strong>
			 text
		</ng-template>
		<lu-radio [value]="3" [inlineMessage]="template" disabled>Option C</lu-radio>
	</lu-radio-group-input>
</lu-form-field>

<pr-story-model-display>{{ model.example }}</pr-story-model-display>
```


## HTML/CSS

### Field disabled

```css
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<fieldset class="form-fieldset">
	<legend class="formLabel">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field">
		<label class="formLabel" for="IDradioA">Option A</label>
		<span class="radioField">
			<input
				disabled="disabled"
				type="radio"
				class="radioField-input"
				id="IDradioA"
				name="radioName1"
				aria-describedby="IDmessageRadioA"
				checked
			/>
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioA">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
	<div class="form-field">
		<label class="formLabel" for="IDradioB">Option B</label>
		<span class="radioField">
			<input
				disabled="disabled"
				type="radio"
				class="radioField-input"
				id="IDradioB"
				name="radioName1"
				aria-describedby="IDmessageRadioB"
			/>
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioB">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
</fieldset>
```

### Field inline

```css
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<fieldset class="form-fieldset mod-inline">
	<legend class="formLabel">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field">
		<label class="formLabel" for="IDradioA">Option A</label>
		<span class="radioField">
			<input
				type="radio"
				class="radioField-input"
				id="IDradioA"
				name="radioName1"
				aria-describedby="IDmessageRadioA"
				checked
			/>
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioA">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
	<div class="form-field">
		<label class="formLabel" for="IDradioB">Option B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName1" aria-describedby="IDmessageRadioB" />
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioB">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
</fieldset>
```

### Field invalid

```css
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<fieldset class="form-fieldset">
	<legend class="formLabel">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field">
		<label class="formLabel" for="IDradioA">Option A</label>
		<span class="radioField">
			<input
				aria-invalid="true"
				type="radio"
				class="radioField-input"
				id="IDradioA"
				name="radioName1"
				aria-describedby="IDmessageRadioA IDmessageRadioGlobal"
				checked
			/>
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioA">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
	<div class="form-field">
		<label class="formLabel" for="IDradioB">Option B</label>
		<span class="radioField">
			<input
				aria-invalid="true"
				type="radio"
				class="radioField-input"
				id="IDradioB"
				name="radioName1"
				aria-describedby="IDmessageRadioB IDmessageRadioGlobal"
			/>
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioB">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
	<div class="inlineMessage is-error" id="IDmessageRadioGlobal">
		<p class="inlineMessage-content">Helper message</p>
	</div>
</fieldset>
```

### Field size

```css
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<fieldset class="form-fieldset mod-S">
	<legend class="formLabel">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field">
		<label class="formLabel" for="IDradioA">Option A</label>
		<span class="radioField">
			<input
				type="radio"
				class="radioField-input"
				id="IDradioA"
				name="radioName1"
				aria-describedby="IDmessageRadioA"
				checked
			/>
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioA">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
	<div class="form-field">
		<label class="formLabel" for="IDradioB">Option B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName1" aria-describedby="IDmessageRadioB" />
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioB">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
</fieldset>
```

### Field

```css
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<fieldset class="form-fieldset">
	<legend class="formLabel">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field">
		<label class="formLabel" for="IDradioA">Option A</label>
		<span class="radioField">
			<input
				type="radio"
				class="radioField-input"
				id="IDradioA"
				name="radioName1"
				aria-describedby="IDmessageRadioA"
				checked
			/>
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioA">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
	<div class="form-field">
		<label class="formLabel" for="IDradioB">Option B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName1" aria-describedby="IDmessageRadioB" />
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioB">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
</fieldset>
```
