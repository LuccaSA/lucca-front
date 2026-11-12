import { computed, Directive, forwardRef, input, signal } from '@angular/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Item, ɵLU_CORE_SELECT_PUBLIC_API_VERSION } from '@lucca-front/ng/core-select/api';

export interface LuCoreSelectPublicEstablishment extends LuCoreSelectApiV5Item {
	name: string;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicEstablishments],lu-multi-select[publicEstablishments]',
	exportAs: 'luPublicEstablishments',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicEstablishmentsDirective),
		},
	],
})
export class LuCoreSelectPublicEstablishmentsDirective<T extends LuCoreSelectPublicEstablishment = LuCoreSelectPublicEstablishment> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * Query params added to every request, e.g. `{ 'legalEntity.id': '1,2' }`
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = signal('/lucca-api/business-establishments');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => ({
		isArchived: false,
		...this.filters(),
	}));
}
