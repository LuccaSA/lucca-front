# resource-card — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/resource-card';
```

```html
<section class="resourceCard" #resourceCard1>
	<div class="resourceCard-layout">
		<header class="resourceCard-layout-header">
			<h3 class="resourceCard-layout-header-title">
				<a
					href="#"
					luTooltip
					luTooltipWhenEllipsis
					[luTooltipAnchor]="resourceCard1"
					class="resourceCard-layout-header-title-action"
				>
					Lorem ipsum dolor
				</a>
			</h3>
		</header>
	</div>
</section>
```
