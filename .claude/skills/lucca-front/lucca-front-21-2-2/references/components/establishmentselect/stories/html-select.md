# establishmentselect — Select _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/establishment';
```

```html
<label class="textfield mod-inline pr-u-marginInlineEnd200">
	<lu-establishment-select class="textfield-input" placeholder="Select an establishment" data-testid="lu-select" />
	<span class="textfield-label">Establishment Select</span>
</label>
<label class="textfield mod-inline">
	<lu-establishment-select
		class="textfield-input"
		placeholder="Select an establishment"
		[multiple]="multiple()"
		data-testid="lu-select-multiple"
	/>
	<span class="textfield-label">Establishment Multiple Select</span>
</label>
```
