# textfield — Field search clear _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/input';
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
