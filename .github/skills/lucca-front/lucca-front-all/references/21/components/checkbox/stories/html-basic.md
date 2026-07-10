# checkbox — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/forms';
@forward '@lucca-front/scss/src/components/filterPill';
```

```html
<button type="button" class="filterPill mod-checkbox">
	<span class="filterPill-checkbox">
		<span class="filterPill-checkbox-input"></span>
		<span class="filterPill-checkbox-icon" aria-hidden="true">
			<span class="filterPill-checkbox-icon-check"></span>
		</span>
	</span>
	<span class="filterPill-label" luTooltip="Lorem ipsum dolor" luTooltipWhenEllipsis>
		Lorem ipsum dolor
		<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="Lorem ipsum dolor"></span>
	</span>
</button>
```
