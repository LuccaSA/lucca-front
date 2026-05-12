# dialog — Multiple _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/dialog';
```

```html
@let config = ${…};

<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl1" [luDialogConfig]="config">Open Dialog</button>

<ng-template #dialogTpl1>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 1</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl2" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl2>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 2</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl3" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl3>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 3</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl4" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl4>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 4</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl5" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl5>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 5</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined">This is the end</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```
