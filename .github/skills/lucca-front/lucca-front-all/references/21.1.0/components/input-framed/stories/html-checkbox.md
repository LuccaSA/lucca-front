# input-framed — Checkbox _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/input';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/inputFramed';
```

```html
<div class="inputFramedWrapper">
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="checkboxAlabel" for="optionA">Option A</label>
				<span class="checkboxField">
					<input
						type="checkbox"
						class="checkboxField-input inputFramed-header-input"
						aria-labelledby="checkboxAlabel"
						id="optionA"
					/>
					<span aria-hidden="true" class="checkboxField-icon">
						<span class="checkboxField-icon-check"></span>
					</span>
				</span>
				<div class="inlineMessage">
					<p class="inlineMessage-content">Lorem ipsum dolor</p>
				</div>
			</div>
		</div>
	</div>
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="checkboxBlabel" for="optionB">Option B</label>
				<span class="checkboxField">
					<input
						type="checkbox"
						class="checkboxField-input inputFramed-header-input"
						aria-labelledby="checkboxBlabel"
						id="optionB"
					/>
					<span aria-hidden="true" class="checkboxField-icon">
						<span class="checkboxField-icon-check"></span>
					</span>
				</span>
				<div class="inlineMessage">
					<p class="inlineMessage-content">Lorem ipsum dolor</p>
				</div>
			</div>
		</div>
	</div>
</div>
```
