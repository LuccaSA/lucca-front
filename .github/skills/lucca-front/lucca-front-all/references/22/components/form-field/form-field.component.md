# form-field — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

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
<lu-form-field extraDescribedBy="extra-message" ${…}>
	<div class="textField">
		<div class="textField-input">
			<textarea
				type="text"
				luInput
				class="textField-input-value"
				${…}
				[(ngModel)]="model.example"
				placeholder="Placeholder"
			></textarea>
		</div>
	</div>
</lu-form-field>
```
