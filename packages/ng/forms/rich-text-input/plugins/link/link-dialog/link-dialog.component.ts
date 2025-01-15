import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, injectDialogData, injectDialogRef } from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-rich-text-plugin-link-dialog',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'link-dialog.component.html',
	imports: [
		DialogComponent,
		DialogContentComponent,
		DialogFooterComponent,
		FormFieldComponent,
		TextInputComponent,
		ReactiveFormsModule,
		ButtonComponent,
		DialogDismissDirective,
		IconComponent,
		LuTooltipTriggerDirective,
	],
})
export class LinkDialogComponent {
	public readonly dialogData = injectDialogData<string>();
	public readonly dialogRef = injectDialogRef<string | undefined>();

	public readonly formGroup = new FormGroup({
		href: new FormControl<string>(this.dialogData, Validators.required),
	});

	public save() {
		if (this.formGroup.invalid) {
			this.formGroup.markAllAsTouched();
			return;
		}

		this.dialogRef.close(encodeURI(this.formGroup.controls.href.value.trim()));
	}

	public deleteLink() {
		this.dialogRef.close(undefined);
	}
}
