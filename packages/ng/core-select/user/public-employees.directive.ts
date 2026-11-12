import { computed, Directive, forwardRef, input, signal } from '@angular/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Item, ɵLU_CORE_SELECT_PUBLIC_API_VERSION } from '@lucca-front/ng/core-select/api';
import { LuDisplayFormat, LuDisplayFullname } from '@lucca-front/ng/user';
import { LuPublicEmployeeOptionComponent } from './public-employee-option.component';

export interface LuCoreSelectPublicEmployee extends LuCoreSelectApiV5Item {
	givenName: string;
	familyName: string;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicEmployees],lu-multi-select[publicEmployees]',
	exportAs: 'luPublicEmployees',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicEmployeesDirective),
		},
	],
})
export class LuCoreSelectPublicEmployeesDirective<T extends LuCoreSelectPublicEmployee = LuCoreSelectPublicEmployee> extends ALuCoreSelectApiV5Directive<T> {
	/**
	 * Format of the employee names
	 */
	readonly displayFormat = input<LuDisplayFormat>(LuDisplayFullname.lastfirst);

	/**
	 * Query params added to every request, e.g. `{ status: 'active,upcoming' }` or `{ 'applicableJobPosition.department.id': '12' }`
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = signal('/lucca-api/employees');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => ({
		status: 'active',
		sort: 'familyName',
		...this.filters(),
	}));

	constructor() {
		super();
		this.select.optionTpl.set(LuPublicEmployeeOptionComponent);
	}
}
