import { HttpClient } from '@angular/common/http';
import { DestroyRef, Directive, OnInit, computed, forwardRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { luBooleanAttribute, luNullableNumberAttribute } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter, ɵLU_UNGROUPED_OPTIONS } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, catchError, combineLatest, debounceTime, filter, map, of, shareReplay, switchMap, take, tap } from 'rxjs';
import { LuEstablishmentGroupingComponent } from './establishment-grouping.component';
import { EstablishmentGroupingService } from './establishment-grouping.service';
import { LuEstablishmentOptionComponent } from './establishment-option.component';
import { LuCoreSelectEstablishment } from './models';
import { LU_CORE_SELECT_CURRENT_ESTABLISHMENT_ID } from './my-establishment.provider';

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[establishments],lu-multi-select[establishments]',
	exportAs: 'luEstablishments',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectEstablishmentsDirective),
		},
	],
})
export class LuCoreSelectEstablishmentsDirective<T extends LuCoreSelectEstablishment = LuCoreSelectEstablishment>
	extends ALuCoreSelectApiDirective<T>
	implements OnInit, CoreSelectApiTotalCountProvider
{
	#groupingService = inject(EstablishmentGroupingService);
	#destroyRef = inject(DestroyRef);

	protected httpClient = inject(HttpClient);
	public readonly currentEstablishmentId = inject(LU_CORE_SELECT_CURRENT_ESTABLISHMENT_ID, { optional: true });

	readonly url = input<string>('/organization/structure/api/establishments');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	/** @deprecated use `uniqueOperationIds` instead */
	readonly operationIds = input<readonly number[] | null>(null);
	readonly uniqueOperationIds = input<readonly number[] | null>(null);
	/** @deprecated use `uniqueOperationIds` instead */
	readonly appInstanceId = input(null, { transform: luNullableNumberAttribute });
	readonly searchDelimiter = input<string>(' ');
	/**
	 * Display the establishment of the current user as the first option, out of the legal unit groups, while the search is empty.
	 * The app must provide it with `provideCoreSelectCurrentEstablishmentId`, otherwise the option is not displayed.
	 */
	readonly displayMyEstablishmentOption = input(false, { transform: luBooleanAttribute });

	protected readonly clue = toSignal(this.clue$);

	/**
	 * Id of the establishment currently displayed as "My establishment", set along with the options page that displays it.
	 */
	readonly #myEstablishmentOptionId = signal<number | null>(null);

	constructor() {
		super();
		this.select.optionTpl.set(LuEstablishmentOptionComponent);
	}

	public override ngOnInit(): void {
		super.ngOnInit();
		this.initGrouping();
	}

	protected initGrouping() {
		this.#groupingService.useGrouping$.pipe(filter(Boolean), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
			this.select.groupingSignal.set({
				selector: (option) => (this.isMyEstablishmentOption(option) ? ɵLU_UNGROUPED_OPTIONS : option.legalUnitId),
				content: LuEstablishmentGroupingComponent,
			});
		});
	}

	/**
	 * Params shared by every call: the restrictions that define which establishments are selectable,
	 * without the clue-dependent search and sort.
	 */
	readonly #restrictionParams = computed<Record<string, string | number | boolean>>(() => {
		const operationIds = this.operationIds();
		const uniqueOperationIds = this.uniqueOperationIds();
		const appInstanceId = this.appInstanceId();
		return {
			...this.filters(),
			...(operationIds ? { operations: operationIds.join(',') } : {}),
			...(uniqueOperationIds ? { uniqueOperations: uniqueOperationIds.join(',') } : {}),
			...(appInstanceId ? { appInstanceId } : {}),
		};
	});

	/**
	 * Lookup of the current user's establishment, with the same restrictions as the options so it is only displayed when selectable.
	 */
	readonly #myEstablishment$ = toObservable(
		computed<Record<string, string | number | boolean>>(() => ({
			...this.#restrictionParams(),
			...(this.currentEstablishmentId !== null ? { id: this.currentEstablishmentId } : {}),
		})),
	).pipe(
		switchMap((params) =>
			this.httpClient.get<T[] | { items: T[] }>(this.url(), { params }).pipe(
				// A custom `url` may ignore `id`: only keep the expected establishment
				map((res) => ((Array.isArray(res) ? res : res?.items) ?? []).find((establishment) => establishment.id === this.currentEstablishmentId) ?? null),
				// A failed lookup must not block the options it is combined with
				catchError(() => of(null)),
			),
		),
		takeUntilDestroyed(),
		shareReplay(1),
	);

	/**
	 * Whether the option is the one displayed as "My establishment", at the top of the options.
	 */
	public isMyEstablishmentOption(option: T): boolean {
		return option.id === this.#myEstablishmentOptionId();
	}

	protected override getOptionsPage(params: Record<string, string | number | boolean> | null, page: number): Observable<{ items: T[]; isLastPage: boolean }> {
		const options$ = super.getOptionsPage(params, page);
		const displayMyEstablishment = this.displayMyEstablishmentOption() && this.currentEstablishmentId !== null && !params?.['search'];

		if (!displayMyEstablishment) {
			return options$.pipe(
				tap(() => {
					if (page === 0) {
						this.#myEstablishmentOptionId.set(null);
					}
				}),
			);
		}

		return combineLatest([this.#myEstablishment$.pipe(take(1)), options$]).pipe(
			tap(([myEstablishment]) => {
				if (page === 0) {
					this.#myEstablishmentOptionId.set(myEstablishment?.id ?? null);
				}
			}),
			map(([myEstablishment, { items, isLastPage }]) => {
				if (!myEstablishment) {
					return { items, isLastPage };
				}
				// "My establishment" is moved to the top of the options, so it's removed from its legal unit
				const otherItems = items.filter((establishment) => establishment.id !== myEstablishment.id);
				return { items: page === 0 ? [myEstablishment, ...otherItems] : otherItems, isLastPage };
			}),
		);
	}

	protected override buildParamsFromClue(clue: string): Observable<Record<string, string | number | boolean>> {
		// Use the clue parameter directly instead of reading from the async signal
		// to avoid stale params when selection triggers an immediate clue reset
		return of({
			...this.#restrictionParams(),
			...(clue ? { search: applySearchDelimiter(clue, this.searchDelimiter()), sort: 'name' } : { sort: 'legalunit.name,name' }),
		});
	}

	/**
	 * Establishments are grouped by legal unit, but the panel only knows the options of the pages it
	 * already loaded: a legal unit spanning several pages would be partially selected. Fetch the whole
	 * legal unit instead, page by page, so "select all" covers the options that are not rendered yet.
	 * Groups are only displayed when the clue is empty, hence the clue-less params.
	 */
	protected override getGroupOptions = (legalUnitId: unknown): Observable<T[]> => this.#getLegalUnitOptions(legalUnitId as number, 0);

	#getLegalUnitOptions(legalUnitId: number, page: number): Observable<T[]> {
		const params = { ...this.#restrictionParams(), legalUnitId, sort: 'name' };
		return this.getOptions(params, page).pipe(
			switchMap((options) => {
				// A custom `url` may ignore `legalUnitId`: keep this legal unit only, but page on the raw size
				const legalUnitOptions = options.filter((option) => option.legalUnitId === legalUnitId);
				return options.length < this.pageSize ? of(legalUnitOptions) : this.#getLegalUnitOptions(legalUnitId, page + 1).pipe(map((nextOptions) => [...legalUnitOptions, ...nextOptions]));
			}),
		);
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null, page: number): Observable<T[]> {
		const options$ = this.httpClient
			.get<T[] | { items: T[] }>(this.url(), {
				params: {
					...params,
					page: page + 1,
					limit: this.pageSize,
				},
			})
			.pipe(map((res) => (Array.isArray(res) ? res : res?.items) ?? []));

		return this.#groupingService.useGrouping$.pipe(switchMap(() => options$));
	}

	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const clue = this.clue();
		const searchDelimiter = this.searchDelimiter();
		return {
			...this.#restrictionParams(),
			...(clue
				? // When the clue is not empty, sort establishments by name
					{ search: applySearchDelimiter(clue, searchDelimiter), sort: 'name' }
				: // When the clue is empty, establishments are grouped by legal unit, so sort them by legal unit name and then by name
					{ sort: 'legalunit.name,name' }),
		};
	});
	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(this.paramsSignal);

	public override readonly totalCount$ = toObservable(computed(() => ({ url: this.url(), filters: this.filters() }))).pipe(
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

	protected override optionKey = (option: T) => option.id;
}
