# box — Arrow _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/radioField';
```

```html
<fieldset class="form-fieldset mod-inline">
	<legend class="formLabel pr-u-mask">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field mod-withArrow">
		<label class="formLabel" for="IDradioA">Label A</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioA" name="radioName2" checked />
			<span class="radioField-icon" aria-hidden="true">
				<span class="radioField-icon-check"></span>
			</span>
		</span>
		<div class="form-field-arrow mod-neutral"></div>
	</div>
	<div class="form-field mod-withArrow">
		<label class="formLabel" for="IDradioB">Label B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName2" />
			<span class="radioField-icon" aria-hidden="true">
				<span class="radioField-icon-check"></span>
			</span>
		</span>
		<div class="form-field-arrow mod-neutral"></div>
	</div>
</fieldset>
<div class="box mod-withArrow mod-neutral">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi
	excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam!
	Vitae!
</div>
```
