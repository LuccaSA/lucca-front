# resource-card — Dnd _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/resource-card';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="resourceCardWrapper">
	<section class="resourceCard" #resourceCard1>
		<div class="resourceCard-layout">
			<div class="resourceCard-layout-before">
				<div class="button resourceCard-layout-before-button">
					<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
				</div>
			</div>
			<header class="resourceCard-layout-header">
				<h3 class="resourceCard-layout-header-title">
					<a
						href="#"
						luTooltip
						luTooltipOnlyForDisplay
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
	<section class="resourceCard cdk-drag-preview" #resourceCard1>
		<div class="resourceCard-layout">
			<div class="resourceCard-layout-before">
				<div class="button resourceCard-layout-before-button">
					<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
				</div>
			</div>
			<header class="resourceCard-layout-header">
				<h3 class="resourceCard-layout-header-title">
					<a
						href="#"
						luTooltip
						luTooltipOnlyForDisplay
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
	<section class="resourceCard cdk-drag-placeholder" #resourceCard1>
		<div class="resourceCard-layout">
			<div class="resourceCard-layout-before">
				<div class="button resourceCard-layout-before-button">
					<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
				</div>
			</div>
			<header class="resourceCard-layout-header">
				<h3 class="resourceCard-layout-header-title">
					<a
						href="#"
						luTooltip
						luTooltipOnlyForDisplay
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
</div>
```
