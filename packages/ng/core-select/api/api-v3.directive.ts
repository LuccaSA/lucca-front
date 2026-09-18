import { HttpClient } from '@angular/common/http';
import { Directive, forwardRef, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ILuApiCollectionResponse, ILuApiItem } from '@lucca-front/ng/api';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '@lucca-front/ng/core-select';
import { combineLatest, debounceTime, map, Observable, switchMap, take } from 'rxjs';
import { ALuCoreSelectApiDirective } from './api.directive';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[apiV3],lu-multi-select[apiV3]',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectApiV3Directive),
		},
	],
})
export class LuCoreSelectApiV3Directive<T extends ILuApiItem> extends ALuCoreSelectApiDirective<T> implements CoreSelectApiTotalCountProvider {
	protected httpClient = inject(HttpClient);

	readonly apiV3 = input.required<string>();

	readonly fields = input('id,name');

	readonly orderBy = input<string | null>('name,asc');

	readonly filters = input<Record<string, string | number | boolean>>({});

	protected readonly url$ = toObservable(this.apiV3);
	protected readonly fields$ = toObservable(this.fields);
	protected readonly orderBy$ = toObservable(this.orderBy);
	protected readonly filters$ = toObservable(this.filters);

	protected override params$ = combineLatest([this.fields$, this.filters$, this.orderBy$, this.clue$]).pipe(
		map(([fields, filters, orderBy, clue]) => ({
			...filters,
			...(fields ? { fields } : {}),
			...(orderBy ? { orderBy } : {}),
			...(clue ? { name: `like,${clue}` } : {}),
		})),
	);

	public totalCount$ = combineLatest([this.url$, this.filters$]).pipe(
		debounceTime(250),
		switchMap(([url, params]) =>
			this.httpClient.get<{ data: { count: number } }>(url, {
				params: {
					...params,
					fields: 'collection.count',
				},
			}),
		),
		map((res) => res.data?.count ?? 0),
	);

	protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<T[]> {
		return this.url$.pipe(
			take(1),
			switchMap((url) =>
				this.httpClient.get<ILuApiCollectionResponse<T>>(url, {
					params: {
						...params,
						paging: `${page * this.pageSize},${this.pageSize}`,
					},
				}),
			),
			map((res) => res.data.items),
		);
	}

	protected override optionKey = (option: T) => option.id;
}
