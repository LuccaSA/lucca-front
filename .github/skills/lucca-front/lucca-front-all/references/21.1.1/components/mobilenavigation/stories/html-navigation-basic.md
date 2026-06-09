# mobilenavigation — Navigation basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/mobile-push';
@forward '@lucca-front/scss/src/components/mobileNavigation';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<nav class="mobileNavigation">
	<ul class="mobileNavigation-list">
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link" aria-current="page">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
			</a>
		</li>
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
			</a>
		</li>
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
				<span class="mobileNavigation-list-item-link-counter numericBadge mod-XS">2</span>
			</a>
		</li>
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
			</a>
		</li>
	</ul>
</nav>
```
