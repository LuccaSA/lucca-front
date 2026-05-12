# checkbox — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/filterPill';
```

```html
<div class="filterPill">
	<label for="input1" class="filterPill-label" luTooltip="${…}" luTooltipWhenEllipsis="true">
		${…}
		<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="${…}"></span>
	</label>
	<span class="filterPill-checkbox">
		<input type="checkbox" id="input1" class="filterPill-checkbox-input" ${…} ${…} />
		<span class="filterPill-checkbox-icon" aria-hidden="true">
			<span class="filterPill-checkbox-icon-check"></span>
		</span>
	</span>
</div>
```
