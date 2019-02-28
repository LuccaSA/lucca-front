import { HttpClient } from '@angular/common/http';

import { Observable, Subject, combineLatest, merge, of } from 'rxjs';

import {
	mapTo,
	tap,
	withLatestFrom,
	share,
	switchMap,
	distinctUntilChanged,
	catchError,
} from 'rxjs/operators';

import { IApiItem } from '../../api.model';
import { ALuApiFeederService, ILuApiFeederService, ILuApiOptionFeeder } from '../feeder/index';
import { ILuApiPagerService } from '../pager/index';

export interface ILuApiOptionSearcher<T extends IApiItem = IApiItem> extends ILuApiOptionFeeder<T> {}
export interface ILuApiSearcherService<T extends IApiItem = IApiItem> extends ILuApiFeederService<T> {
	searchAll(clue: string): Observable<T[]>;
}

export abstract class ALuApiOptionSearcher<T extends IApiItem = IApiItem, S extends ILuApiSearcherService<T> = ILuApiSearcherService<T>>
implements ILuApiOptionFeeder<T> {
	outOptions$ = new Subject<T[]>();
	loading$: Observable<boolean>;

	protected _clue$: Observable<string>;

	set clue$(clue$: Observable<string>) {
		this.initObservables(clue$);
	}
	constructor(protected _service: S) {}
	onOpen() {
		this.resetClue();
	}
	protected initObservables(clue$) {
		this._clue$ = clue$.pipe(share());
		const results$ = this._clue$
		.pipe(
			switchMap(clue => this._service.searchAll(clue)),
			catchError(err => of([])),
			share(),
		);

		results$.subscribe(items => this.outOptions$.next(items));
		this.loading$ = merge(
			this._clue$.pipe(mapTo(true)),
			results$.pipe(mapTo(false)),
		);
	}
	abstract resetClue();
}

export abstract class ALuApiSearcherService<T extends IApiItem = IApiItem>
extends ALuApiFeederService<T>
implements ILuApiSearcherService<T> {
	protected _searchProperty = 'name';
	set searchProperty(sp: string) { this._searchProperty = sp; }
	constructor(protected http: HttpClient) { super(http); }
	searchAll(clue = '') {
		if (!clue) {
			return this.getAll();
		}
		const url = `${this.url}&${this._clueFilter(clue)}`;
		return this._get(url);
	}
	protected _clueFilter(clue) {
		const urlSafeClue = encodeURIComponent(clue);
		return `${this._searchProperty}=like,${urlSafeClue}`;
	}
}
// paged
const MAGIC_PAGE_SIZE = 20;
export interface ILuApiOptionPagedSearcher<T extends IApiItem = IApiItem> extends ILuApiOptionSearcher<T> {}
export interface ILuApiPagedSearcherService<T extends IApiItem = IApiItem> extends ILuApiSearcherService<T>, ILuApiPagerService<T> {
	searchPaged(clue: string, page: number): Observable<T[]>;
}
export abstract class ALuApiPagedSearcherService<T extends IApiItem = IApiItem>
extends ALuApiSearcherService<T>
implements ILuApiPagedSearcherService<T> {
	constructor(protected http: HttpClient) { super(http); }
	getPaged(page = 0) {
		const paging = `paging=${page * MAGIC_PAGE_SIZE},${MAGIC_PAGE_SIZE}`;
		const url = `${this.url}&${paging}`;
		return this._get(url);
	}
	searchPaged(clue = '', page = 0) {
		if (!clue) {
			return this.getPaged(page);
		}
		const paging = `paging=${page * MAGIC_PAGE_SIZE},${MAGIC_PAGE_SIZE}`;
		const url = `${this.url}&${this._clueFilter(clue)}&${paging}`;
		return this._get(url);
	}

}
export abstract class ALuApiOptionPagedSearcher<T extends IApiItem = IApiItem, S extends ILuApiPagedSearcherService<T> = ILuApiPagedSearcherService<T>>
extends ALuApiOptionSearcher<T, S>
implements ILuApiOptionPagedSearcher<T> {
	outOptions$ = new Subject<T[]>();
	loading$: Observable<boolean>;
	protected _loading = false;
	protected _page$ = new Subject<number>();
	protected _page: number;
	protected _options: T[] = [];

	constructor(service: S) {
		super(service);
	}
	onOpen() {
		this.resetClue();
		this.resetPage();
	}
	onScrollBottom() {
		if (!this._loading) {
			this._page$.next(this._page + 1);
		}
	}
	protected initObservables(clue$) {
		const distinctPage$ = this._page$.pipe(distinctUntilChanged(), tap(p => this._page = p));

		this._clue$ = clue$.pipe(
			tap(() => this._page$.next(0)),
			distinctUntilChanged(),
			share()
		);
		const results$ = combineLatest(
			distinctPage$,
			this._clue$,
		).pipe(
			switchMap(([page, clue]) => this._service.searchPaged(clue, page)),
			catchError(err => of([])),
			share(),
		);

		results$
		.pipe(withLatestFrom(distinctPage$))
		.subscribe(([items, page]) => {
			if (page === 0) {
				this._options = [...items];
			} else {
				this._options.push(...items);
			}
			this.outOptions$.next([...this._options]);
		});
		this.loading$ = merge(
			this._clue$.pipe(mapTo(true)),
			results$.pipe(mapTo(false)),
		);
		this.loading$.subscribe(l => this._loading = l);
	}
	abstract resetClue();
	resetPage() {
		this._page$.next(0);
	}
}
