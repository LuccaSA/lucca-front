# textfield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-forms-fields-textfield-angular--docs)

## Angular

### Textfield

### ngx-mask

[NPM documentation](https://www.npmjs.com/package/ngx-mask/v/16.0.9)

[Live documentation](https://jsdaddy.github.io/ngx-mask/#1)

```js
import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LOCALE_ID } from '@angular/core';
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

## HTML/CSS

### AI

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="form-field-contentOptional">
		<div class="textField">
			<div class="textField-input">
				<input
					type="text"
					id="ID"
					class="textField-input-value"
					aria-labelledby="IDlabel"
					aria-describedby="IDmessage"
					placeholder="Placeholder"
					aria-invalid="false"
				/>
			</div>
		</div>
		<!-- tooltip here -->
		<span
			role="button"
			tabindex="0"
			aria-hidden="true"
			class="pr-u-focusVisible pr-u-borderRadiusSmall lucca-icon mod-AI mod-S icon-weatherStars"
		></span>
		<span class="pr-u-mask">Assistant IA</span>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Counter

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel mod-counter" id="IDlabel" for="ID">
		Label
		<span class="formLabel-counter" id="IDcounter" aria-live="polite">
			<span aria-hidden="true">8/88</span>
			<span class="pr-u-mask">Votre publication fait 8 caractères de long. 88 caractères maximum sont autorisés.</span>
		</span>
	</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDcounter IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Disabled

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
				disabled
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Info

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">
		Label
		<span class="formLabel-info">
			<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
			<span class="pr-u-mask">?</span>
		</span>
	</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Invalid

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="true"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Error message</p>
	</div>
</div>
```

### Prefix suffix

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<span class="textField-prefix" id="IDprefix">
			<span class="textField-label-prefix-item">$</span>
		</span>
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDprefix IDlabel IDsuffix"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
				value="Value"
			/>
		</div>
		<span class="textField-suffix" id="IDsuffix">
			<span class="textField-label-suffix-item" aria-label="euros par jour">€/j</span>
		</span>
	</div>
</div>
```

### Required

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
				aria-required="true"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Search clear

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
				value="Value"
			/>
			<div class="textField-input-affix">
				<button class="textField-input-affix-clear clear">
					<span class="pr-u-mask">Vider ce champ</span>
				</button>
				<span aria-hidden="true" class="textField-input-affix-icon lucca-icon icon-searchMagnifyingGlass"></span>
			</div>
		</div>
	</div>
</div>
```

### Sizes

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field mod-S">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
<div class="form-field mod-XS">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### ValueAlignRight

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField mod-valueAlignRight">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Width

<callout background="1">

Les champs de formulaires sont pensés pour être utilisés dans une [grille](https://prisme.lucca.io/94310e217/p/2143a6-formulaires/b/09c8d5). L'option largeur permet de forcer une largeur pour des petits formulaires où la grille serait trop lourde à utiliser.

</callout>

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field mod-width20">
	<label class="formLabel" id="ID20label" for="ID20">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID20"
				class="textField-input-value"
				aria-labelledby="ID20label"
				aria-describedby="ID20message"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="ID20message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
<div class="form-field mod-width30">
	<label class="formLabel" id="ID30label" for="ID30">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID30"
				class="textField-input-value"
				aria-labelledby="ID30label"
				aria-describedby="ID30message"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="ID30message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
<div class="form-field mod-width40">
	<label class="formLabel" id="ID40label" for="ID40">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID40"
				class="textField-input-value"
				aria-labelledby="ID40label"
				aria-describedby="ID40message"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="ID40message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
<div class="form-field mod-width50">
	<label class="formLabel" id="ID50label" for="ID50">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID50"
				class="textField-input-value"
				aria-labelledby="ID50label"
				aria-describedby="ID50message"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="ID50message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
<div class="form-field mod-width60">
	<label class="formLabel" id="ID60label" for="ID60">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID60"
				class="textField-input-value"
				aria-labelledby="ID60label"
				aria-describedby="ID60message"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="ID60message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```

### Textfield

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input
				type="text"
				id="ID"
				class="textField-input-value"
				aria-labelledby="IDlabel"
				aria-describedby="IDmessage"
				placeholder="Placeholder"
				aria-invalid="false"
			/>
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```
