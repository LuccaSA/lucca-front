# form-field — Field _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<lu-form-field extraDescribedBy="extra-message" ${…}>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				${…}
				[(ngModel)]="example"
				placeholder="Placeholder"
			></textarea>
		</div>
	</div>
</lu-form-field>
```
