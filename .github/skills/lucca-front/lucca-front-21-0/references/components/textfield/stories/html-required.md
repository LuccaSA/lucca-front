# textfield — Required _(HTML/CSS)_

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
