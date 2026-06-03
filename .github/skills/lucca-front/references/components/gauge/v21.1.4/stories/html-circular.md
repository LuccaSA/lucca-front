# gauge — Circular _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/gauge';
```

```html
<svg
	class="gauge"
	width="40"
	height="40"
	viewBox="0 0 40 40"
	[attr.style]="'--components-gauge-value: 33; --components-gauge-circleR: 16px'"
>
	<circle class="gauge-circleBackground" cx="20" cy="20" r="16"></circle>
	<circle class="gauge-circleBar" cx="20" cy="20" r="16"></circle>
</svg>
```
