# radiofield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)

## Angular

### Utilisation

Au sein de votre template, l'utilisation de l'input radio se fait via deux composants distincts:

- `lu-radio-group-input` qui gère le lien entre chaque radio et qui porte le `formControl`.
- `lu-radio` qui permet de lister les options.

Exemple:

Comme tous les `lu-***-input`, il est recommandé de les utiliser dans un `lu-form-field` même si vous n'avez pas de label à afficher, afin d'assurer une bonne accessibilité (le label est obligatoire mais vous pouvez le rendre caché pour que seules les technologies d'assistance puissent le voir).

#### lu-radio

Le composant `lu-radio` porte les valeurs, les options que vous souhaitez proposer.

Il vous permet d'assigner une valeur via `[value]` et le label affiché vient se placer au sein de la balise, en tant que contenu projeté. Si vous souhaitez ajouter un texte sous le label, vous pouvez le faire via `inlineMessage`, uniquement en `string`.

Il est également possible de désactiver une option via l'input `disabled` sur celle-ci.

### Radiofield

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
```

## HTML/CSS

### Disabled

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/radioField';
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

### Inline

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/radioField';
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

### Invalid

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/radioField';
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

### Size

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/radioField';
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

### Radiofield

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/radioField';
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
