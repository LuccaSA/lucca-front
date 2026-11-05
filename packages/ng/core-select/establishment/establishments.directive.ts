import { HttpClient } from '@angular/common/http';
import { Directive, Injector, OnInit, computed, forwardRef, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { luNullableNumberAttribute, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, LuOptionGrouping, applySearchDelimiter, luAccumulatePages } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, map, of, switchMap } from 'rxjs';
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
	#injector = inject(Injector);

	protected httpClient = inject(HttpClient);

	readonly url = input<string>('/organization/structure/api/establishments');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	/** @deprecated use `uniqueOperationIds` instead */
	readonly operationIds = input<readonly number[] | null>(null);
	readonly uniqueOperationIds = input<readonly number[] | null>(null);
	/** @deprecated use `uniqueOperationIds` instead */
	readonly appInstanceId = input(null, { transform: luNullableNumberAttribute });
	readonly searchDelimiter = input<string>(' ');

	/**
	 * Scopes the list to a single legal unit, server side. The establishments of the other legal
	 * units are then neither listed nor reachable through a search, so a selection cannot mix two
	 * legal units — the constraint is imposed rather than assumed. Grouping is dropped along with
	 * it: a header repeating the one legal unit every option belongs to says nothing.
	 */
	readonly legalUnitId = input(null, { transform: luNullableNumberAttribute });

	protected readonly clue = toSignal(this.clue$);

	readonly #useGrouping = toSignal(this.#groupingService.useGrouping$, { initialValue: false });

	// Built once, so the effect below can tell the grouping it installed from one a consumer set.
	readonly #grouping: LuOptionGrouping<T, unknown> = {
		selector: (option) => option.legalUnitId,
		content: LuEstablishmentGroupingComponent,
	};

	public override ngOnInit(): void {
		super.ngOnInit();
		this.initGrouping();
	}

	protected initGrouping() {
		ɵeffectWithDeps(
			[this.#useGrouping, this.legalUnitId],
			(useGrouping, legalUnitId) => {
				if (useGrouping && legalUnitId === null) {
					this.select.groupingSignal.set(this.#grouping);
				} else if (this.select.groupingSignal() === this.#grouping) {
					// Only ever clears the grouping it installed, never one the consumer declared.
					this.select.groupingSignal.set(undefined);
				}
			},
			{ injector: this.#injector },
		);
	}

	/**
	 * Params shared by every call: the restrictions that define which establishments are selectable,
	 * without the clue-dependent search and sort.
	 */
	readonly #restrictionParams = computed<Record<string, string | number | boolean>>(() => {
		const operationIds = this.operationIds();
		const uniqueOperationIds = this.uniqueOperationIds();
		const appInstanceId = this.appInstanceId();
		const legalUnitId = this.legalUnitId();
		return {
			...this.filters(),
			...(legalUnitId === null ? {} : { legalUnitId }),
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
	protected override getGroupOptions = (legalUnitId: unknown): Observable<T[]> => this.#getAllLegalUnitOptions(legalUnitId as number, 0);

	/**
	 * One page of the establishments of a single legal unit, sorted by name. Public so a select
	 * listing legal units and their establishments together can fetch a branch when it unfolds,
	 * rather than pulling every page the way the group select-all has to. `isLastPage` is reported
	 * because the page size is not part of the public surface.
	 */
	public getLegalUnitOptionsPage(legalUnitId: number, page: number): Observable<{ items: T[]; isLastPage: boolean }> {
		return this.getOptions({ ...this.#restrictionParams(), legalUnitId, sort: 'name' }, page).pipe(map((items) => ({ items, isLastPage: items.length < this.pageSize })));
	}

	#getAllLegalUnitOptions(legalUnitId: number, page: number): Observable<T[]> {
		return luAccumulatePages((nextPage) => this.getLegalUnitOptionsPage(legalUnitId, nextPage), page);
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

	public override readonly totalCount$ = toObservable(computed(() => ({ url: this.url(), filters: this.filters(), legalUnitId: this.legalUnitId() }))).pipe(
		debounceTime(250),
		switchMap(({ url, filters, legalUnitId }) =>
			this.httpClient.get<{ count: number }>(url, {
				params: {
					...filters,
					...(legalUnitId === null ? {} : { legalUnitId }),
					['fields.root']: 'count',
				},
			}),
		),
		map((res) => res?.count ?? 0),
	);

	protected override optionKey = (option: T) => option.id;
}
