# verticalnavigation — Navigation iconless _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/vertical-navigation';
```

```html
<div class="verticalNavigation mod-iconless">
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="false">
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="true">
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link" aria-current="page">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
	</ul>
</div>
```
