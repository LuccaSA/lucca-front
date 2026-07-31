# checkbox — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-forms-checkbox-basic--docs)

## Angular

### Filter pill

```js
import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
```

```html
<lu-filter-pill label="Inclure les collaborateurs partis" name="includeFormerEmployees">
	<lu-checkbox-input [(ngModel)]="checkboxValue"></lu-checkbox-input>
</lu-filter-pill>

<pr-story-model-display>{{ checkboxValue }}</pr-story-model-display>
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/forms';
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

### Basic

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/filterPill';
```

```html
<div class="filterPill">
	<label for="input1" class="filterPill-label" luTooltip="Lorem ipsum dolor" luTooltipWhenEllipsis="true">
		Lorem ipsum dolor
		<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="Lorem ipsum dolor"></span>
	</label>
	<span class="filterPill-checkbox">
		<input type="checkbox" id="input1" class="filterPill-checkbox-input" />
		<span class="filterPill-checkbox-icon" aria-hidden="true">
			<span class="filterPill-checkbox-icon-check"></span>
		</span>
	</span>
</div>
```
