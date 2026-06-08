# textfield — Sizes _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/input';
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
