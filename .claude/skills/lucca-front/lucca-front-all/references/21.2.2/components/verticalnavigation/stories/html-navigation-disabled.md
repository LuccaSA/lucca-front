# verticalnavigation — Navigation disabled _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/vertical-navigation';
```

```html
<div class="verticalNavigation">
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="false">
				<span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
			</ul>
		</li>
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="true">
				<span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
			</ul>
		</li>
	</ul>
</div>
```
