# fieldset — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)

## Angular

Mots-clés : groupe, champs, section, formulaire

Component selector : `lu-fieldset`

### Basic

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FIELDSET_SIZE, FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

```html
<form luForm>
	<lu-fieldset heading="Title">
		<lu-grid mode="form">
			<lu-grid-column colspan="2">
				<lu-form-field label="Label">
					<lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="2">
				<lu-form-field label="Label">
					<lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" />
				</lu-form-field>
			</lu-grid-column>
		</lu-grid>
	</lu-fieldset>
</form>
```

## HTML/CSS

Classe CSS : `.fieldset`

### Basic

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/fieldset';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/grid';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<fieldset class="fieldset" aria-labelledby="fieldsetTitleContent1">
	<legend class="fieldset-title">
		<span class="fieldset-title-content" id="fieldsetTitleContent1">
			<span class="fieldset-title-content-text">Title</span>
		</span>
	</legend>
	<div class="fieldset-content">
		<div class="grid mod-form" style="--grid-colspan: 4">
			<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
				<div class="form-field">
					<label class="formLabel" id="IDlabel1" for="ID1">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID1" class="textField-input-value" aria-labelledby="IDlabel1" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
				<div class="form-field">
					<label class="formLabel" id="IDlabel2" for="ID2">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID2" class="textField-input-value" aria-labelledby="IDlabel2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</fieldset>
```
