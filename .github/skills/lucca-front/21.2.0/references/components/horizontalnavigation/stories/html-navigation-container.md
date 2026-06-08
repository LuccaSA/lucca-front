# horizontalnavigation — Navigation container _(HTML/CSS)_

Ce menu intègre un `container` pour s'aligner horizontalement au contenu de la page.

```css
@forward '@lucca-front/scss/src/components/horizontal-navigation';
```

```html
<div class="horizontalNavigation">
	<div class="horizontalNavigation-containerOptional">
		<ul class="horizontalNavigation-list">
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">Page 1</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 2</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 3</a>
			</li>
		</ul>
	</div>
</div>
```
