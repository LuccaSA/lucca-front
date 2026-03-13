# Dialog

Modal and drawer component for overlays.

**Storybook:** [Documentation/Overlays/Dialog/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Dialog - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A9-Lucca-components-v21.1?node-id=5640-31604)  
**Node ID:** `5640-31604`

## Import

```typescript
import { 
  DialogComponent,
  DialogHeaderComponent,
  DialogContentComponent,
  DialogFooterComponent,
  provideLuDialog 
} from '@lucca-front/ng/dialog';
```

## Provider Setup

Add to your app configuration:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    configureLuDialog(), // Global dialog configuration
  ],
};
```

## Template-Driven Dialog

The simplest way to create a dialog using a template and the `luDialogOpen` directive.

```html
<button luButton [luDialogOpen]="myDialog" [luDialogConfig]="{ size: 'M' }">
  Open Dialog
</button>

<ng-template #myDialog>
  <lu-dialog>
    <lu-dialog-header>
      <h1>Dialog Title</h1>
    </lu-dialog-header>

    <lu-dialog-content>
      <p>Your content here...</p>
    </lu-dialog-content>

    <lu-dialog-footer>
      <div class="footer-actions">
        <button luButton luDialogClose>Confirm</button>
        <button luButton="text" luDialogDismiss>Cancel</button>
      </div>
    </lu-dialog-footer>
  </lu-dialog>
</ng-template>
```

## Service-Based Dialog

For more control, use `LuDialogService` to open dialogs programmatically.

```typescript
@Component({...})
export class MyComponent {
  private dialogService = inject(LuDialogService);

  openDialog() {
    const ref = this.dialogService.open({
      content: MyDialogComponent,
      data: { userId: 123 },
      size: 'M',
    });

    ref.closed$.subscribe(result => {
      if (result !== undefined) {
        console.log('Dialog closed with:', result);
      }
    });
  }
}
```

### Dialog Component with Data

```typescript
@Component({
  selector: 'my-dialog',
  template: `
    <lu-dialog>
      <lu-dialog-header><h1>Edit User</h1></lu-dialog-header>
      <lu-dialog-content>
        <p>Editing user {{ data.userId }}</p>
      </lu-dialog-content>
      <lu-dialog-footer>
        <button luButton (click)="save()">Save</button>
        <button luButton="text" (click)="dialogRef.dismiss()">Cancel</button>
      </lu-dialog-footer>
    </lu-dialog>
  `,
})
export class MyDialogComponent {
  data = injectDialogData<{ userId: number }>();
  dialogRef = injectDialogRef<string>(); // Result type is string

  save() {
    this.dialogRef.close('saved'); // Close with result
  }
}
```

## Dialog Configuration

### `size`
Type: `'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'fitContent' | 'maxContent' | 'fullScreen'`

Sets the dialog width. Default is `'M'`.

```typescript
this.dialogService.open({
  content: MyDialog,
  size: 'L',
});
```

### `mode`
Type: `'default' | 'drawer' | 'drawer-from-bottom'`

Changes how the dialog appears.

```typescript
// Side drawer
{ mode: 'drawer' }

// Bottom drawer (mobile-friendly)
{ mode: 'drawer-from-bottom' }
```

### `alert`
Type: `boolean` (default: `false`)

Makes the dialog a blocking alert that cannot be dismissed. Removes the close button.

```typescript
{ alert: true }
```

### `modal`
Type: `boolean` (default: `true`)

Whether to show a backdrop. Set to `false` for non-modal dialogs.

### `autoFocus`
Type: `'first-tabbable' | 'first-input' | string`

Where to focus when dialog opens. Default is `'first-tabbable'`.

```typescript
{ autoFocus: 'first-input' } // Focus first input field
{ autoFocus: '.my-button' }  // CSS selector
```

### `canClose`
Type: `(component) => boolean | Observable<boolean>`

Hook to prevent closing (e.g., unsaved changes).

```typescript
{
  canClose: (comp) => !comp.hasUnsavedChanges
}
```

### `canCloseWithBackdrop`
Type: `boolean` (default: `true`)

Whether clicking the backdrop or pressing Escape can close the dialog.

### `panelClasses`
Type: `string[]`

Additional CSS classes for the dialog panel.

```typescript
{ panelClasses: ['mod-neutralBackground'] }
```

## Components

### `<lu-dialog>`
Main container for dialog content.

**Input:** `stacked` (boolean) - For stacked/nested dialogs.

### `<lu-dialog-header>`
Header with title and close button (unless `alert: true`).

```html
<lu-dialog-header>
  <h1>Title</h1>
  Optional subtitle text
</lu-dialog-header>
```

**Input:** `intl` - Translation overrides for close button.

### `<lu-dialog-content>`
Scrollable content area.

```html
<lu-dialog-content>
  <!-- Your content -->
</lu-dialog-content>
```

### `<lu-dialog-footer>`
Footer for action buttons.

```html
<lu-dialog-footer>
  <div class="footer-content">Optional helper text</div>
  <div class="footer-actions">
    <button luButton luDialogClose>Primary Action</button>
    <button luButton="text" luDialogDismiss>Cancel</button>
  </div>
</lu-dialog-footer>
```

## Directives

### `luDialogOpen`
Opens a template-based dialog on click.

```html
<button [luDialogOpen]="templateRef" [luDialogConfig]="config">Open</button>
```

### `luDialogClose`
Closes the dialog with an optional result value.

```html
<button luDialogClose>Close</button>
<button [luDialogClose]="'confirmed'">Confirm</button>
```

### `luDialogDismiss`
Dismisses the dialog without a result (equivalent to clicking backdrop/Escape).

```html
<button luDialogDismiss>Cancel</button>
```

## Dialog Reference

### Methods
- `close(result?)` - Close with optional result
- `dismiss()` - Dismiss without result

### Observables
- `closed$` - Emits when dialog closes (with result or `undefined` if dismissed)
- `result$` - Emits when `close()` is called
- `dismissed$` - Emits when `dismiss()` is used (backdrop / escape / close)

## Common Patterns

### Confirmation Dialog
```typescript
openConfirmation() {
  const ref = this.dialogService.open({
    content: ConfirmDialogComponent,
    data: { message: 'Are you sure?' },
    size: 'S',
  });

  ref.closed$.subscribe(confirmed => {
    if (confirmed) {
      this.performAction();
    }
  });
}
```

### Form Dialog
```html
<lu-dialog>
  <lu-dialog-header><h1>Edit Profile</h1></lu-dialog-header>
  <lu-dialog-content>
    <lu-form-field label="Name">
      <lu-text-input [(ngModel)]="name" />
    </lu-form-field>
  </lu-dialog-content>
  <lu-dialog-footer>
    <button luButton [disabled]="!isValid" (click)="save()">Save</button>
    <button luButton="text" luDialogDismiss>Cancel</button>
  </lu-dialog-footer>
</lu-dialog>
```

### Drawer Navigation
```typescript
this.dialogService.open({
  content: FilterDrawerComponent,
  mode: 'drawer',
  size: 'S',
});
```

## Accessibility

- Dialog traps focus within its boundaries
- Escape key dismisses (unless `alert: true`)
- Uses `role="dialog"` or `role="alertdialog"`
- Header `<h1>` is used for `aria-labelledby`
- Restore focus to trigger element on close

## Docs Highlights

### Service vs Directives

You can open dialogs using `LuDialogService.open(...)` **or** the `luDialogOpen` directive with an `ng-template`.

### Typed data + result

Use `injectDialogData` and `injectDialogRef` in the dialog component for strong typing.

```typescript
export class MyDialogComponent {
  data = injectDialogData<{ name: string }>();
  ref = injectDialogRef<boolean>();
}
```

### Result streams

- `result$` emits only when `close()` is called
- `dismissed$` emits when `dismiss()` is used (backdrop / escape / close)
- `closed$` merges both and emits `undefined` on dismiss
