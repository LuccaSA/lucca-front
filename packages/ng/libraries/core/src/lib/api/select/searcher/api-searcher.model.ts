import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/withLatestFrom';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/Observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { share, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { IApiItem } from '../../api.model';
import { ALuApiFeederService, ILuApiFeederService, ILuApiOptionFeeder } from '../feeder/index';
import { ILuApiPagerService } from '../pager';

export interface ILuApiOptionSearcher<T extends IApiItem = IApiItem> extends ILuApiOptionFeeder<T> {}
export interface ILuApiSearcherService<T extends IApiItem = IApiItem> extends ILuApiFeederService<T> {
	searchAll(clue: string): Observable<T[]>;
}

export abstract class ALuApiOptionSearcher<T extends IApiItem = IApiItem, S extends ILuApiSearcherService<T> = ILuApiSearcherService<T>>
implements ILuApiOptionFeeder<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	loading$: Observable<boolean>;

	protected _results$: Observable<T[]>;
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
		this._results$ = this._clue$.pipe(
			switchMap(clue => this._service.searchAll(clue).catch(err => of([]))),
			share(),
		);

		this._results$.subscribe(items => this.outOptions$.next(items));
		this.loading$ = merge(
			this._clue$.mapTo(true),
			this._results$.mapTo(false),
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
	outOptions$ = new BehaviorSubject<T[]>([]);
	loading$: Observable<boolean>;
	protected _loading = false;
	protected _page$ = new BehaviorSubject<number>(undefined);

	constructor(service: S) {
		super(service);
	}
	onOpen() {
		this.resetClue();
		this.resetPage();
	}
	onScrollBottom() {
		if (!this._loading) {
			this._page$.next(this._page$.value + 1);
		}
	}
	protected initObservables(clue$) {
		const distinctPage$ = this._page$.pipe(distinctUntilChanged());

		this._clue$ = clue$.pipe(
			tap(() => this._page$.next(0)),
			distinctUntilChanged(),
			share()
		);
		this._results$ = combineLatest(
			distinctPage$,
			this._clue$,
		).pipe(
			switchMap(([page, clue]) => this._service.searchPaged(clue, page).catch(err => of([]))),
			share(),
		);

		this._results$
		.withLatestFrom(distinctPage$)
		.subscribe(([items, page]) => {
			if (page === 0) {
				this.outOptions$.next([...items]);
			} else {
				this.outOptions$.next([...this.outOptions$.value, ...items]);
			}
		});
		this.loading$ = merge(
			this._clue$.mapTo(true),
			this._results$.mapTo(false),
		).do(l => this._loading = l);
	}
	abstract resetClue();
	resetPage() {
		this._page$.next(0);
	}
}
