# fieldset — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/fieldset';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/grid';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<fieldset class="fieldset" aria-labelledby="fieldsetTitleContent1">
	<legend class="fieldset-title">
		<span class="fieldset-title-content" id="fieldsetTitleContent1">
			<span class="fieldset-title-content-text">Title</span>
		</span>
	</legend>
	<div class="fieldset-content">
		<div class="grid mod-form" style="--grid-colspan: 4">
			<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
				<div class="form-field">
					<label class="formLabel" id="IDlabel1" for="ID1">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID1" class="textField-input-value" aria-labelledby="IDlabel1" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
				<div class="form-field">
					<label class="formLabel" id="IDlabel2" for="ID2">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID2" class="textField-input-value" aria-labelledby="IDlabel2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</fieldset>
```
