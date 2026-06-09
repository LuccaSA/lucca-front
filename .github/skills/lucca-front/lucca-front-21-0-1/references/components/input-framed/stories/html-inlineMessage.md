# input-framed — InlineMessage _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/input';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/radioField';
```

```html
<div class="inputFramedWrapper">
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="radioAlabel" for="optionA">Option A</label>
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
				<div class="inlineMessage">
					<p class="inlineMessage-content">Lorem ipsum dolor</p>
				</div>
			</div>
		</div>
	</div>
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="radioBlabel" for="optionB">Option B</label>
				<span class="radioField">
					<input
						type="radio"
						class="radioField-input inputFramed-header-input"
						aria-labelledby="radioBlabel"
						id="optionB"
						name="radioGroup"
					/>
					<span aria-hidden="true" class="radioField-icon">
						<span class="radioField-icon-check"></span>
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
