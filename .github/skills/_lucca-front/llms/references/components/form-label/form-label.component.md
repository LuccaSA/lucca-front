# form-label — Code & Implementation

**Sommaire**

- Angular
  - Label basic
- HTML/CSS
  - Label basic
  - Label counter
  - Label error
  - Label size


📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-form-label-angular-basic--docs)

## Angular

### Label basic

```js
import { LOCALE_ID } from '@angular/core';
import { FORM_LABEL_SIZE, FormLabelComponent, luFormLabelTranslations } from '@lucca-front/ng/form-label';
```

```html
<label luFormLabel for="inputID">Label</label>
```


## HTML/CSS

### Label basic

```css
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/tag';
```

```html
<label class="formLabel">
	Label
	<sup class="formLabel-required" aria-hidden="true">*</sup>
	<span class="formLabel-info">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">?</span>
	</span>
	<span class="formLabel-tag tag">Tag</span>
</label>
```

### Label counter

```css
@forward '@lucca-front/scss/src/components/formLabel';
```

```html
<label class="formLabel mod-counter" id="IDlabel" for="ID">
	Label
	<sup class="formLabel-required" aria-hidden="true">*</sup>
	<span class="formLabel-info">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">?</span>
	</span>
	<span class="formLabel-counter" id="IDcounter" aria-live="polite">
		<span aria-hidden="true">7/77</span>
		<span class="pr-u-mask">7 sur 77 caractères autorisés.</span>
	</span>
</label>
```

### Label error

```css
@forward '@lucca-front/scss/src/components/formLabel';
```

```html
<label class="formLabel is-error">
	Label
	<sup class="formLabel-required" aria-hidden="true">*</sup>
	<span class="formLabel-info">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">?</span>
	</span>
</label>
```

### Label size

```css
@forward '@lucca-front/scss/src/components/formLabel';
```

```html
<label class="formLabel mod-S">
	Label
	<sup class="formLabel-required" aria-hidden="true">*</sup>
	<span class="formLabel-info">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">?</span>
	</span>
</label>
<label class="formLabel mod-XS">
	Label
	<sup class="formLabel-required" aria-hidden="true">*</sup>
	<span class="formLabel-info">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">?</span>
	</span>
</label>
```
