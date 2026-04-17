import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { intlInputOptions } from '@lucca-front/ng/core';
import { DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, injectDialogData, injectDialogRef } from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../../rich-text-input.translate';

@Component({
	selector: 'lu-rich-text-plugin-link-dialog',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'link-dialog.component.html',
	imports: [DialogComponent, DialogContentComponent, DialogFooterComponent, FormFieldComponent, TextInputComponent, ReactiveFormsModule, ButtonComponent, DialogDismissDirective],
})
export class LinkDialogComponent {
	public readonly dialogData = injectDialogData<{ url: string; canDelete: boolean }>();
	public readonly dialogRef = injectDialogRef<string | undefined>();

	intl = input(...intlInputOptions(LU_RICH_TEXT_INPUT_TRANSLATIONS));

	public readonly formGroup = new FormGroup({
		href: new FormControl<string>(this.dialogData.url, Validators.required),
	});

	public save() {
		if (this.formGroup.invalid) {
			this.formGroup.markAllAsTouched();
			return;
		}

		const hrefValue = this.formGroup.controls.href.value;
		this.dialogRef.close(hrefValue ? encodeURI(hrefValue.trim()) : hrefValue);
	}

	public deleteLink() {
		this.dialogRef.close(undefined);
	}
}
