import { computed, Directive, effect, forwardRef, inject, input, signal, untracked } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Collection, LuCoreSelectApiV5Item, ɵLU_CORE_SELECT_PUBLIC_API_VERSION } from '@lucca-front/ng/core-select/api';
import { LuDisplayFormat, LuDisplayFullname, luEmployeeDisplay } from '@lucca-front/ng/user';
import { catchError, combineLatest, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { FORMER_EMPLOYEES_CONTEXT, LuCoreSelectFormerEmployeesComponent } from './former-employees.component';
import { LU_CORE_SELECT_CURRENT_USER_ID } from './me.provider';
import { LuPublicEmployeeDisplayerComponent, LuPublicEmployeeOptionComponent } from './public-employee-option.component';
import { LuCoreSelectWithAdditionnalInformation } from './user-option.model';

export interface LuCoreSelectPublicEmployee extends LuCoreSelectApiV5Item {
	givenName: string;
	familyName: string;
	portrait?: LuCoreSelectApiV5Item | null;
	applicableJobPosition?: LuCoreSelectApiV5Item | null;
	links?: { files?: Record<string, { href: string } | null> | null } | null;
	/**
	 * Download link of the portrait, read from `links.files`
	 */
	picture?: { href: string } | null;
}

type Params = Record<string, string | number | boolean>;

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
		{
			provide: FORMER_EMPLOYEES_CONTEXT,
			useExisting: forwardRef(() => LuCoreSelectPublicEmployeesDirective),
		},
	],
})
export class LuCoreSelectPublicEmployeesDirective<T extends LuCoreSelectPublicEmployee = LuCoreSelectPublicEmployee> extends ALuCoreSelectApiV5Directive<T, LuCoreSelectWithAdditionnalInformation<T>> {
	readonly #currentUserId = inject(LU_CORE_SELECT_CURRENT_USER_ID, { optional: true });

	/**
	 * Id of the current employee, from `provideCoreSelectCurrentUserId`
	 */
	readonly currentEmployeeId = this.#currentUserId === null ? null : `${this.#currentUserId}`;

	/**
	 * Format of the employee names
	 */
	readonly displayFormat = input<LuDisplayFormat>(LuDisplayFullname.lastfirst);

	/**
	 * Query params added to every request, e.g. `{ status: 'active,upcoming' }` or `{ 'applicableJobPosition.department.id': '12' }`
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	/**
	 * Shows the current employee first when the clue is empty. Requires `provideCoreSelectCurrentUserId`
	 */
	readonly displayMeOption = input(true, { transform: luBooleanAttribute });

	/**
	 * Adds a toggle in the panel header to include the employees who left
	 */
	readonly enableFormerEmployees = input(false, { transform: luBooleanAttribute });

	readonly includeFormerEmployees = signal(false);

	protected override readonly url = signal('/lucca-api/employees');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly includeEmbedded = true;

	protected override readonly queryParams = computed<Params>(() => ({
		status: this.includeFormerEmployees() ? 'active,deactivated' : 'active',
		sort: 'familyName',
		...this.filters(),
	}));

	#departmentNames = new Map<string, string>();

	#me$ = this.currentEmployeeId
		? this.fetchPage({ id: this.currentEmployeeId }, undefined, 1).pipe(
				switchMap((collection) => this.toOptions(collection)),
				map(([me]) => me ?? null),
				catchError(() => of(null)),
				shareReplay(1),
			)
		: of(null);

	constructor() {
		super();
		this.select.optionTpl.set(LuPublicEmployeeOptionComponent);
		this.select.valueTpl.set(LuPublicEmployeeDisplayerComponent);

		effect(() => {
			const panelHeaderTpl = this.enableFormerEmployees() ? LuCoreSelectFormerEmployeesComponent : undefined;
			untracked(() => this.select.panelHeaderTpl.set(panelHeaderTpl));
		});
	}

	isMeOption(employee: T, clue: string | null): boolean {
		return !clue && this.displayMeOption() && employee.id === this.currentEmployeeId;
	}

	protected override getOptionsPage(params: Params, page: number): Observable<{ items: LuCoreSelectWithAdditionnalInformation<T>[]; isLastPage: boolean }> {
		const displayMe = this.displayMeOption() && !!this.currentEmployeeId && !params['search'];
		const me$ = displayMe && page === 0 ? this.#me$ : of(null);

		return combineLatest([me$, super.getOptionsPage(params, page)]).pipe(
			map(([me, { items, isLastPage }]) => {
				const others = displayMe ? items.filter(({ id }) => id !== this.currentEmployeeId) : items;
				return { items: me ? [me, ...others] : others, isLastPage };
			}),
		);
	}

	protected override toOptions(collection: LuCoreSelectApiV5Collection<T>): Observable<LuCoreSelectWithAdditionnalInformation<T>[]> {
		const jobPositions = (collection.embedded?.['job-position'] ?? {}) as Record<string, { department?: LuCoreSelectApiV5Item | null }>;
		const departments = (collection.embedded?.['department'] ?? {}) as Record<string, { name?: string }>;

		return of(
			(collection.items ?? []).map((employee) => {
				const departmentId = jobPositions[employee.applicableJobPosition?.id ?? '']?.department?.id;
				const departmentName = departmentId ? departments[departmentId]?.name : undefined;
				if (departmentName) {
					this.#departmentNames.set(employee.id, departmentName);
				}
				const pictureHref = employee.portrait ? employee.links?.files?.[employee.portrait.id]?.href : null;
				return { ...employee, picture: pictureHref ? { href: pictureHref } : null };
			}),
		);
	}

	/**
	 * Homonyms may land on different pages, so they are detected on every loaded option at once.
	 */
	protected override transformOptions(options: readonly LuCoreSelectWithAdditionnalInformation<T>[]): Observable<readonly LuCoreSelectWithAdditionnalInformation<T>[]> {
		const format = this.displayFormat();
		const countByName = new Map<string, number>();
		for (const option of options) {
			const name = luEmployeeDisplay(option, format);
			countByName.set(name, (countByName.get(name) ?? 0) + 1);
		}

		return of(options.map((option) => ((countByName.get(luEmployeeDisplay(option, format)) ?? 0) > 1 ? { ...option, additionalInformation: this.#departmentNames.get(option.id) } : option)));
	}
}
