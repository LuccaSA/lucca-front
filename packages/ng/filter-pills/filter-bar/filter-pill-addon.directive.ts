import { Directive, inject, TemplateRef } from '@angular/core';
import { FilterBarComponent } from './filter-bar.component';

@Directive({
	selector: '[luFilterPillAddonBefore]',
})
export class FilterPillAddonBeforeDirective {
	constructor() {
		inject(FilterBarComponent).addonBefore.set(inject(TemplateRef));
	}

	public static ngTemplateContextGuard(_dir: FilterPillAddonBeforeDirective, _ctx: unknown): _ctx is void {
		return true;
	}
}

@Directive({
	selector: '[luFilterPillAddonAfter]',
})
export class FilterPillAddonAfterDirective {
	constructor() {
		inject(FilterBarComponent).addonAfter.set(inject(TemplateRef));
	}

	public static ngTemplateContextGuard(_dir: FilterPillAddonAfterDirective, _ctx: unknown): _ctx is void {
		return true;
	}
}
