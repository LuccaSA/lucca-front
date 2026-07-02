# skiplinks — Links basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/a11y';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/link';
```

```html
<lu-skip-links />
<div id="lucca-banner-solutions-container">
	<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
		<span aria-hidden="true" class="lucca-icon icon-app"></span>
	</button>
	<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
		<span aria-hidden="true" class="lucca-icon icon-peopleGroup"></span>
	</button>
	<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
		<span aria-hidden="true" class="lucca-icon icon-transportRocket"></span>
	</button>
	<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
		<span aria-hidden="true" class="lucca-icon icon-signInfo"></span>
	</button>
	<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
		<span aria-hidden="true" class="lucca-icon icon-bell"></span>
	</button>
</div>
<div id="navSide">
	<button type="button" class="button mod-withIcon palette-product">
		<span aria-hidden="true" class="lucca-icon icon-mailPaperPlane"></span>
		Internal navigation
	</button>
	<button type="button" class="button mod-withIcon palette-product">
		<span aria-hidden="true" class="lucca-icon icon-timeClock"></span>
		Internal navigation
	</button>
	<button type="button" class="button mod-withIcon palette-product">
		<span aria-hidden="true" class="lucca-icon icon-eye"></span>
		Internal navigation
	</button>
</div>
<div id="main-content">
	<a href="#" class="link">Content link</a>
	<a href="#" class="link">Content link</a>
	<a href="#" class="link">Content link</a>
	<a href="#" class="link">Content link</a>
</div>
```
