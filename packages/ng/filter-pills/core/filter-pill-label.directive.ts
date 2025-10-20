import { Directive, inject, TemplateRef } from '@angular/core';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';

interface FilterPillLabelContext {
	label: string;
	placeholder: string;
	isEmpty: boolean;
	colon: string;
}

@Directive({
	selector: '[luFilterPillLabel]',
})
export class FilterPillLabelDirective {
	#filterPillComponentRef = inject(FilterPillComponent, { optional: true });

	#templateRef = inject(TemplateRef);

	constructor() {
		if (this.#filterPillComponentRef) {
			this.#filterPillComponentRef.customLabelTpl.set(this.#templateRef);
		}
	}

	public static ngTemplateContextGuard(_dir: FilterPillLabelDirective, ctx: unknown): ctx is FilterPillLabelContext {
		return true;
	}
}
