# listing — Fancy _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ol class="listing mod-fancy">
	<li class="listing-item">
		<div class="listing-item-number" aria-hidden="true"></div>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-number" aria-hidden="true"></div>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-number" aria-hidden="true"></div>
		<div class="listing-item-content">
			item
			<ol class="listing mod-fancy">
				<li class="listing-item">
					<div class="listing-item-number" aria-hidden="true"></div>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-number" aria-hidden="true"></div>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-number" aria-hidden="true"></div>
					<div class="listing-item-content">item</div>
				</li>
			</ol>
		</div>
	</li>
</ol>
```
