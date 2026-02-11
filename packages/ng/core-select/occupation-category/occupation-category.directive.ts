import { HttpClient } from '@angular/common/http';
import { Directive, OnInit, computed, forwardRef, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, applySearchDelimiter } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { Observable, debounceTime, map, switchMap } from 'rxjs';
import { LuCoreSelectOccupationCategory } from './models';

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[occupationCategories],lu-multi-select[occupationCategories]',
	standalone: true,
	exportAs: 'occupationCategories',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectOccupationCategoriesDirective),
		},
	],
})
export class LuCoreSelectOccupationCategoriesDirective<T extends LuCoreSelectOccupationCategory = LuCoreSelectOccupationCategory>
	extends ALuCoreSelectApiDirective<T>
	implements OnInit, CoreSelectApiTotalCountProvider
{
	protected httpClient = inject(HttpClient);

	url = input<string>('/organization/structure/api/occupation-categories');
	filters = input<Record<string, string | number | boolean> | null>(null);
	searchDelimiter = input<string>(' ');

	protected clue = toSignal(this.clue$);

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
			const filters = this.filters();
			const clue = this.clue();
			return {
				...filters,
				...(clue
					? {
							search: applySearchDelimiter(clue, this.searchDelimiter()),
							sort: 'name',
						}
					: { sort: 'name' }),
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

	protected override optionKey = (option: T) => option.id;
}
