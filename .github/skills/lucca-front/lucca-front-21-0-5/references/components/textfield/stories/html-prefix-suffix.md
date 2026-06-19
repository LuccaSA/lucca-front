# textfield — Prefix suffix _(HTML/CSS)_

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
