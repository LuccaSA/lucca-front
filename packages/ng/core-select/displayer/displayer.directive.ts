import { Directive, input, TemplateRef } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import { ALuSelectInputComponent } from '../input';
import { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luDisplayer]',
})
export class LuDisplayerDirective<TOption, TValue> {
	readonly select = input<ALuSelectInputComponent<TOption, TValue>>(undefined, { alias: 'luDisplayerSelect' });

	public constructor(private templateRef: TemplateRef<LuOptionContext<TOption>>) {
		syncInputSignal(this.select, (select) => select.valueTpl.set(this.templateRef));
	}

	public static ngTemplateContextGuard<TOption, TValue>(_dir: LuDisplayerDirective<TOption, TValue>, ctx: unknown): ctx is LuOptionContext<TOption> {
		return true;
	}
}
