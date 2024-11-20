import { Directive, inject, TemplateRef } from '@angular/core';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';

interface FilterPillLabelContext {
	label: string;
	placeholder: string;
	isEmpty: boolean;
}

@Directive({
	selector: '[luFilterPillLabel]',
	standalone: true,
})
export class FilterPillLabelDirective {
	#filterPillComponentRef = inject(FilterPillComponent);

	#templateRef = inject(TemplateRef);

	constructor() {
		this.#filterPillComponentRef.customLabelTpl.set(this.#templateRef);
	}

	public static ngTemplateContextGuard(_dir: FilterPillLabelDirective, ctx: unknown): ctx is FilterPillLabelContext {
		return true;
	}
}
