# calendar — In progress _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/date';
```

```html
<div class="calendarWrapper">
	<div class="calendarWrapper-content palette-watermelon">
		<lu-calendar2 [date]="date" [getCellInfo]="getDayInfo" />
	</div>
</div>
```
