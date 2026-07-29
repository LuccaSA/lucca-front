# select — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-api-select--docs)

## Angular

### Filter pill

```js
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
```

```html
<lu-filter-pill label="Légume" name="legume">
	<lu-simple-select [(ngModel)]="example" [options]="legumes | filterLegumes: clue" (clueChange)="clue = $event" />
</lu-filter-pill>

<pr-story-model-display>{{ example | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Légume" name="legume">
	<lu-multi-select
		[(ngModel)]="examples"
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		filterPillLabelPlural="légumes"
	/>
</lu-filter-pill>

<pr-story-model-display>{{ examples | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Utilisateur" name="user">
	<lu-simple-select [(ngModel)]="user" users enableFormerEmployees />
</lu-filter-pill>

<pr-story-model-display>{{ user | json }}</pr-story-model-display>
```

## HTML/CSS

### Select

```css
@forward '@lucca-front/scss/src/components/select';
```

```html
<label class="textfield">
	<lu-api-select data-testid="lu-select" class="textfield-input" [api]="apiV3" />
	<span class="textfield-label">Api V3 Select</span>
</label>

<label class="textfield pr-u-marginBlockStart300">
	<lu-api-select class="textfield-input" standard="v4" [api]="apiV4" sort="job.name,level.position" />
	<span class="textfield-label">Api V4 Select</span>
</label>

<label class="textfield pr-u-marginBlockStart300">
	<lu-api-select class="textfield-input" [disabled]="true" standard="v4" [api]="apiV4" sort="job.name,level.position" />
	<span class="textfield-label">Api V4 Select</span>
</label>
```

### Select

```css
@forward '@lucca-front/scss/src/components/select';
```

```html
<label class="textfield">
	<lu-date-select
		class="textfield-input"
		[(ngModel)]="selectedDate"
		[granularity]="granularity"
		[min]="min"
		[max]="max"
		[placeholder]="placeholder"
		[startOn]="startOn"
		[disabled]="disabled"
		[hideClearer]="hideClearer"
		[pickerOverlap]="pickerOverlap"
	></lu-date-select>
	<span class="textfield-label">Label</span>
</label>
```

```html
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate" />
	<span class="textfield-label">Label</span>
</label>
```

```html
<label class="textfield">
	<lu-date-select
		class="textfield-input"
		[(ngModel)]="selectedDate"
		[max]="secondSelectedDate"
		[placeholder]="secondSelectedDate ? 'max : ' + secondSelectedDate : undefined"
	></lu-date-select>
	<span class="textfield-label">Start</span>
</label>
<label class="textfield">
	<lu-date-select
		class="textfield-input"
		[(ngModel)]="secondSelectedDate"
		[min]="selectedDate"
		[startOn]="selectedDate"
		[placeholder]="selectedDate ? 'min : ' + selectedDate : undefined"
	></lu-date-select>
	<span class="textfield-label">End</span>
</label>
```

```html
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate">
		<ng-container *luDisplayer="let value">Birthday: {{ value | date : 'LL' }}</ng-container>
	</lu-date-select>
	<span class="textfield-label">Label</span>
</label>
```

```html
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate" [granularity]="granularity">
		<ng-container *luDisplayer="let value">start of {{ value | date : 'MM/YYYY' }}</ng-container>
	</lu-date-select>
	<span class="textfield-label">Label</span>
</label>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/select';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/filterPill';
```

```html
<div class="filterPill">
	<label for="input1" class="filterPill-label" luTooltip="Lorem ipsum" luTooltipWhenEllipsis="true">Lorem ipsum:</label>
	<button
		null
		class="filterPill-combobox"
		type="button"
		id="input1"
		role="combobox"
		aria-expanded="false"
		luTooltip="Lorem ipsum"
		luTooltipWhenEllipsis="true"
	>
		Lorem ipsum
	</button>
	<button type="button" class="filterPill-clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
	<button type="button" aria-hidden="true" tabindex="-1" class="filterPill-toggle">
		<lu-icon icon="arrowChevronBottom" size="S" />
	</button>
</div>
```

### Select

```css
@forward '@lucca-front/scss/src/components/select';
```

```html
<div class="pr-u-displayFlex">
	<label class="textfield pr-u-marginInlineEnd200">
		<lu-select class="textfield-input" placeholder="Select an item">
			<ng-container *luDisplayer="let value">{{ value }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="1">1</lu-option>
				<lu-option [value]="2">2</lu-option>
				<lu-option [value]="3">3</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Select</span>
	</label>
	<label class="textfield pr-u-marginInlineEnd200">
		<lu-select class="textfield-input" placeholder="Select an item" [multiple]="true">
			<ng-container *luDisplayer="let value">{{ value }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="1">1</lu-option>
				<lu-option [value]="2">2</lu-option>
				<lu-option [value]="3">3</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Multiple Select</span>
	</label>
	<label class="textfield pr-u-marginInlineEnd200">
		<lu-select [(ngModel)]="item" class="textfield-input">
			<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="green">{{ green.name }}</lu-option>
				<lu-option [value]="red">{{ red.name }}</lu-option>
				<lu-option [value]="yellow" [disabled]="true">{{ yellow.name }}</lu-option>
				<lu-option [value]="blue" [disabled]="true">{{ blue.name }}</lu-option>
				<lu-option [value]="purple">{{ purple.name }}</lu-option>
				<lu-option [value]="orange">{{ orange.name }}</lu-option>
				<lu-option [value]="cyan" [disabled]="true">{{ cyan.name }}</lu-option>
				<lu-option [value]="grey">{{ grey.name }}</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Disabled options</span>
	</label>
	<label class="textfield">
		<lu-select [(ngModel)]="item" class="textfield-input" [disabled]="true">
			<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="green">{{ green.name }}</lu-option>
				<lu-option [value]="red">{{ red.name }}</lu-option>
				<lu-option [value]="yellow">{{ yellow.name }}</lu-option>
				<lu-option [value]="blue">{{ blue.name }}</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Disabled field</span>
	</label>
</div>
```
