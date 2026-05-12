# box — Arrow _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/switchField';
```

```html
<fieldset class="form-fieldset mod-inline">
	<legend class="formLabel pr-u-mask">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field mod-withArrow${…}">
		<label class="formLabel" for="IDradioA">Label A</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioA" name="radioName2" checked />
			<span class="radioField-icon" aria-hidden="true">
				<span class="radioField-icon-check"></span>
			</span>
		</span>
		<div class="form-field-arrow${…}"></div>
	</div>
	<div class="form-field mod-withArrow${…}">
		<label class="formLabel" for="IDradioB">Label B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName2" />
			<span class="radioField-icon" aria-hidden="true">
				<span class="radioField-icon-check"></span>
			</span>
		</span>
		<div class="form-field-arrow${…}"></div>
	</div>
</fieldset>
<div class="box mod-withArrow${…}">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi
	excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam!
	Vitae!
</div>
```

```html
<div class="form-field mod-withArrow${…}">
	<label class="formLabel" for="CB">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="CB" aria-labelledby="CB-label" ${…} />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	<div class="form-field-arrow${…}"></div>
</div>
<div class="box mod-withArrow${…}">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi
	excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam!
	Vitae!
</div>
```

```html
<div class="form-field mod-withArrow${…}">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" ${…} />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="form-field-arrow${…}"></div>
</div>
<div class="box mod-withArrow${…}">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi
	excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam!
	Vitae!
</div>
```
