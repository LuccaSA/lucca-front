# scrollbox — Scrollbox _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/scroll-box';
@forward '@lucca-front/scss/src/components/horizontalNavigation';
```

```html
<lu-scroll-box
	[attr.style]="'--components-scrollBox-gap: 0px; --components-scrollBox-paddingInline: 0px; --components-scrollBox-marginInline: calc(var(--pr-t-spacings-200) * -1)'"
>
	<div class="horizontalNavigation ${…} ${…} ${…}">
		<ul class="horizontalNavigation-list">
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">Page 1</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 2</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 3</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 4</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 5</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 6</a>
			</li>
		</ul>
	</div>
</lu-scroll-box>
```
