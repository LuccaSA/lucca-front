# main-layout — InAppLayout _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/main-layout';
@forward '@lucca-front/scss/src/components/appLayout';
```

```html
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">navSide</div>
	<div class="appLayout-main">
		<main role="main" class="mainLayout">
			${…}
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">${…}${…}${…}</div>
			</div>
		</main>
	</div>
</div>
```
