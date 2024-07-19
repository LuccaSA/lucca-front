import { HttpClient } from '@angular/common/http';
import { Directive, Input, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ILuApiCollectionResponse } from '@lucca-front/ng/api';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { LuDisplayFormat, LuDisplayFullname } from '@lucca-front/ng/user';
import { EMPTY, Observable, catchError, combineLatest, map, of, shareReplay, switchMap, take, tap } from 'rxjs';
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
})
export class LuCoreSelectUsersDirective<T extends LuCoreSelectUser = LuCoreSelectUser> extends ALuCoreSelectApiDirective<LuCoreSelectWithAdditionnalInformation<T>> {
	#defaultSearchUrl = '/api/v3/users/search';
	#defaultScopedSearchUrl = '/api/v3/users/scopedsearch';
	#userHomonymsService = inject(LuCoreSelectUserHomonymsService);

	// Not overridable so it will ease employee API migration
	#userFields = 'id,firstName,lastName,picture.href';

	protected httpClient = inject(HttpClient);
	public currentUserId = inject(LU_CORE_SELECT_CURRENT_USER_ID);

	@Input()
	public set url(url: string | null) {
		this.customUrl.set(url);
	}

	@Input()
	public set operationIds(ids: number[] | null) {
		this._operationIds.set(ids);
	}

	@Input()
	public set appInstanceId(id: number | null) {
		this._appInstanceId.set(id);
	}

	@Input()
	public set enableFormerEmployees(value: boolean) {
		this._enableFormerEmployees.set(value);
	}

	@Input()
	public set displayMeOption(value: boolean) {
		this._displayMeOption.set(value);
	}

	public get displayMeOption() {
		return this._displayMeOption();
	}

	@Input()
	public set displayFormat(format: LuDisplayFormat) {
		this._displayFormat = format;
	}

	private _displayFormat: LuDisplayFormat = LuDisplayFullname.lastfirst;

	public get displayFormat() {
		return this._displayFormat;
	}

	@Input()
	public set filters(filters: Record<string, string | number | boolean>) {
		this._filters.set(filters);
	}

	protected _url = signal<string | null>(null);

	constructor() {
		super();
		this.select.optionTpl = LuUserOptionComponent;
		this.select.valueTpl = LuUserDisplayerComponent;
	}

	protected _orderBy = signal<string | null>(null);
	protected _filters = signal<Record<string, string | number | boolean>>({});
	protected _operationIds = signal<number[] | null>(null);
	protected _appInstanceId = signal<number | null>(null);
	protected _enableFormerEmployees = signal<boolean>(false);
	protected defaultUrl = computed(() => (this._appInstanceId() && this._operationIds()?.length ? this.#defaultScopedSearchUrl : this.#defaultSearchUrl));
	protected customUrl = signal<string | null>(null);
	protected _displayMeOption = signal<boolean>(true);
	protected displayMeOption$ = toObservable(this._displayMeOption);

	protected override params$: Observable<Record<string, string | number | boolean>> = combineLatest([
		toObservable(this._filters),
		toObservable(this._orderBy),
		this.clue$,
		toObservable(this._operationIds),
		toObservable(this._appInstanceId),
		toObservable(this._enableFormerEmployees),
	]).pipe(
		map(([filters, orderBy, clue, operationIds, appInstanceId, enableFormerEmployees]) => ({
			fields: this.#userFields,
			...filters,
			...(orderBy ? { orderBy } : {}),
			...(clue ? { clue: clue } : {}),
			...(operationIds ? { operations: operationIds.join(',') } : {}),
			...(appInstanceId ? { appInstanceId } : {}),
			...(enableFormerEmployees ? { formerEmployee: enableFormerEmployees } : {}),
		})),
	);

	protected meParams$ = toObservable(
		computed(() => ({
			fields: this.#userFields,
			...(this._filters() ?? {}),
			...(this._operationIds() ? { operations: this._operationIds().join(',') } : {}),
			...(this._appInstanceId() ? { appInstanceId: this._appInstanceId() } : {}),
			id: this.currentUserId,
		})),
	);

	protected me$ = this.meParams$.pipe(
		switchMap((params) => {
			const url = this.customUrl() || this.defaultUrl();
			return this.httpClient.get<ILuApiCollectionResponse<{ item: T }>>(url, { params }).pipe(catchError(() => EMPTY));
		}),
		map((res) => res.data.items.map(({ item }) => item)[0] ?? null),
		takeUntilDestroyed(),
		shareReplay(1),
	);

	protected getMe(): Observable<T | null> {
		return this.me$.pipe(take(1));
	}

	protected getOptions(params: Record<string, string | number | boolean>, page: number): Observable<T[]> {
		const url = this.customUrl() || this.defaultUrl();

		return this.httpClient
			.get<ILuApiCollectionResponse<{ item: T }>>(url, {
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

		return page$.pipe(switchMap((page) => this.#userHomonymsService.handleHomonyms(page.items, this.displayFormat).pipe(map((items) => ({ items, isLastPage: page.isLastPage })))));
	}

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
	protected override optionKey = (option: T) => option.id;
}
