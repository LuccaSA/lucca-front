import { computed, Directive, forwardRef, input, signal } from '@angular/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Item, ɵLU_CORE_SELECT_PUBLIC_API_VERSION } from '@lucca-front/ng/core-select/api';

export interface LuCoreSelectPublicDepartment extends LuCoreSelectApiV5Item {
	name: string;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicDepartments],lu-multi-select[publicDepartments]',
	exportAs: 'luPublicDepartments',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicDepartmentsDirective),
		},
	],
})
export class LuCoreSelectPublicDepartmentsDirective<T extends LuCoreSelectPublicDepartment = LuCoreSelectPublicDepartment> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * Query params added to every request, e.g. `{ isArchived: true }` to list the archived departments
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = signal('/lucca-api/departments');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => ({
		isArchived: false,
		sort: 'name',
		...this.filters(),
	}));
}
