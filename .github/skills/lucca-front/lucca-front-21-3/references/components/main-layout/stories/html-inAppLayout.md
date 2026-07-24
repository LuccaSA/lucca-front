# main-layout — InAppLayout _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/main-layout';
@forward '@lucca-front/scss/src/components/appLayout';
@forward '@lucca-front/scss/src/components/container';
```

```html
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">navSide</div>
	<div class="appLayout-main">
		<main role="main" class="mainLayout">
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">
					<div class="mainLayout-content-inside-header">
						<div class="fakeContent">
							header
							<!-- .pageHeader container -->
						</div>
					</div>
					<div class="mainLayout-content-inside-block">
						<div class="container">
							<div class="fakeContent">content</div>
						</div>
					</div>
					<div class="mainLayout-content-inside-footer mod-sticky">
						<div class="fakeContent">
							header
							<!-- .footer container -->
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
<!-- <lu-toasts /> -->
```
