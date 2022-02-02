import {
	ILuOnOpenSubscriber,
	ILuOnScrollBottomSubscriber,
} from '@lucca-front/ng/core';
import { ILuOptionOperator } from '@lucca-front/ng/option';
import { merge, Observable, of, Subject } from 'rxjs';
import {
	catchError,
	distinctUntilChanged,
	map,
	mapTo,
	switchMap,
	tap,
} from 'rxjs/operators';
import { ILuApiItem } from '../../api.model';
import { ILuApiService } from '../../service/index';

enum Strategy {
	append,
	replace,
}
export type ILuApiOptionPager<T extends ILuApiItem = ILuApiItem> =
	ILuOptionOperator<T>;
export interface ILuApiPagerService<T extends ILuApiItem = ILuApiItem> {
	getPaged(page: number): Observable<T[]>;
}

export abstract class ALuApiOptionPager<
	T extends ILuApiItem = ILuApiItem,
	S extends ILuApiService<T> = ILuApiService<T>,
> implements
		ILuApiOptionPager<T>,
		ILuOnOpenSubscriber,
		ILuOnScrollBottomSubscriber
{
	outOptions$ = new Subject<T[]>();
	loading$: Observable<boolean>;

	protected _loading = false;
	protected _results$: Observable<{ items: T[]; strategy: Strategy }>;
	protected _options: T[] = [];
	protected _page$ = new Subject<number>();
	protected _page: number;
	protected _initialized = false;
	constructor(protected _service: S) {}
	protected init() {
		this.initObservables();
	}
	onOpen() {
		if (!this._initialized) {
			this._page$.next(0);
			this._initialized = true;
		}
	}
	// onClose() {
	// 	this._page$.next(0);
	// }
	onScrollBottom() {
		if (!this._loading) {
			this._page$.next(this._page + 1);
		}
	}
	protected initObservables() {
		const _results$: Observable<{ items: T[]; strategy: Strategy }> =
			this._page$.pipe(
				distinctUntilChanged(),
				tap((p) => (this._page = p)),
				switchMap((page) => {
					if (page === undefined) {
						return of({ items: [] as T[], strategy: Strategy.replace });
					}
					return this._service.getPaged(page).pipe(
						map((items) => ({
							items: items,
							strategy: page === 0 ? Strategy.replace : Strategy.append,
						})),
					);
				}),
				catchError(() => of({ items: [] as T[], strategy: Strategy.replace })),
				tap((results) => {
					if (results.strategy === Strategy.replace) {
						this._options = [...results.items];
					} else {
						this._options.push(...results.items);
					}
					this.outOptions$.next([...this._options]);
				}),
			);

		this.loading$ = merge(
			this._page$.pipe(mapTo(true)),
			_results$.pipe(mapTo(false)),
		);
		this.loading$.subscribe((l) => (this._loading = l));
	}
}
