import { Directive, HostListener, inject } from '@angular/core';
import { LuDialogRef } from '../model';

@Directive({
	selector: '[luDialogClose]',
})
export class DialogCloseDirective {
	#ref = inject<LuDialogRef>(LuDialogRef);

	@HostListener('click')
	close(): void {
		this.#ref.close();
	}
}
