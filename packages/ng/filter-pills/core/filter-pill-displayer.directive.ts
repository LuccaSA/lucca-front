import { Directive, inject, TemplateRef } from '@angular/core';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';

interface FilterPillDisplayerContext {
	label: string;
	placeholder: string;
	isEmpty: boolean;
}

@Directive({
	selector: '[luFilterPillDisplayer]',
	standalone: true,
})
export class FilterPillDisplayerDirective {
	#filterPillComponentRef = inject(FilterPillComponent);

	#templateRef = inject(TemplateRef);

	constructor() {
		this.#filterPillComponentRef.pillTpl = this.#templateRef;
	}

	public static ngTemplateContextGuard(_dir: FilterPillDisplayerDirective, ctx: unknown): ctx is FilterPillDisplayerContext {
		return true;
	}
}
