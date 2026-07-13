# calendar — OptionTodayHidden _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/date';
```

```html
<lu-calendar2
	[hideToday]="true"
	[showOverflow]="true"
	[enableOverflow]="true"
	[date]="currentMonth"
	mode="day"
	(dateClicked)="selected($event)"
/>
```
