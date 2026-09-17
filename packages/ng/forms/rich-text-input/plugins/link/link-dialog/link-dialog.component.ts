import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
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
	imports: [DialogComponent, DialogContentComponent, DialogFooterComponent, FormFieldComponent, TextInputComponent, ButtonComponent, DialogDismissDirective],
})
export class LinkDialogComponent {
	public readonly dialogData = injectDialogData<{ url: string; canDelete: boolean }>();
	public readonly dialogRef = injectDialogRef<string | undefined>();

	intl = input(...intlInputOptions(LU_RICH_TEXT_INPUT_TRANSLATIONS));

	public readonly href = signal<string>(this.dialogData.url);

	public save() {
		const hrefValue = this.href();
		if (!hrefValue) {
			return;
		}

		this.dialogRef.close(this.#encodeHref(hrefValue.trim()));
	}

	/**
	 * Encodes a href without double-encoding URLs that are already (partially) encoded.
	 * Pasted URLs (e.g. SharePoint links) often already contain percent-encoded characters
	 * like `%20`; applying `encodeURI` directly would re-encode the `%` into `%25`.
	 * We first decode to get back the raw URL, then re-encode it so the result is idempotent.
	 */
	#encodeHref(href: string): string {
		try {
			return encodeURI(decodeURI(href));
		} catch {
			// Malformed URI sequence (e.g. a lone `%`): fall back to encoding as-is.
			return encodeURI(href);
		}
	}

	public deleteLink() {
		this.dialogRef.close(undefined);
	}
}
