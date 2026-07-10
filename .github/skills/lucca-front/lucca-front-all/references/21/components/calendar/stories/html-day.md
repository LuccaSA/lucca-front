# calendar — Day _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/date';
```

```html
<lu-calendar2
	[hideToday]="false"
	[showOverflow]="true"
	[enableOverflow]="true"
	[getCellInfo]="getDayInfo"
	[date]="currentMonth"
	mode="day"
	(dateClicked)="selected($event)"
/>
```
