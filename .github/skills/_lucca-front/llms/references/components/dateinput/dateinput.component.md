# dateinput — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-date2-dateinput--docs)

## Angular

### Input

```js
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, DATE2_CLEAR_BEHAVIOR, DATE_FORMAT_CONST, DateInputComponent, luDate2Translations } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-form-field label="Date input example" inlineMessage="Inline message example">
	<lu-date-input
		[(ngModel)]="selected"
		[min]="min"
		[max]="max"
		[focusedDate]="focusedDate"
		format="date"
		(panelOpened)="panelOpened()"
		(panelClosed)="panelClosed()"
	/>
</lu-form-field>

<pr-story-model-display>{{ selected }}</pr-story-model-display>
```

```html
<lu-form-field label="Date input example" inlineMessage="Inline message example">
	<lu-date-input
		[(ngModel)]="selected"
		[min]="min"
		[max]="max"
		[focusedDate]="focusedDate"
		humanized
		format="date"
		(panelOpened)="panelOpened()"
		(panelClosed)="panelClosed()"
	/>
</lu-form-field>

<pr-story-model-display>{{ selected }}</pr-story-model-display>
```

```html
<lu-form-field label="Date input example" inlineMessage="Inline message example">
	<lu-date-input
		[(ngModel)]="selected"
		[min]="min"
		[max]="max"
		[focusedDate]="focusedDate"
		mode="week"
		format="date"
		(panelOpened)="panelOpened()"
		(panelClosed)="panelClosed()"
	/>
</lu-form-field>

<pr-story-model-display>{{ selected }}</pr-story-model-display>
```

### Input field

```js
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, DATE2_CLEAR_BEHAVIOR, DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

```html
<lu-form-field>
	<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" autocomplete="off" />
</lu-form-field>
<pr-story-model-display>{{ selected }}</pr-story-model-display>
```
