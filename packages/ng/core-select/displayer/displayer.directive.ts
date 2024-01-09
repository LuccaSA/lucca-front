import { Directive, Input, TemplateRef } from '@angular/core';
import { ALuSelectInputComponent } from '../input';
import { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luDisplayer]',
	standalone: true,
})
export class LuDisplayerDirective<TOption, TValue> {
	@Input('luDisplayerSelect') set select(select: ALuSelectInputComponent<TOption, TValue>) {
		select.valueTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<LuOptionContext<TOption>>) {}

	public static ngTemplateContextGuard<TOption, TValue>(_dir: LuDisplayerDirective<TOption, TValue>, ctx: unknown): ctx is LuOptionContext<TOption> {
		return true;
	}
}
