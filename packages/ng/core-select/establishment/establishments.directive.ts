import { HttpClient } from '@angular/common/http';
import { DestroyRef, Directive, OnInit, computed, forwardRef, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, filter, map, switchMap } from 'rxjs';
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

	url = input<string>('/organization/structure/api/establishments');
	filters = input<Record<string, string | number | boolean> | null>(null);
	operationIds = input<readonly number[] | null>(null);
	uniqueOperationIds = input<readonly number[] | null>(null);
	appInstanceId = input<number | null>(null);
	searchDelimiter = input<string>(' ');

	protected clue = toSignal(this.clue$);

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
			.get<T[] | { items: T[] }>(this.url(), {
				params: {
					...params,
					page: page + 1,
					limit: this.pageSize,
				},
			})
			.pipe(map((res) => (Array.isArray(res) ? res : res?.items) ?? []));
	}

	protected override params$: Observable<Record<string, string | number | boolean>> = toObservable(
		computed(() => {
			const operationIds = this.operationIds();
			const uniqueOperationIds = this.uniqueOperationIds();
			const appInstanceId = this.appInstanceId();
			const clue = this.clue();
			const searchDelimiter = this.searchDelimiter();
			return {
				...this.filters(),
				...(clue
					? // When the clue is not empty, sort establishments by name
						{ search: applySearchDelimiter(clue, searchDelimiter), sort: 'name' }
					: // When the clue is empty, establishments are grouped by legal unit, so sort them by legal unit name and then by name
						{ sort: 'legalunit.name,name' }),
				...(operationIds ? { operations: operationIds.join(',') } : {}),
				...(uniqueOperationIds ? { uniqueOperations: uniqueOperationIds.join(',') } : {}),
				...(appInstanceId ? { appInstanceId } : {}),
			};
		}),
	);

	public totalCount$ = toObservable(computed(() => ({ url: this.url(), filters: this.filters() }))).pipe(
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
