# checkbox — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-checkbox-basic--docs)


## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
```

```html
<div class="form-field pr-u-marginBlockEnd200">
	<label class="formLabel" for="field1">
		Label @if (required) {
		<sup class="formLabel-required" aria-hidden="true">*</sup>
		} @if (help) {
		<span class="formLabel-info">
			<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
			<span class="pr-u-mask">?</span>
		</span>
		}
	</label>
	<span class="checkboxField">
		<input
			type="checkbox"
			class="checkboxField-input"
			id="field1"
			aria-labelledby="field1label"
			aria-describedby="field1message"
		/>
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	@if (message) {
	<div class="inlineMessage" id="field1message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Helper text</p>
	</div>
	}
</div>
```
