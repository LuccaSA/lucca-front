# calendar — Decade _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/date';
```

```html
<lu-calendar2
	[hideToday]="false"
	[showOverflow]="true"
	[enableOverflow]="true"
	[date]="currentMonth"
	mode="year"
	(dateClicked)="selected($event)"
/>
```
