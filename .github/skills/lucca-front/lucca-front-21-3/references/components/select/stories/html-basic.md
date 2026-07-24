# select — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/select';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/filterPill';
```

```html
<div class="filterPillWrapper">
	<button type="button" class="filterPill is-filled" aria-expanded="false" aria-controls="panel">
		<span class="filterPill-label">Lorem ipsum:</span>
		<span class="filterPill-value">Lorem ipsum</span>
		<span class="filterPill-toggle">
			<span class="lucca-icon icon-arrowChevronBottom mod-S"></span>
		</span>
	</button>
	<button type="button" class="filterPill_clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
</div>
```
