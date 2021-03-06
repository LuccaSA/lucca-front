import { Observable, Subject, merge, of } from 'rxjs';
import {
	mapTo,
	share,
	switchMap,
	catchError,
	map,
	scan,
	startWith,
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
	onClose() {
		this.clearOptions();
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
	protected clearOptions() {
		this.outOptions$.next([]);
	}
}

export interface ILuApiOptionPagedSearcher<T extends ILuApiItem = ILuApiItem> extends ILuApiOptionSearcher<T> {}

export abstract class ALuApiOptionPagedSearcher<T extends ILuApiItem = ILuApiItem, S extends ILuApiService<T> = ILuApiService<T>>
extends ALuApiOptionSearcher<T, S>
implements ILuApiOptionPagedSearcher<T>, ILuOnScrollBottomSubscriber {
	outOptions$ = new Subject<T[]>();
	loading$: Observable<boolean>;
	protected _loading = false;
	protected _page$ = new Subject<void>();
	protected _isLastPage: boolean;
	protected _options: T[] = [];

	constructor(service: S) {
		super(service);
	}
	onOpen() {
		this.resetClue();
	}
	onScrollBottom() {
		if (!this._loading&& !this._isLastPage) {
			this._page$.next();
		}
	}

	protected initObservables() {
		const pager$ = this._page$.pipe(
			scan(acc => acc + 1, 0),
			startWith(0),
		);
		const query$ = this._clue$.pipe(
			switchMap(clue => pager$.pipe(map(page => [page, clue] as [number, string]))),
			share(),
		);

		const results$ = query$.pipe(
			switchMap(([page, clue]) => this._service.searchPaged(clue, page).pipe(
				catchError(() => of([])),
				map(items => [items, page] as [T[], number])
			)),
			share(),
		);

		results$
		.subscribe(([items, page]) => {
			if (page === 0) {
				this._options = [...items];
			} else {
				this._options.push(...items);
			}
			this._isLastPage = !items.length;
			this.outOptions$.next([...this._options]);
		});
		this.loading$ = merge(
			query$.pipe(mapTo(true)),
			results$.pipe(mapTo(false)),
		);
		this.loading$.subscribe(l => this._loading = l);
		this.empty$ = this.outOptions$.pipe(
			map(o => o.length === 0),
		);
	}
	abstract resetClue();
}
