import { DestroyRef, Directive, inject, TemplateRef, WritableSignal } from '@angular/core';
import { FilterBarComponent } from './filter-bar.component';

/**
 * Registers the directive's template in a filter bar addon slot, and frees the slot when the directive is destroyed,
 * unless another directive has registered its own template in the meantime.
 */
function registerAddon(slot: (filterBar: FilterBarComponent) => WritableSignal<TemplateRef<unknown> | null>): void {
	const addon = slot(inject(FilterBarComponent));
	const template = inject(TemplateRef);
	addon.set(template);
	inject(DestroyRef).onDestroy(() => {
		if (addon() === template) {
			addon.set(null);
		}
	});
}

@Directive({
	selector: '[luFilterPillAddonBefore]',
})
export class FilterPillAddonBeforeDirective {
	constructor() {
		registerAddon((filterBar) => filterBar.addonBefore);
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
		registerAddon((filterBar) => filterBar.addonAfter);
	}

	public static ngTemplateContextGuard(_dir: FilterPillAddonAfterDirective, _ctx: unknown): _ctx is void {
		return true;
	}
}
