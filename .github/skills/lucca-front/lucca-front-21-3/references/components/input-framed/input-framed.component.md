# input-framed — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-input-framed-angular-basic--docs)

## Angular

Component selector : `lu-input-framed`

### Basic

```js
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, INPUT_FRAMED_SIZE, InputFramedComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-form-field label="Label" errorInlineMessage="Error inline message">
	<lu-radio-group-input [(ngModel)]="example" framed required>
		<lu-radio value="A">Option A</lu-radio>
		<lu-radio value="B">Option B</lu-radio>
		<lu-radio value="C" disabled>Option C</lu-radio>
		<lu-radio value="D">Option D</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
```

## HTML/CSS

Classe CSS : `.inputFramed`

### Center

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/radioField';
```

```html
<div class="inputFramed mod-alignCenter">
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
		</div>
		<div class="inputFramed-header-illustration">
			<div
				style="background-color: var(--palettes-product-100); color: var(--palettes-product-700)"
				class="pr-u-padding150 pr-u-borderRadiusXL pr-u-displayFlex"
			>
				<span aria-hidden="true" class="lucca-icon icon-moneyBag"></span>
			</div>
		</div>
	</div>
</div>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
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
			</div>
		</div>
	</div>
</div>
```

### Checkbox

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/inputFramed';
```

```html
<div class="inputFramedWrapper">
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="checkboxAlabel" for="optionA">Option A</label>
				<span class="checkboxField">
					<input
						type="checkbox"
						class="checkboxField-input inputFramed-header-input"
						aria-labelledby="checkboxAlabel"
						id="optionA"
					/>
					<span aria-hidden="true" class="checkboxField-icon">
						<span class="checkboxField-icon-check"></span>
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
				<label class="formLabel inputFramed-header-label" id="checkboxBlabel" for="optionB">Option B</label>
				<span class="checkboxField">
					<input
						type="checkbox"
						class="checkboxField-input inputFramed-header-input"
						aria-labelledby="checkboxBlabel"
						id="optionB"
					/>
					<span aria-hidden="true" class="checkboxField-icon">
						<span class="checkboxField-icon-check"></span>
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

### Grid

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/grid';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/radioField';
```

```html
<div class="inputFramedWrapper">
	<div class="grid mod-autoAtMediaMinXXS">
		<div class="grid-column">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioAlabel1" for="optionA1">Option A</label>
						<span class="radioField">
							<input
								type="radio"
								class="radioField-input inputFramed-header-input"
								aria-labelledby="radioA1label"
								id="optionA1"
								name="radioGroup"
							/>
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioB1label" for="optionB1">Option B</label>
						<span class="radioField">
							<input
								type="radio"
								class="radioField-input inputFramed-header-input"
								aria-labelledby="radioB1label"
								id="optionB1"
								name="radioGroup"
							/>
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<br />
<div class="inputFramedWrapper">
	<div class="grid" [attr.style]="'--grid-columns: 2; --grid-colspan: 2'">
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
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
								name="radioGroup2"
							/>
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
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
								name="radioGroup2"
							/>
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioClabel" for="optionC">Option C</label>
						<span class="radioField">
							<input
								type="radio"
								class="radioField-input inputFramed-header-input"
								aria-labelledby="radioClabel"
								id="optionC"
								name="radioGroup2"
							/>
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioDlabel" for="optionD">
							Option D
							<br />
							Option D
						</label>
						<span class="radioField">
							<input
								type="radio"
								class="radioField-input inputFramed-header-input"
								aria-labelledby="radioDlabel"
								id="optionD"
								name="radioGroup2"
							/>
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```

### Illustrations

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/radioField';
```

```html
<div class="inputFramed">
	<div class="inputFramed-header">
		<div class="form-field inputFramed-header-field">
			<label class="formLabel inputFramed-header-label" id="radioAlabel" for="optionA">Option A</label>
			<span class="radioField">
				<input
					type="radio"
					class="radioField-input inputFramed-header-input"
					aria-labelledby="radioAlabel radioAmessage"
					id="optionA"
					name="radioGroup"
				/>
				<span aria-hidden="true" class="radioField-icon">
					<span class="radioField-icon-check"></span>
				</span>
			</span>
			<div id="radioAmessage" class="inlineMessage"><p class="inlineMessage-content">Helper text</p></div>
		</div>
		<div class="inputFramed-header-illustration">
			<div
				style="background-color: var(--palettes-product-100); color: var(--palettes-product-700)"
				class="pr-u-padding150 pr-u-borderRadiusXL pr-u-displayFlex"
			>
				<span aria-hidden="true" class="lucca-icon icon-moneyBag"></span>
			</div>
		</div>
	</div>
</div>
```

### Infos

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
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
			</div>
			<div class="inputFramed-header-info">Lorem ipsum dolor</div>
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
			</div>
			<div class="inputFramed-header-info">Lorem ipsum dolor</div>
		</div>
	</div>
</div>
```

### Message

```css
@forward '@lucca-front/scss/src/components/form-field';
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

### Panels

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
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
			</div>
		</div>
		<div class="inputFramed-content">Lorem ipsum dolor</div>
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
			</div>
		</div>
		<div class="inputFramed-content">
			Lorem
			<strong>ipsum</strong>
			dolor
		</div>
	</div>
</div>
```

### SizeL

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/radioField';
```

```html
<div class="inputFramedWrapper">
	<div class="inputFramed mod-L">
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
			</div>
		</div>
	</div>
	<div class="inputFramed mod-L">
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
			</div>
		</div>
	</div>
</div>
```

### States

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
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
						checked="checked"
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
			</div>
		</div>
	</div>
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="radioBlabel" for="optionB">Option B</label>
				<span class="radioField">
					<input
						checked="checked"
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
			</div>
		</div>
	</div>
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="radioClabel" for="optionC">Option C</label>
				<span class="radioField">
					<input
						disabled="disabled"
						type="radio"
						class="radioField-input inputFramed-header-input"
						aria-labelledby="radioClabel"
						id="optionC"
						name="radioGroup"
					/>
					<span aria-hidden="true" class="radioField-icon">
						<span class="radioField-icon-check"></span>
					</span>
				</span>
			</div>
		</div>
	</div>
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="radioDlabel" for="optionD">Option D</label>
				<span class="radioField">
					<input
						aria-invalid="true"
						type="radio"
						class="radioField-input inputFramed-header-input"
						aria-labelledby="radioDlabel"
						id="optionD"
						name="radioGroup"
					/>
					<span aria-hidden="true" class="radioField-icon">
						<span class="radioField-icon-check"></span>
					</span>
				</span>
			</div>
		</div>
	</div>
</div>
```

### Tag

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/tag';
```

```html
<div class="inputFramed">
	<div class="inputFramed-header">
		<div class="form-field inputFramed-header-field">
			<label class="formLabel inputFramed-header-label" id="radioAlabel" for="optionA">
				Option A
				<span class="formLabel-tag tag">Tag</span>
			</label>
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
		</div>
	</div>
</div>
```
