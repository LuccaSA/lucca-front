# main-layout — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/main-layout';
@forward '@lucca-front/scss/src/components/container';
```

```html
<main role="main" class="mainLayout">
	<div class="mainLayout-content">
		<div class="mainLayout-content-inside">
			<div class="mainLayout-content-inside-header">
				<div class="container">
					<div class="fakeContent">header</div>
				</div>
			</div>
			<div class="mainLayout-content-inside-block">
				<div class="container">
					<div class="fakeContent">content</div>
				</div>
			</div>
			<div class="mainLayout-content-inside-footer mod-sticky">
				<div class="container">
					<div class="fakeContent">footer</div>
				</div>
			</div>
		</div>
	</div>
</main>
```
