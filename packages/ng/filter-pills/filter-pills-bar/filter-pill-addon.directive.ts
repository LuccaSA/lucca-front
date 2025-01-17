import { Directive, inject, TemplateRef } from '@angular/core';
import { FilterPillsBarComponent } from './filter-pills-bar.component';

@Directive({
	selector: '[luFilterPillAddonBefore]',
	standalone: true,
})
export class FilterPillAddonBeforeDirective {
	constructor() {
		inject(FilterPillsBarComponent).addonBefore.set(inject(TemplateRef));
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
		inject(FilterPillsBarComponent).addonAfter.set(inject(TemplateRef));
	}

	public static ngTemplateContextGuard(_dir: FilterPillAddonAfterDirective, ctx: unknown): ctx is void {
		return true;
	}
}
