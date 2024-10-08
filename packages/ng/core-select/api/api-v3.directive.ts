import { HttpClient } from '@angular/common/http';
import { Directive, forwardRef, inject, Input } from '@angular/core';
import { ILuApiCollectionResponse, ILuApiItem } from '@lucca-front/ng/api';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider } from '@lucca-front/ng/core-select';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, ReplaySubject, switchMap, take } from 'rxjs';
import { ALuCoreSelectApiDirective } from './api.directive';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[apiV3],lu-multi-select[apiV3]',
	standalone: true,
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectApiV3Directive),
		},
	],
})
export class LuCoreSelectApiV3Directive<T extends ILuApiItem> extends ALuCoreSelectApiDirective<T> implements CoreSelectApiTotalCountProvider {
	@Input()
	public set apiV3(value: string) {
		this.url$.next(value);
	}

	@Input()
	public set fields(value: string) {
		this.fields$.next(value);
	}

	@Input()
	public set orderBy(value: string | null) {
		this.orderBy$.next(value);
	}

	@Input()
	public set filters(value: Record<string, string | number | boolean>) {
		this.filters$.next(value);
	}

	protected url$ = new ReplaySubject<string>(1);
	protected fields$ = new BehaviorSubject<string>('id,name');
	protected orderBy$ = new BehaviorSubject<string | null>('name,asc');
	protected filters$ = new BehaviorSubject<Record<string, string | number | boolean>>({});

	protected httpClient = inject(HttpClient);

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

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
	protected override optionKey = (option: T) => option.id;
}
