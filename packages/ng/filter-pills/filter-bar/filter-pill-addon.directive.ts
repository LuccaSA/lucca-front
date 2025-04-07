import { Directive, inject, TemplateRef } from '@angular/core';
import { FilterBarComponent } from './filter-bar.component';

@Directive({
	selector: '[luFilterPillAddonBefore]',
	standalone: true,
})
export class FilterPillAddonBeforeDirective {
	constructor() {
		inject(FilterBarComponent).addonBefore.set(inject(TemplateRef));
	}

	public static ngTemplateContextGuard(_dir: FilterPillAddonBeforeDirective, ctx: unknown): ctx is void {
		return true;
	}
}

@Directive({
	selector: '[luFilterPillAddonAfter]',
	standalone: true,
})
export class FilterPillAddonAfterDirective {
	constructor() {
		inject(FilterBarComponent).addonAfter.set(inject(TemplateRef));
	}

	public static ngTemplateContextGuard(_dir: FilterPillAddonAfterDirective, ctx: unknown): ctx is void {
		return true;
	}
}
