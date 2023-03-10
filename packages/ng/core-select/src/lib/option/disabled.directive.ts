import { Directive, inject, Input } from '@angular/core';
import { LU_OPTION_CONTEXT } from './option.token';

@Directive({
	selector: '[luDisabledOption]',
	standalone: true,
})
export class LuDisabledOptionDirective {
	private context = inject(LU_OPTION_CONTEXT);

	@Input('luDisabledOption') public set isDisabled(disabled: boolean | null) {
		if (disabled !== null) {
			this.context.isDisabled$.next(disabled);
		}
	}
}
