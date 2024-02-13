import { HttpClient } from '@angular/common/http';
import { Directive, Input, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ILuApiCollectionResponse } from '@lucca-front/ng/api';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { LuDisplayFormat, LuDisplayFullname } from '@lucca-front/ng/user';
import { EMPTY, Observable, combineLatest, distinctUntilChanged, filter, map, of, shareReplay, switchMap, take } from 'rxjs';
import { LU_CORE_SELECT_CURRENT_USER_ID } from './me.provider';
import { LuUserDisplayerComponent } from './user-displayer.component';
import { LuCoreSelectUserHomonymsService } from './user-homonym.service';
import { LuUserOptionComponent } from './user-option.component';
import { LuCoreSelectUser } from './user-option.model';

export interface ILuCoreSelectUsersApiParams {
	orderBy?: string;
	operationIds?: number[];
	appInstanceId?: number;
	enableFormerEmployees?: boolean;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[users],lu-multi-select[users]',
	standalone: true,
})
export class LuCoreSelectUsersDirective<T extends LuCoreSelectUser = LuCoreSelectUser> extends ALuCoreSelectApiDirective<T> {
	#defaultSearchUrl = '/api/v3/users/search';
	#defaultScopedSearchUrl = '/api/v3/users/scopedsearch';
	#userHomonymsService = inject(LuCoreSelectUserHomonymsService);

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
		this.displayFormat = format;
	}

	private _displayFormat: LuDisplayFormat = LuDisplayFullname.lastfirst;

	public get displayFormat() {
		return this._displayFormat;
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
			...filters,
			...(orderBy ? { orderBy } : {}),
			...(clue ? { clue: sanitizeClueFilter(clue) } : {}),
			...(operationIds ? { operationIds: operationIds.join(',') } : {}),
			...(appInstanceId ? { appInstanceId } : {}),
			...(enableFormerEmployees ? { enableFormerEmployees } : {}),
		})),
	);

	protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<T[]> {
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

	protected getMe(): Observable<T | null> {
		const url = this.customUrl() || this.defaultUrl();

		const params = {
			...(this._filters() ?? {}),
			...(this._operationIds() ? { operationIds: this._operationIds().join(',') } : {}),
			...(this._appInstanceId() ? { appInstanceId: this._appInstanceId() } : {}),
			...(this._enableFormerEmployees() ? { enableFormerEmployees: this._enableFormerEmployees() } : {}),
			id: this.currentUserId,
		};

		return this.httpClient
			.get<ILuApiCollectionResponse<{ item: T }>>(url, {
				params,
			})
			.pipe(map((res) => res.data.items.map(({ item }) => item)[0] ?? null));
	}

	protected override buildOptions(): Observable<T[]> {
		const hasClue$ = this.clue$.pipe(map((clue) => !!clue));
		const displayMe$ = combineLatest([hasClue$, this.displayMeOption$]).pipe(
			map(([hasClue, displayMeOption]) => displayMeOption && !hasClue),
			distinctUntilChanged(),
		);

		// Wait for the first time the panel is open to get the current user
		const me$ = this.select.isPanelOpen$.pipe(
			filter((isOpen) => isOpen),
			take(1),
			switchMap((isOpen) => (isOpen ? this.getMe() : EMPTY)),
			shareReplay({ bufferSize: 1, refCount: true }),
		);

		const options$ = super.buildOptions();

		return displayMe$.pipe(
			switchMap((displayMe) => combineLatest([options$, displayMe ? me$ : of(null)])),
			map(([options, me]) => (me ? [me, ...(options ?? []).filter((o) => o.id !== me.id)] : options)),
			switchMap((users) => this.#userHomonymsService.handleHomonyms(users, this.displayFormat)),
		);
	}

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
}

function sanitizeClueFilter(clue: string) {
	return clue
		.split(' ')
		.map((c: string) => encodeURIComponent(c))
		.join(',');
}
