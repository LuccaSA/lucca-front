import { computed, Directive, forwardRef, input } from '@angular/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Item } from './api-v5.directive';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicApi],lu-multi-select[publicApi]',
	exportAs: 'luPublicApi',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicApiDirective),
		},
	],
})
export class LuCoreSelectPublicApiDirective<T extends LuCoreSelectApiV5Item = LuCoreSelectApiV5Item> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * URL of a Lucca public API collection, e.g. `/lucca-api/departments`
	 */
	readonly publicApi = input.required<string>();

	/**
	 * Version of the Lucca public API sent as the `Api-Version` header, e.g. `2024-11-01`
	 */
	override readonly apiVersion = input.required<string>();

	/**
	 * Sort instruction sent as the `sort` query param, e.g. `name` or `-createdAt`. Each endpoint lists the keys it accepts
	 */
	readonly sort = input<string | null>(null);

	/**
	 * Query params added to every request
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = this.publicApi;

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => {
		const sort = this.sort();
		return { ...this.filters(), ...(sort ? { sort } : {}) };
	});
}
