import { HttpClient } from '@angular/common/http';
import { Directive, OnInit, computed, forwardRef, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, map, switchMap } from 'rxjs';
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
	],
})
export class LuCoreSelectLegalUnitsDirective<T extends LuCoreSelectLegalUnit = LuCoreSelectLegalUnit> extends ALuCoreSelectApiDirective<T> implements OnInit, CoreSelectApiTotalCountProvider {
	protected httpClient = inject(HttpClient);

	readonly url = input<string>('/organization/structure/api/legal-units');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	readonly uniqueOperationIds = input<readonly number[] | null>(null);
	readonly searchDelimiter = input<string>(' ');

	protected readonly clue = toSignal(this.clue$);

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
			return {
				...this.filters(),
				sort: 'name',
				...(clue ? { search: applySearchDelimiter(clue, this.searchDelimiter()) } : {}),
				...(uniqueOperationIds ? { uniqueOperations: uniqueOperationIds.join(',') } : {}),
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
