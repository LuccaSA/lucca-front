import { Directive, inject } from '@angular/core';
import { LuDialogRef } from '../model';

@Directive({
	selector: '[luDialogDismiss]',
	host: {
		'(click)': 'close()',
	},
})
export class DialogDismissDirective {
	#ref = inject<LuDialogRef>(LuDialogRef);

	close() {
		this.#ref.dismiss();
	}
}
