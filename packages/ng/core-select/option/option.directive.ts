import { Directive, input, TemplateRef } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import type { ALuSelectInputComponent } from '../input';
import type { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luOption]',
})
export class LuOptionDirective<TOption, TValue> {
	readonly select = input<ALuSelectInputComponent<TOption, TValue>>(undefined, { alias: 'luOptionSelect' });

	public constructor(private templateRef: TemplateRef<LuOptionContext<TOption>>) {
		syncInputSignal(this.select, (select) => {
			select.optionTpl.set(this.templateRef);
		});
	}

	public static ngTemplateContextGuard<TOption, TValue>(_dir: LuOptionDirective<TOption, TValue>, ctx: unknown): ctx is LuOptionContext<TOption> {
		return true;
	}
}
