# select — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/select';
@forward '@lucca-front/scss/src/components/clear';
```

```html
<div ${…}>
	<label for="input1" class="filterPill-label" luTooltip="${…}" luTooltipWhenEllipsis="true">
		${…}
	</label>
	<button
		${…}
		class="filterPill-combobox"
		type="button"
		id="input1"
		role="combobox"
		aria-expanded="${…}"
		${…}
		luTooltipWhenEllipsis="true"
	>
		${…}
	</button>
	<button type="button" class="filterPill-clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
	<button type="button" aria-hidden="true" tabindex="-1" class="filterPill-toggle">
		<lu-icon icon="arrowChevronBottom" size="S" />
	</button>
</div>
```
