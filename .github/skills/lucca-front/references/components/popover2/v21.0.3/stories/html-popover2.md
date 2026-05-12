# popover2 — Popover2 _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/popover2';
```

```html
<div class="demo">
	<button luButton [luPopover2]="contentRef" ${…}>${…}${…} !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<h3>Title</h3>
			<lu-divider />
			<lu-listing checklist palette="success">
				<lu-listing-item>item item item item item item item item item item item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
			</lu-listing>
		</div>
	</ng-template>
</div>
```
