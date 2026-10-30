# daterangeinput — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-date2-daterangeinput--docs)

## Angular

### Range input

```js
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, CalendarShortcut, DATE2_CLEAR_BEHAVIOR, DATE_FORMAT_CONST, DateRange, DateRangeInputComponent, luDate2Translations, PremadeShortcuts } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

```html
<lu-form-field label="Date range input example" inlineMessage="Inline message example">
	<lu-date-range-input
		[(ngModel)]="selected"
		[min]="min"
		[max]="max"
		[focusedDate]="focusedDate"
		format="date"
		(panelOpened)="panelOpened()"
		(panelClosed)="panelClosed()"
	/>
</lu-form-field>

<pr-story-model-display>{{ selected | json }}</pr-story-model-display>
```

```html
<lu-form-field label="Date range input example" inlineMessage="Inline message example">
	<lu-date-range-input
		[(ngModel)]="selected"
		[min]="min"
		[max]="max"
		[shortcuts]="shortcuts"
		(panelOpened)="panelOpened()"
		(panelClosed)="panelClosed()"
	/>
</lu-form-field>

<pr-story-model-display>{{ selected | json }}</pr-story-model-display>
```
