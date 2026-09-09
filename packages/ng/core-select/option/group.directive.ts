import { Directive, inject, input, TemplateRef } from '@angular/core';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';
import type { ALuSelectInputComponent } from '../input';
import type { LuOptionGroupByContext } from '../select.model';

@Directive({
	selector: '[luOptionGroup]',
})
export class LuOptionGroupDirective<TOption, TValue, TGroup> {
	readonly select = input.required<ALuSelectInputComponent<TOption, TValue>>({ alias: 'luOptionGroupSelect' });

	readonly selector = input.required<(option: TOption) => TGroup>({ alias: 'luOptionGroupBy' });

	readonly content = inject<TemplateRef<LuOptionGroupByContext<TOption, TGroup>>>(TemplateRef);

	public static ngTemplateContextGuard<TOption, TValue, TGroup>(_dir: LuOptionGroupDirective<TOption, TValue, TGroup>, _ctx: unknown): _ctx is LuOptionGroupByContext<TOption, TGroup> {
		return true;
	}

	constructor() {
		ɵeffectWithDeps([this.select, this.selector], (select, selector) => {
			select.groupingSignal.set({ selector, content: this.content });
		});
	}
}
