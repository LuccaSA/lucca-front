import { Directive, inject, Input, TemplateRef } from '@angular/core';
import type { ALuSelectInputComponent } from '../input';
import type { LuOptionGroupByContext } from '../select.model';

@Directive({
	selector: '[luOptionGroup]',
	standalone: true,
})
export class LuOptionGroupDirective<TOption, TValue, TGroup> {
	@Input('luOptionGroupSelect') select: ALuSelectInputComponent<TOption, TValue>;

	@Input('luOptionGroupBy') selector: (option: TOption) => TGroup;

	readonly templateRef = inject<TemplateRef<LuOptionGroupByContext<TOption, TGroup>>>(TemplateRef);

	public static ngTemplateContextGuard<TOption, TValue, TGroup>(_dir: LuOptionGroupDirective<TOption, TValue, TGroup>, ctx: unknown): ctx is LuOptionGroupByContext<TOption, TGroup> {
		return true;
	}
}
