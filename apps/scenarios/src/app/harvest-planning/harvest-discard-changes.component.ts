import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, injectDialogRef } from '@lucca-front/ng/dialog';

/**
 * Confirmation asked before leaving the harvest form with unsaved changes, stacked on top of it.
 * It closes with `true` to leave the form, `false` to go back to it.
 */
@Component({
	selector: 'app-harvest-discard-changes',
	templateUrl: './harvest-discard-changes.component.html',
	imports: [ButtonComponent, DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarvestDiscardChangesComponent {
	readonly dialogRef = injectDialogRef<boolean>();
}
