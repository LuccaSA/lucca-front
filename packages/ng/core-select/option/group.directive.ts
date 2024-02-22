import { Directive, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import type { ALuSelectInputComponent } from '../input';
import type { LuOptionGroupByContext } from '../select.model';

export interface LuOptionGrouping<TOption, TGroup> {
	selector: (option: TOption) => TGroup;
	content: PortalContent<LuOptionGroupByContext<TOption, TGroup>>;
}

@Directive({
	selector: '[luOptionGroup]',
	standalone: true,
})
export class LuOptionGroupDirective<TOption, TValue, TGroup> implements LuOptionGrouping<TOption, TGroup>, OnInit {
	@Input('luOptionGroupSelect') select: ALuSelectInputComponent<TOption, TValue>;

	@Input('luOptionGroupBy') selector: (option: TOption) => TGroup;

	readonly content = inject<TemplateRef<LuOptionGroupByContext<TOption, TGroup>>>(TemplateRef);

	public static ngTemplateContextGuard<TOption, TValue, TGroup>(_dir: LuOptionGroupDirective<TOption, TValue, TGroup>, ctx: unknown): ctx is LuOptionGroupByContext<TOption, TGroup> {
		return true;
	}

	public ngOnInit(): void {
		this.select.grouping = this;
	}
}
