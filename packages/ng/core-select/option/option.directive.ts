import { Directive, Input, TemplateRef } from '@angular/core';
import type { ALuSelectInputComponent } from '../input';
import type { LuOptionContext } from '../select.model';

@Directive({
	selector: '[luOption]',
	standalone: true,
})
export class LuOptionDirective<TOption, TValue> {
	@Input('luOptionSelect') set select(select: ALuSelectInputComponent<TOption, TValue>) {
		select.optionTpl = this.templateRef;
	}

	public constructor(private templateRef: TemplateRef<LuOptionContext<TOption>>) {}

	public static ngTemplateContextGuard<TOption, TValue>(_dir: LuOptionDirective<TOption, TValue>, ctx: unknown): ctx is LuOptionContext<TOption> {
		return true;
	}
}
