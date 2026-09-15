import { HttpClient } from '@angular/common/http';
import { DestroyRef, Directive, OnInit, computed, forwardRef, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { luNullableNumberAttribute } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, filter, map, of, switchMap } from 'rxjs';
import { LuEstablishmentGroupingComponent } from './establishment-grouping.component';
import { EstablishmentGroupingService } from './establishment-grouping.service';
import { LuCoreSelectEstablishment } from './models';

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

	readonly url = input<string>('/organization/structure/api/establishments');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	readonly operationIds = input<readonly number[] | null>(null);
	readonly uniqueOperationIds = input<readonly number[] | null>(null);
	readonly appInstanceId = input(null, { transform: luNullableNumberAttribute });
	readonly searchDelimiter = input<string>(' ');

	protected readonly clue = toSignal(this.clue$);

	public override ngOnInit(): void {
		super.ngOnInit();
		this.initGrouping();
	}

	protected initGrouping() {
		this.#groupingService.useGrouping$.pipe(filter(Boolean), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
			this.select.groupingSignal.set({
				selector: (option) => option.legalUnitId,
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
			switchMap((options) => (options.length < this.pageSize ? of(options) : this.#getLegalUnitOptions(legalUnitId, page + 1).pipe(map((nextOptions) => [...options, ...nextOptions])))),
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

	public readonly totalCount$ = toObservable(computed(() => ({ url: this.url(), filters: this.filters() }))).pipe(
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
