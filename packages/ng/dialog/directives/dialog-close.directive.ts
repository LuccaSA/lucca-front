import { Directive, inject } from '@angular/core';
import { LuDialogRef } from '../model';

@Directive({
	selector: '[luDialogClose]',
	host: {
		'(click)': 'close()',
	},
})
export class DialogCloseDirective {
	#ref = inject<LuDialogRef>(LuDialogRef);

	close() {
		this.#ref.close();
	}
}
