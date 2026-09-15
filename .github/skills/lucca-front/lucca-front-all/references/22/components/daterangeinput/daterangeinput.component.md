# daterangeinput — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-date2-daterangeinput--docs)

## Angular

Component selector : `lu-date-range-input`

### Range input

```js
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, CalendarShortcut, DATE2_CLEAR_BEHAVIOR, DATE_FORMAT_CONST, DateRange, DateRangeInputComponent, PremadeShortcuts } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

```ts
shortcuts: [
	{
		label: 'Since start of week',
		range: PremadeShortcuts['SinceStartOfWeek']('fr'),
	},
	{
		label: 'Last week',
		range: PremadeShortcuts['LastWeek']('fr'),
	},
	{
		label: 'Last month',
		range: PremadeShortcuts['LastMonth']('fr'),
	},
]
```

```html
<lu-form-field label="Date range input example" inlineMessage="Inline message example">
	<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" [focusedDate]="focusedDate" format="date" />
</lu-form-field>

<pr-story-model-display>{{ selected | json }}</pr-story-model-display>
```

```html
<lu-form-field label="Date range input example" inlineMessage="Inline message example">
	<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" [shortcuts]="shortcuts" />
</lu-form-field>

<pr-story-model-display>{{ selected | json }}</pr-story-model-display>
```
