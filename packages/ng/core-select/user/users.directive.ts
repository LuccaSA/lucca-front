import { HttpClient } from '@angular/common/http';
import { Directive, Type, booleanAttribute, computed, effect, forwardRef, inject, input, signal, untracked } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ILuApiCollectionResponse } from '@lucca-front/ng/api';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { LuDisplayFormat, LuDisplayFullname } from '@lucca-front/ng/user';
import { EMPTY, Observable, catchError, combineLatest, debounceTime, map, of, shareReplay, switchMap, take, tap } from 'rxjs';
import { FORMER_EMPLOYEES_CONTEXT, FormerEmployeesContext, LuCoreSelectFormerEmployeesComponent } from './former-employees.component';
import { LU_CORE_SELECT_CURRENT_USER_ID } from './me.provider';
import { LuUserDisplayerComponent } from './user-displayer.component';
import { LuCoreSelectUserHomonymsService } from './user-homonym.service';
import { LuUserOptionComponent } from './user-option.component';
import { LuCoreSelectUser, LuCoreSelectWithAdditionnalInformation } from './user-option.model';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[users],lu-multi-select[users]',
	standalone: true,
	exportAs: 'luUsers',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectUsersDirective),
		},
		{
			provide: FORMER_EMPLOYEES_CONTEXT,
			useExisting: forwardRef(() => LuCoreSelectUsersDirective satisfies Type<FormerEmployeesContext>),
		},
	],
})
export class LuCoreSelectUsersDirective<T extends LuCoreSelectUser = LuCoreSelectUser>
	extends ALuCoreSelectApiDirective<LuCoreSelectWithAdditionnalInformation<T>>
	implements CoreSelectApiTotalCountProvider
{
	#defaultSearchUrl = '/api/v3/users/search';
	#defaultScopedSearchUrl = '/api/v3/users/scopedsearch';
	#userHomonymsService = inject(LuCoreSelectUserHomonymsService);

	// Not overridable so it will ease employee API migration
	#userFields = 'id,firstName,lastName,picture.href';

	protected httpClient = inject(HttpClient);
	public currentUserId = inject(LU_CORE_SELECT_CURRENT_USER_ID);

	displayFormat = input<LuDisplayFormat>(LuDisplayFullname.lastfirst);

	filters = input<Record<string, string | number | boolean>>({});
	url = input<string | null>(null);
	orderBy = input<string | null>(null);
	operationIds = input<number[] | null>(null);
	appInstanceId = input<number | null>(null);
	enableFormerEmployees = input(false, { transform: booleanAttribute });
	displayMeOption = input(true);

	includeFormerEmployees = signal(false);

	constructor() {
		super();
		this.select.optionTpl.set(LuUserOptionComponent);
		this.select.valueTpl.set(LuUserDisplayerComponent);

		effect(() => {
			const enableFormerEmployees = this.enableFormerEmployees();
			untracked(() => this.select.panelHeaderTpl.set(enableFormerEmployees ? LuCoreSelectFormerEmployeesComponent : undefined));
		});
	}

	protected defaultUrl = computed(() => (this.appInstanceId() && this.operationIds()?.length ? this.#defaultScopedSearchUrl : this.#defaultSearchUrl));
	protected displayMeOption$ = toObservable(this.displayMeOption);
	protected urlOrDefault = computed(() => this.url() ?? this.defaultUrl());

	protected clue = toSignal(this.clue$);

	protected override params$: Observable<Record<string, string | number | boolean>> = toObservable(
		computed(() => {
			const orderBy = this.orderBy();
			const clue = this.clue();
			const operationIds = this.operationIds();
			const appInstanceId = this.appInstanceId();
			const formerEmployees = this.includeFormerEmployees();

			return {
				fields: this.#userFields,
				...this.filters(),
				...(orderBy ? { orderBy } : {}),
				...(clue ? { clue } : {}),
				...(operationIds ? { operations: operationIds.join(',') } : {}),
				...(appInstanceId ? { appInstanceId } : {}),
				...(formerEmployees ? { formerEmployees } : {}),
			};
		}),
	);

	protected meParams$ = toObservable(
		computed(() => ({
			fields: this.#userFields,
			...this.filters(),
			...(this.operationIds() ? { operations: this.operationIds().join(',') } : {}),
			...(this.appInstanceId() ? { appInstanceId: this.appInstanceId() } : {}),
			id: this.currentUserId,
		})),
	);

	protected me$ = this.meParams$.pipe(
		switchMap((params) => this.httpClient.get<ILuApiCollectionResponse<{ item: T }>>(this.urlOrDefault(), { params }).pipe(catchError(() => EMPTY))),
		map((res) => res.data.items.map(({ item }) => item)[0] ?? null),
		takeUntilDestroyed(),
		shareReplay(1),
	);

	public totalCount$ = toObservable(computed(() => ({ url: this.urlOrDefault(), filters: this.filters() }))).pipe(
		debounceTime(250),
		switchMap(({ url, filters }) =>
			this.httpClient.get<{ count: number }>(url, {
				params: {
					...filters,
					['fields.root']: 'count',
				},
			}),
		),
		map((res) => res?.count ?? 0),
	);

	protected getMe(): Observable<T | null> {
		return this.me$.pipe(take(1));
	}

	protected getOptions(params: Record<string, string | number | boolean>, page: number): Observable<T[]> {
		return this.httpClient
			.get<ILuApiCollectionResponse<{ item: T }>>(this.urlOrDefault(), {
				params: {
					...params,
					paging: `${page * this.pageSize},${this.pageSize}`,
				},
			})
			.pipe(map((res) => res.data.items.map(({ item }) => item)));
	}

	protected override getOptionsPage(params: Record<string, string | number | boolean>, page: number): Observable<{ items: LuCoreSelectWithAdditionnalInformation<T>[]; isLastPage: boolean }> {
		const hasClue = !!params['clue'];
		const displayMe = this.displayMeOption && !hasClue;
		const prependMe = displayMe && page === 0;

		this.select.loading = true;

		const me$ = prependMe ? this.getMe() : of(null);

		const users$ = this.getOptions(params, page).pipe(
			map((users) => ({ items: users, isLastPage: users.length < this.pageSize })),
			tap(() => (this.select.loading = false)),
		);

		const page$ = combineLatest([me$, users$]).pipe(
			map(([me, { items, isLastPage }]) => {
				// If "me" is displayed as first option, we remove it from the list of users
				const filteredItems = displayMe ? items.filter((u) => u.id !== this.currentUserId) : items;
				return { items: me && prependMe ? [me, ...filteredItems] : filteredItems, isLastPage };
			}),
		);

		return page$.pipe(switchMap((page) => this.#userHomonymsService.handleHomonyms(page.items, this.displayFormat()).pipe(map((items) => ({ items, isLastPage: page.isLastPage })))));
	}

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
	protected override optionKey = (option: T) => option.id;
}
