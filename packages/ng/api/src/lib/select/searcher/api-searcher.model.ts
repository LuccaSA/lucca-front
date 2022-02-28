import { ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, map, mapTo, scan, share, startWith, switchMap } from 'rxjs/operators';
import { ILuApiService } from '../../service/index';
import { ILuApiOptionFeeder } from '../feeder/index';

export type ILuApiOptionSearcher<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem> = ILuApiOptionFeeder<T>;

export abstract class ALuApiOptionSearcher<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem, S extends ILuApiService<T> = ILuApiService<T>>
	implements ILuApiOptionFeeder<T>, ILuOnOpenSubscriber
{
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
		const results$ = this._clue$.pipe(
			switchMap((clue) => this._service.searchAll(clue)),
			catchError(() => of([])),
			share(),
		);

		results$.subscribe((items) => this.outOptions$.next(items));
		this.loading$ = merge(this._clue$.pipe(mapTo(true)), results$.pipe(mapTo(false)));
		this.empty$ = results$.pipe(map((o) => o.length === 0));
	}
	abstract resetClue();
	protected clearOptions() {
		this.outOptions$.next([]);
	}
}

export type ILuApiOptionPagedSearcher<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem> = ILuApiOptionSearcher<T>;

export abstract class ALuApiOptionPagedSearcher<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem, S extends ILuApiService<T> = ILuApiService<T>>
	extends ALuApiOptionSearcher<T, S>
	implements ILuApiOptionPagedSearcher<T>, ILuOnScrollBottomSubscriber
{
	override outOptions$ = new Subject<T[]>();
	override loading$: Observable<boolean>;
	protected _loading = false;
	protected _page$ = new Subject<void>();
	protected _isLastPage: boolean;
	protected _options: T[] = [];

	constructor(service: S) {
		super(service);
	}
	override onOpen() {
		this.resetClue();
	}
	onScrollBottom() {
		if (!this._loading && !this._isLastPage) {
			this._page$.next();
		}
	}

	protected override initObservables() {
		const pager$ = this._page$.pipe(
			scan((acc) => acc + 1, 0),
			startWith(0),
		);
		const query$ = this._clue$.pipe(
			switchMap((clue) => pager$.pipe(map<number, [number, string]>((page) => [page, clue]))),
			share(),
		);

		const results$ = query$.pipe(
			switchMap(([page, clue]) =>
				this._service.searchPaged(clue, page).pipe(
					catchError(() => of([])),
					map<T[], [T[], number]>((items) => [items, page]),
				),
			),
			share(),
		);

		results$.subscribe(([items, page]) => {
			if (page === 0) {
				this._options = [...items];
			} else {
				this._options.push(...items);
			}
			this._isLastPage = !items.length;
			this.outOptions$.next([...this._options]);
		});
		this.loading$ = merge(query$.pipe(mapTo(true)), results$.pipe(mapTo(false)));
		this.loading$.subscribe((l) => (this._loading = l));
		this.empty$ = this.outOptions$.pipe(map((o) => o.length === 0));
	}
	abstract override resetClue();
}
