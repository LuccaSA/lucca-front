# input-framed — Tag _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/input';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/tag';
```

```html
<div class="inputFramed">
	<div class="inputFramed-header">
		<div class="form-field inputFramed-header-field">
			<label class="formLabel inputFramed-header-label" id="radioAlabel" for="optionA">
				Option A
				<span class="formLabel-tag tag">Tag</span>
			</label>
			<span class="radioField">
				<input
					type="radio"
					class="radioField-input inputFramed-header-input"
					aria-labelledby="radioAlabel"
					id="optionA"
					name="radioGroup"
				/>
				<span aria-hidden="true" class="radioField-icon">
					<span class="radioField-icon-check"></span>
				</span>
			</span>
		</div>
	</div>
</div>
```
