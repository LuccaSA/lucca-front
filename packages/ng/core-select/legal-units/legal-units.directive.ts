import { HttpClient } from '@angular/common/http';
import { Directive, OnInit, booleanAttribute, computed, forwardRef, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, map, of, switchMap } from 'rxjs';
import { ARCHIVED_LEGAL_UNITS_CONTEXT, LuCoreSelectArchivedLegalUnitsComponent } from './archived-legal-units.component';
import { LuCoreSelectLegalUnit } from './models';

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[legalUnits],lu-multi-select[legalUnits]',
	exportAs: 'luLegalUnits',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectLegalUnitsDirective),
		},
		{
			provide: ARCHIVED_LEGAL_UNITS_CONTEXT,
			useExisting: forwardRef(() => LuCoreSelectLegalUnitsDirective),
		},
	],
})
export class LuCoreSelectLegalUnitsDirective<T extends LuCoreSelectLegalUnit = LuCoreSelectLegalUnit> extends ALuCoreSelectApiDirective<T> implements OnInit, CoreSelectApiTotalCountProvider {
	protected httpClient = inject(HttpClient);

	readonly url = input<string>('/organization/structure/api/legal-units');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	readonly uniqueOperationIds = input<readonly number[] | null>(null);
	readonly searchDelimiter = input<string>(' ');
	readonly enableArchivedLegalUnits = input(false, { transform: booleanAttribute });

	readonly includeArchivedLegalUnits = signal(false);

	protected readonly clue = toSignal(this.clue$);

	constructor() {
		super();
		ɵeffectWithDeps([this.enableArchivedLegalUnits], (enableArchivedLegalUnits) => this.select.panelHeaderTpl.set(enableArchivedLegalUnits ? LuCoreSelectArchivedLegalUnitsComponent : undefined));
	}

	protected override buildParamsFromClue(clue: string): Observable<Record<string, string | number | boolean>> {
		// Use the clue parameter directly instead of reading from the async signal
		// to avoid stale params when selection triggers an immediate clue reset
		return of({
			...this.filters(),
			sort: 'name',
			...(clue ? { search: applySearchDelimiter(clue, this.searchDelimiter()) } : {}),
			...(this.uniqueOperationIds() ? { uniqueOperations: this.uniqueOperationIds()!.join(',') } : {}),
			...(this.includeArchivedLegalUnits() ? { isArchived: true } : {}),
		});
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null, page: number): Observable<T[]> {
		return this.httpClient
			.get<{ items: T[] }>(this.url(), {
				params: {
					...params,
					page: page + 1,
					limit: this.pageSize,
				},
			})
			.pipe(map((res) => res?.items ?? []));
	}

	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(
		computed(() => {
			const uniqueOperationIds = this.uniqueOperationIds();
			const clue = this.clue();
			const includeArchivedLegalUnits = this.includeArchivedLegalUnits();
			return {
				...this.filters(),
				sort: 'name',
				...(clue ? { search: applySearchDelimiter(clue, this.searchDelimiter()) } : {}),
				...(uniqueOperationIds ? { uniqueOperations: uniqueOperationIds.join(',') } : {}),
				...(includeArchivedLegalUnits ? { isArchived: true } : {}),
			};
		}),
	);

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
