# textfield — Width _(HTML/CSS)_

<callout background="1">

Les champs de formulaires sont pensés pour être utilisés dans une [grille](https://prisme.lucca.io/94310e217/p/2143a6-formulaires/b/09c8d5). L'option largeur permet de forcer une largeur pour des petits formulaires où la grille serait trop lourde à utiliser.

</callout>

```css
@forward '@lucca-front/scss/src/components/input';
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
