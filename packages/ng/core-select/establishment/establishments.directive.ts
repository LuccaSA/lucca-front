import { HttpClient } from '@angular/common/http';
import { DestroyRef, Directive, Input, OnInit, computed, forwardRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, combineLatest, debounceTime, filter, map, switchMap } from 'rxjs';
import { sanitizeClueFilter } from '../select.utils';
import { LuEstablishmentGroupingComponent } from './establishment-grouping.component';
import { EstablishmentGroupingService } from './establishment-grouping.service';
import { LuCoreSelectEstablishment } from './models';

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[establishments],lu-multi-select[establishments]',
	standalone: true,
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

	@Input()
	public set url(url: string | null) {
		this._url.set(url);
	}

	@Input()
	public set filters(filters: Record<string, string | number | boolean> | null) {
		this._filters.set(filters);
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
	public set searchDelimiter(delimiter: string) {
		this._searchDelimiter = delimiter;
	}

	private _searchDelimiter: string;

	public get searchDelimiter() {
		return this._searchDelimiter;
	}

	protected _url = signal<string>('/organization/structure/api/establishments');
	protected _filters = signal<Record<string, string | number | boolean> | null>(null);
	protected _operationIds = signal<number[] | null>(null);
	protected _appInstanceId = signal<number | null>(null);

	public override ngOnInit(): void {
		super.ngOnInit();
		this.initGrouping();
	}

	protected initGrouping() {
		this.#groupingService.useGrouping$.pipe(filter(Boolean), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
			this.select.grouping = {
				selector: (option) => option.legalUnitId,
				content: LuEstablishmentGroupingComponent,
			};
		});
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null, page: number): Observable<T[]> {
		return this.httpClient
			.get<T[] | { items: T[] }>(this._url(), {
				params: {
					...params,
					page: page + 1,
					limit: this.pageSize,
				},
			})
			.pipe(map((res) => (Array.isArray(res) ? res : res?.items) ?? []));
	}

	protected override params$: Observable<Record<string, string | number | boolean>> = combineLatest([
		toObservable(this._filters),
		this.clue$,
		toObservable(this._operationIds),
		toObservable(this._appInstanceId),
	]).pipe(
		map(([filters, clue, operationIds, appInstanceId]) => ({
			...filters,
			...(clue
				? // When the clue is not empty, sort establishments by name
					{ search: sanitizeClueFilter(clue, this.searchDelimiter), sort: 'name' }
				: // When the clue is empty, establishments are grouped by legal unit, so sort them by legal unit name and then by name
					{ sort: 'legalunit.name,name' }),
			...(operationIds ? { operations: operationIds.join(',') } : {}),
			...(appInstanceId ? { appInstanceId } : {}),
		})),
	);

	public totalCount$ = toObservable(computed(() => ({ url: this._url(), filters: this._filters() }))).pipe(
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

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
	protected override optionKey = (option: T) => option.id;
}
