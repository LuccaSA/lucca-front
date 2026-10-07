import { Directive, inject, input } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import { LU_OPTION_CONTEXT } from './option.token';

@Directive({
	selector: '[luDisabledOption]',
})
export class LuDisabledOptionDirective {
	/**
	 * Disables the option rendered by the current option template
	 */
	readonly isDisabled = input<boolean>(undefined, { alias: 'luDisabledOption' });

	private context = inject(LU_OPTION_CONTEXT);

	constructor() {
		syncInputSignal(this.isDisabled, (disabled) => this.context.isDisabled$.next(disabled));
	}
}
