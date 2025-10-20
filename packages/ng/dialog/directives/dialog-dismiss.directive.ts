import { Directive, HostListener, inject } from '@angular/core';
import { LuDialogRef } from '../model';

@Directive({
	selector: '[luDialogDismiss]',
})
export class DialogDismissDirective {
	#ref = inject<LuDialogRef>(LuDialogRef);

	@HostListener('click')
	close(): void {
		this.#ref.dismiss();
	}
}
