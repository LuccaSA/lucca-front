import { HttpClient } from '@angular/common/http';
import { Directive, inject, Input } from '@angular/core';
import { ILuApiItem } from '@lucca-front/ng/api';
import { BehaviorSubject, combineLatest, map, Observable, ReplaySubject, switchMap, take } from 'rxjs';
import { ALuCoreSelectApiDirective } from './api.directive';

@Directive({
	// The attribute is already prefixed with "lu-simple-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[apiV4],lu-multi-select[apiV4]',
	standalone: true,
})
export class LuCoreSelectApiV4Directive<T extends ILuApiItem> extends ALuCoreSelectApiDirective<T> {
	@Input()
	public set apiV4(value: string) {
		this.url$.next(value);
	}

	@Input()
	public set sort(value: string | null) {
		this.sort$.next(value);
	}

	@Input()
	public set filters(value: Record<string, string | number | boolean>) {
		this.filters$.next(value);
	}

	protected url$ = new ReplaySubject<string>(1);
	protected sort$ = new BehaviorSubject<string | null>('+name');
	protected filters$ = new BehaviorSubject<Record<string, string | number | boolean>>({});

	protected httpClient = inject(HttpClient);

	protected override params$ = combineLatest([this.filters$, this.sort$, this.clue$]).pipe(
		map(([filters, sort, clue]) => ({
			...filters,
			...(sort ? { sort } : {}),
			...(clue ? { search: clue } : {}),
		})),
	);

	protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<T[]> {
		return this.url$.pipe(
			take(1),
			switchMap((url) =>
				this.httpClient.get<T[] | { items: T[] }>(url, {
					params: {
						...params,
						page: page + 1,
						limit: this.pageSize,
					},
				}),
			),
			map((res) => (Array.isArray(res) ? res : res?.items) ?? []),
		);
	}

	protected override optionComparer = (a: T, b: T) => a.id === b.id;
}
