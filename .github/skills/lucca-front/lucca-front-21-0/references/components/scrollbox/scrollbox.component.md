# scrollbox — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-navigation-horizontalnavigation-scrollbox--docs)

## HTML/CSS

### Scrollbox

```css
@forward '@lucca-front/scss/src/components/scroll-box';
@forward '@lucca-front/scss/src/components/horizontalNavigation';
```

```html
<lu-scroll-box
	[attr.style]="'--components-scrollBox-gap: 0px; --components-scrollBox-paddingInline: 0px; --components-scrollBox-marginInline: calc(var(--pr-t-spacings-200) * -1)'"
>
	<div class="horizontalNavigation">
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

### Box basic

```css
@forward '@lucca-front/scss/src/components/scroll-box';
@forward '@lucca-front/scss/src/components/box';
```

```html
<lu-scroll-box>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
</lu-scroll-box>
<lu-scroll-box
	[attr.style]="'--components-scrollBox-paddingBlock: var(--pr-t-spacings-200); --components-scrollBox-paddingInline: 0rem; --components-scrollBox-marginBlock: 0rem'"
>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
</lu-scroll-box>
<div class="resize">
	<lu-scroll-box
		[attr.style]="'--components-scrollBox-marginBlock: var(--pr-t-spacings-300);--components-scrollBox-marginInline: 0; --components-scrollBox-paddingBlock: var(--pr-t-spacings-300); --components-scrollBox-gap: var(--pr-t-spacings-300);'"
	>
		<div class="box">box</div>
		<div class="box">box</div>
		<div class="box">box</div>
	</lu-scroll-box>
</div>
<lu-scroll-box>
	<div style="width: 200vw" class="box">box</div>
</lu-scroll-box>
<lu-scroll-box>
	<div class="box">box</div>
</lu-scroll-box>
```
