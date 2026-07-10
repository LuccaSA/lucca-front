# dialog — Confirmation _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/dialog';
```

```html
<lu-dialog #dialog>
	<lu-dialog-header>
		<h1>Confirmation</h1>
	</lu-dialog-header>
	<lu-dialog-content>Lorem ipsum dolor</lu-dialog-content>
	<lu-dialog-footer>
		<div class="footer-actions">
			<button type="button" luButton luDialogClose>Confirm</button>
			<button type="button" luButton="ghost">Cancel</button>
		</div>
	</lu-dialog-footer>
</lu-dialog>
```
