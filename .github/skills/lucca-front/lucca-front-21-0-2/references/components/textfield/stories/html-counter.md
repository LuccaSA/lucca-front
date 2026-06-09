# textfield — Counter _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/input';
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
