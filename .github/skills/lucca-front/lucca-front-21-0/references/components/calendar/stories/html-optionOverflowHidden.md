# calendar — OptionOverflowHidden _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/date';
```

```html
<lu-calendar2
	[hideToday]="false"
	[showOverflow]="false"
	[date]="currentMonth"
	mode="day"
	(dateClicked)="selected($event)"
/>
```
