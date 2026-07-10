# form-field — Field _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<lu-form-field
	extraDescribedBy="extra-message"
	label="Label"
	inlineMessage="Helper text"
	errorInlineMessage="Error helper text"
	inlineMessageState="default"
	tooltip="You expected me to be helpful but this is a story!"
>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				required
				[(ngModel)]="example"
				placeholder="Placeholder"
			></textarea>
		</div>
	</div>
</lu-form-field>
```
