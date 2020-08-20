import { Observable, Subject, combineLatest, merge, of } from 'rxjs';
import {
	mapTo,
	tap,
	withLatestFrom,
	share,
	switchMap,
	distinctUntilChanged,
	catchError,
	map,
	debounceTime,
} from 'rxjs/operators';

import { ILuApiItem } from '../../api.model';
import { ILuApiOptionFeeder } from '../feeder/index';
import { ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ILuApiService } from '../../service/index';

export interface ILuApiOptionSearcher<T extends ILuApiItem = ILuApiItem> extends ILuApiOptionFeeder<T> {}

export abstract class ALuApiOptionSearcher<T extends ILuApiItem = ILuApiItem, S extends ILuApiService<T> = ILuApiService<T>>
implements ILuApiOptionFeeder<T>, ILuOnOpenSubscriber {
	outOptions$ = new Subject<T[]>();
	loading$: Observable<boolean>;
	empty$: Observable<boolean>;

	protected _clue$: Observable<string>;

	set clue$(clue$: Observable<string>) {
		// this.initObservables(clue$);
		this._clue$ = clue$;
	}
	constructor(protected _service: S) {}
	init() {
		this.initObservables();
	}
	onOpen() {
		this.resetClue();
	}
	protected initObservables() {
		// this._clue$ = clue$.pipe(share());
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
		this.empty$ = results$.pipe(
			map(o => o.length === 0),
		);
	}
	abstract resetClue();
}

export interface ILuApiOptionPagedSearcher<T extends ILuApiItem = ILuApiItem> extends ILuApiOptionSearcher<T> {}

export abstract class ALuApiOptionPagedSearcher<T extends ILuApiItem = ILuApiItem, S extends ILuApiService<T> = ILuApiService<T>>
extends ALuApiOptionSearcher<T, S>
implements ILuApiOptionPagedSearcher<T>, ILuOnScrollBottomSubscriber {
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

	protected initObservables() {
		const distinctPage$ = this._page$.pipe(
			distinctUntilChanged(),
			tap(p => this._page = p),
		);

		// this._clue$ = clue$.pipe(
		// 	tap(() => this._page$.next(0)),
		// 	// distinctUntilChanged(),
		// 	share()
		// );
		const results$ = combineLatest(
			distinctPage$,
			this._clue$,
		).pipe(
			debounceTime(100),
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
		this.empty$ = this.outOptions$.pipe(
			map(o => o.length === 0),
		);
	}
	abstract resetClue();
	resetPage() {
		this._page$.next(0);
	}
}
