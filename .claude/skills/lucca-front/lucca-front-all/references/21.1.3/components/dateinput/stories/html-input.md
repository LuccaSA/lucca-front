# dateinput — Input _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/date2';
```

```html
<lu-form-field label="Date input example" inlineMessage="Inline message example">
	<lu-date-input
		[(ngModel)]="selected"
		[min]="min"
		[max]="max"
		[focusedDate]="focusedDate"
		autocomplete="off"
		clearBehavior="clear"
		mode="day"
		format="date"
	/>
</lu-form-field>

<pr-story-model-display>{{ selected }}</pr-story-model-display>
```
