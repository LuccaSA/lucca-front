# dialog — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/dialog';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/footer';
```

```html
<div class="dialog_backdrop"></div>
<div
	role="dialog"
	aria-modal="true"
	aria-labelledby="dialogInsideHeaderTitle1"
	class="dialog${…} ${…}"
>
	<div class="dialog-inside">
		<form class="dialog-inside-formOptional">
			<header class="dialog-inside-header">
				<button type="button" class="dialog-inside-header-button button">
					<span class="lucca-icon icon-signClose" aria-hidden="true"></span>
					<span class="pr-u-mask">Fermer</span>
				</button>
				<div class="dialog-inside-header-container">
					<h1 class="dialog-inside-header-container-title" id="dialogInsideHeaderTitle1">Title</h1>
				</div>
			</header>
			<div class="dialog-inside-content">dialog</div>
			<footer class="dialog-inside-footer footer">
				<div class="footer-actions">
					<button type="submit" class="button">Action</button>
					<button type="button" class="button mod-ghost">Action</button>
				</div>
			</footer>
		</form>
	</div>
</div>
```
