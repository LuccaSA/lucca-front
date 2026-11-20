import { computed, Directive, forwardRef, input, signal } from '@angular/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import {
	ALuCoreSelectApiV5Directive,
	LuCoreSelectApiV5Item,
	ɵLU_CORE_SELECT_PUBLIC_API_VERSION,
	ɵLuCoreSelectPublicApiTitled,
	ɵLuCoreSelectPublicApiTitleOptionComponent,
} from '@lucca-front/ng/core-select/api';

export interface LuCoreSelectPublicOccupationCategory extends LuCoreSelectApiV5Item, ɵLuCoreSelectPublicApiTitled {}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicOccupationCategories],lu-multi-select[publicOccupationCategories]',
	exportAs: 'luPublicOccupationCategories',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicOccupationCategoriesDirective),
		},
	],
})
export class LuCoreSelectPublicOccupationCategoriesDirective<T extends LuCoreSelectPublicOccupationCategory = LuCoreSelectPublicOccupationCategory> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * Query params added to every request, e.g. `{ 'businessEstablishments.id': '5' }`
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = signal('/lucca-api/occupation-categories');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => ({ ...this.filters() }));

	constructor() {
		super();
		this.select.optionTpl.set(ɵLuCoreSelectPublicApiTitleOptionComponent);
	}
}
