import { Directive, inject } from '@angular/core';
import { PresentationDisplayDirective } from './presentation-display.directive';

@Directive({
	selector: '[luPresentationDisplayDefault]',
	hostDirectives: [PresentationDisplayDirective],
})
export class ɵPresentationDisplayDefaultDirective {
	#displayDirectiveRef = inject(PresentationDisplayDirective);

	constructor() {
		this.#displayDirectiveRef.defaultDisplay.set(true);
	}

	public static ngTemplateContextGuard(_dir: ɵPresentationDisplayDefaultDirective, ctx: unknown): ctx is void {
		return true;
	}
}
