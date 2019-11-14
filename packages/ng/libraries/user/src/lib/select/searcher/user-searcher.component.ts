import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, OnInit, OnDestroy, } from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber, ILuService } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, switchMap, catchError, distinctUntilChanged, tap, withLatestFrom, mapTo, mergeAll } from 'rxjs/operators';
import {  LuUserService } from './user-searcher.service';
import { ALuUserService } from './user-searcher.model';
import { ILuUser } from '../../user.model';
import { Observable, Subject, combineLatest, Subscriber, Subscription, of, merge } from 'rxjs';
// import { ALuApiOptionPagedSearcher } from '../../../api/index';
const MAGIC_PAGE_SIZE = 20;

@Component({
	selector: 'lu-user-paged-searcher',
	templateUrl: 'user-searcher.component.html',
	styleUrls: ['user-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuUserPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuUserPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuUserPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuUserService,
			useClass:  LuUserService,
		},
	],
})
export class LuUserPagedSearcherComponent<U extends ILuUser = ILuUser> implements ILuOptionOperator<U>, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber, OnInit, OnDestroy {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() fields: string = 'id,firstname,lastname';
	@Input() filters: { [key: string]: string | string[] } = {};
	@Input() orderBy: string = 'lastname,asc,firstname,asc';

	private _service: ILuService<U>;
	private _page$ = new Subject<number>();
	private _page: number;
	private _loading = false;
	private subs = new Subscription();
	private _options: U[] = [];
	private _clue$: Observable<string>;

	clueControl: FormControl;
	loading$: Observable<boolean>;
	outOptions$ = new Subject<U[]>();
	constructor(
		@Inject(ALuUserService) @Optional() @SkipSelf() hostService: ALuUserService<U>,
		@Inject(ALuUserService) @Self() selfService: ALuUserService<U>,
	) {
		this._service = hostService || selfService;
		this.clueControl = new FormControl(undefined);

	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		this.resetClue();
		this.resetPage();
	}
	onScrollBottom() {
		if (!this._loading) {
			this._page$.next(this._page + 1);
		}
	}
	resetClue() {
		this.clueControl.setValue('');
	}
	resetPage() {
		this._page$.next(0);
	}
	ngOnInit() {
		this.initObservables();
	}
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
	initObservables() {
		const distinctPage$ = this._page$.pipe(distinctUntilChanged(), tap(p => this._page = p));
		this._clue$ = this.clueControl.valueChanges
		.pipe(
			startWith(''),
			tap(() => this._page$.next(0)),
		);
		const results$ = combineLatest([
			this._clue$,
			this._page$,
		]).pipe(
			debounceTime(250),
			switchMap(([clue, page]) => this._service.get({ ...this.filters, orderBy: this.orderBy, clue: clue || undefined, paging: `${page * MAGIC_PAGE_SIZE},${ (page + 1) * MAGIC_PAGE_SIZE}` })),
			catchError(err => of([] as U[])),
		);

		this.subs.add(
			results$.pipe(
				withLatestFrom(distinctPage$),
			).subscribe(([items, page]) => {
				if (page === 0) {
					this._options = [...items];
				} else {
					this._options.push(...items);
				}
				this.outOptions$.next([...this._options]);
			}),
		);
		this.loading$ = merge([
			this._clue$.pipe(mapTo(true)),
			results$.pipe(mapTo(false)),
		]).pipe(mergeAll());
		this.loading$.subscribe(l => this._loading = l);
	}
}

