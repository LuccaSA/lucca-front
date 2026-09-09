import { Directive, inject } from '@angular/core';
import { LuDialogRef } from '../model';

@Directive({
	selector: '[luDialogClose]',
	host: {
		'(click)': 'close()',
	},
})
export class DialogCloseDirective {
	#ref = inject<LuDialogRef>(LuDialogRef, { optional: true });

	close() {
		this.#ref?.close();
	}
}
