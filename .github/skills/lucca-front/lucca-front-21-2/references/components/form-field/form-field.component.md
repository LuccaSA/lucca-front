# form-field — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

## Angular

Mots-clés : champ, formulaire, form-field, input

Component selector : `lu-form-field`

## HTML/CSS

Classe CSS : `.form-field`

### Field

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
