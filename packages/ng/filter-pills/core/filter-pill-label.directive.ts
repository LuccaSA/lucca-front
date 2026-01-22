import { Directive, inject, TemplateRef } from '@angular/core';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';
import { FILTER_PILL_INPUT_COMPONENT } from './tokens';

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
	#parentComponentRef = inject(FILTER_PILL_INPUT_COMPONENT, { optional: true, skipSelf: true });

	#templateRef = inject(TemplateRef);

	constructor() {
		if (this.#filterPillComponentRef && !this.#parentComponentRef.parentInput) {
			this.#filterPillComponentRef.customLabelTpl.set(this.#templateRef);
		}
	}

	public static ngTemplateContextGuard(_dir: FilterPillLabelDirective, ctx: unknown): ctx is FilterPillLabelContext {
		return true;
	}
}
