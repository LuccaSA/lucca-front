# time — Picker range _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/time';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<div class="form-field">
	<label for="start-hour-input" class="formLabel" role="presentation">
		<span aria-hidden="true">Label</span>
	</label>
	<div class="timePicker">
		<div class="timePicker-fieldset">
			<div class="timePicker">
				<fieldset class="timePicker-fieldset">
					<legend><span class="pr-u-mask">Label (start)</span></legend>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="start-hour-label" for="start-hour-input">Hours</label>
						<div class="timePicker-fieldset-group-textfield">
							<input
								type="text"
								autocomplete="off"
								inputmode="numeric"
								class="timePicker-fieldset-group-textfield-input"
								aria-labelledby="start-hour-label"
								id="start-hour-input"
								aria-describedby="helper"
								min="0"
								max="23"
								value="12"
							/>
							<span
								aria-hidden="true"
								class="timePicker-fieldset-group-textfield-display"
								data-content-before="12"
							></span>
						</div>
					</div>
					<div aria-hidden="true" class="timePicker-fieldset-groupSeparator" data-content-before=":"></div>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="start-minutes-label" for="start-minutes-input">Minutes</label>
						<div class="timePicker-fieldset-group-textfield">
							<input
								type="text"
								autocomplete="off"
								inputmode="numeric"
								class="timePicker-fieldset-group-textfield-input"
								aria-labelledby="start-minutes-label"
								id="start-minutes-input"
								min="0"
								max="59"
								value="12"
							/>
							<span
								aria-hidden="true"
								class="timePicker-fieldset-group-textfield-display"
								data-content-before="12"
							></span>
						</div>
					</div>
				</fieldset>
			</div>
			<label role="presentation" for="end-hour-input" class="timePicker-arrow">
				<span class="timePicker-arrow-icon">
					<span aria-hidden="true" class="lucca-icon icon-arrowRight"></span>
				</span>
			</label>
			<div class="timePicker">
				<fieldset class="timePicker-fieldset">
					<legend><span class="pr-u-mask">Label (end)</span></legend>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="end-hour-label" for="end-hour-input">Hours</label>
						<div class="timePicker-fieldset-group-textfield">
							<input
								type="text"
								autocomplete="off"
								inputmode="numeric"
								class="timePicker-fieldset-group-textfield-input"
								aria-labelledby="end-hour-label"
								id="end-hour-input"
								min="0"
								max="23"
								value="12"
							/>
							<span
								aria-hidden="true"
								class="timePicker-fieldset-group-textfield-display"
								data-content-before="12"
							></span>
						</div>
					</div>
					<div aria-hidden="true" class="timePicker-fieldset-groupSeparator" data-content-before=":"></div>
					<div class="timePicker-fieldset-group">
						<label class="formLabel pr-u-mask" id="end-minutes-label" for="end-minutes-input">Minutes</label>
						<div class="timePicker-fieldset-group-textfield">
							<input
								type="text"
								autocomplete="off"
								inputmode="numeric"
								class="timePicker-fieldset-group-textfield-input"
								aria-labelledby="end-minutes-label"
								id="end-minutes-input"
								min="0"
								max="59"
								value="12"
							/>
							<span
								aria-hidden="true"
								class="timePicker-fieldset-group-textfield-display"
								data-content-before="12"
							></span>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>
	<div class="inlineMessage" id="helper">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>
```
