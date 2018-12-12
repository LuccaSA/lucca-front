import { ILuOptionOperator } from '../../../option/index';
import { IApiItem } from '../../api.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, merge } from 'rxjs';
import { switchMap, catchError, mapTo } from 'rxjs/operators';
import { ALuApiFeederService } from '../feeder/index';

const MAGIC_PAGE_SIZE = 20;
export interface ILuApiOptionPager<T extends IApiItem = IApiItem> extends ILuOptionOperator<T> {}
export interface ILuApiPagerService<T extends IApiItem = IApiItem> {
	getPaged(page: number): Observable<T[]>;
}

export abstract class ALuApiOptionPager<T extends IApiItem = IApiItem, S extends ILuApiPagerService<T> = ILuApiPagerService<T>>
implements ILuApiOptionPager<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	loading$: Observable<boolean>;

	protected _loading = false;
	protected _results$: Observable<T[]>;
	protected _page$ = new BehaviorSubject<number>(undefined);
	constructor(protected _service: S) {
		this.initObservables();
	}
	onOpen() {
		this._page$.next(0);
	}
	onClose() {
		this._page$.next(undefined);
	}
	onScrollBottom() {
		if (!this._loading) {
			this._page$.next(this._page$.value + 1);
		}
	}
	protected initObservables() {
		this._results$ = this._page$
		.pipe(
			switchMap(page => {
				if (page === undefined) {
					return of([]);
				}
				return this._service.getPaged(page);
			})),
			catchError(err => of([])
		);

		this._results$.subscribe(items => {
			if (this._page$.value === 0) {
				this.outOptions$.next([...items]);
			} else {
				this.outOptions$.next([...this.outOptions$.value, ...items]);
			}
		});
		this.loading$ = merge(
			this._page$.pipe(mapTo(true)),
			this._results$.pipe(mapTo(false)),
		);
		this.loading$.subscribe(l => this._loading = l);
	}
}

export abstract class ALuApiPagerService<T extends IApiItem = IApiItem> extends ALuApiFeederService<T> implements ILuApiPagerService<T> {
	constructor(protected http: HttpClient) { super(http); }
	getPaged(page = 0) {
		const paging = `paging=${page * MAGIC_PAGE_SIZE},${MAGIC_PAGE_SIZE}`;
		const url = `${this.url}&${paging}`;
		return this._get(url);
	}
}
