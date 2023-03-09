import { HttpClient } from '@angular/common/http';
import { Directive, inject, Input } from '@angular/core';
import { ILuApiCollectionResponse, ILuApiItem } from '@lucca-front/ng/api';
import { BehaviorSubject, combineLatest, map, Observable, ReplaySubject, switchMap, take } from 'rxjs';
import { ALuSimpleSelectApiDirective } from './api.directive';

@Directive({
	selector: 'lu-simple-select[apiV3]',
	standalone: true,
})
export class LuSimpleSelectApiV3Directive<T extends ILuApiItem> extends ALuSimpleSelectApiDirective<T> {
	@Input()
	public set apiV3(value: string) {
		this.url$.next(value);
	}

	@Input()
	public set fields(value: string) {
		this.fields$.next(value);
	}

	@Input()
	public set orderBy(value: string) {
		this.orderBy$.next(value);
	}

	@Input()
	public set filters(value: Record<string, string | number | boolean>) {
		this.filters$.next(value);
	}

	protected url$ = new ReplaySubject<string>(1);
	protected fields$ = new BehaviorSubject<string>('id,name');
	protected orderBy$ = new BehaviorSubject<string>('name,asc');
	protected filters$ = new BehaviorSubject<Record<string, string | number | boolean>>({});

	protected httpClient = inject(HttpClient);

	protected override params$ = combineLatest([this.fields$, this.filters$, this.orderBy$, this.clue$]).pipe(
		map(([fields, filters, orderBy, clue]) => ({
			...filters,
			fields,
			orderBy,
			...(clue ? { name: `like,${encodeURIComponent(clue)}` } : {}),
		})),
	);

	protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<T[]> {
		return this.url$.pipe(
			take(1),
			switchMap((url) => this.httpClient.get<ILuApiCollectionResponse<T>>(url, { params: { ...params, paging: `${page * this.pageSize},${this.pageSize}` } })),
			map((res) => res.data.items),
		);
	}
}
