import { HttpClient } from '@angular/common/http';
import { computed, Directive, forwardRef, inject, input, model } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ILuApiItem } from '@lucca-front/ng/api';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, sanitizeClueFilter } from '@lucca-front/ng/core-select';
import { debounceTime, map, Observable, switchMap } from 'rxjs';
import { ALuCoreSelectApiDirective } from './api.directive';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[apiV4],lu-multi-select[apiV4]',
	standalone: true,
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectApiV4Directive),
		},
	],
})
export class LuCoreSelectApiV4Directive<T extends ILuApiItem> extends ALuCoreSelectApiDirective<T> implements CoreSelectApiTotalCountProvider {
	apiV4 = model.required<string>();
	sort = input<string | null>('+name');
	filters = input<Record<string, string | number | boolean>>({});
	searchDelimiter = input<string>(' ');

	protected httpClient = inject(HttpClient);

	protected clue = toSignal(this.clue$);

	protected override params$: Observable<Record<string, string | number | boolean>> = toObservable(
		computed(() => {
			const sort = this.sort();
			const clue = this.clue();
			const searchDelimiter = this.searchDelimiter();
			return {
				...this.filters(),
				...(sort ? { sort } : {}),
				...(clue ? { search: sanitizeClueFilter(clue, searchDelimiter) } : {}),
			};
		}),
	);

	public totalCount$ = toObservable(computed(() => ({ url: this.apiV4(), filters: this.filters() }))).pipe(
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

	protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<T[]> {
		return this.httpClient
			.get<T[] | { items: T[] }>(this.apiV4(), {
				params: {
					...params,
					page: page + 1,
					limit: this.pageSize,
				},
			})
			.pipe(map((res) => (Array.isArray(res) ? res : res?.items) ?? []));
	}

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
	protected override optionKey = (option: T) => option.id;
}
