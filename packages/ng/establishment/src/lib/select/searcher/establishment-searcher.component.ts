/* eslint-disable max-len */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnDestroy, OnInit, Optional, Output, Self, SkipSelf, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ALuOnCloseSubscriber, ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ILuOnCloseSubscriber, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { combineLatest, merge, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mapTo, share, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ILuEstablishment } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';

@Component({
	selector: 'lu-establishment-searcher',
	templateUrl: 'establishment-searcher.component.html',
	styleUrls: ['establishment-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuEstablishmentSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuEstablishmentSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnCloseSubscriber,
			useExisting: forwardRef(() => LuEstablishmentSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuEstablishmentSearcherComponent),
			multi: true,
		},
		{
			provide: ALuEstablishmentService,
			useClass: LuEstablishmentService,
		},
	],
})
export class LuEstablishmentSearcherComponent implements OnInit, OnDestroy, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber, ILuOnCloseSubscriber, ILuOptionOperator<ILuEstablishment> {
	@Input() set filters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input() set appInstanceId(appId: number) {
		this._service.appInstanceId = appId;
	}
	@Input() set operations(ops: number[]) {
		this._service.operations = ops;
	}
	@Input() set sort(sort: string) {
		this._service.sort = sort;
	}

	private _service: LuEstablishmentService;
	private _subs = new Subscription();

	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef, static: true })
	searchInput: ElementRef<HTMLElement>;

	@Output()
	isSearching = new EventEmitter<boolean>();
	private _isSearching = false;

	form: FormGroup;
	outOptions$ = new Subject<ILuEstablishment[]>();
	loading$: Observable<boolean>;
	empty$: Observable<boolean>;
	private _loading = false;
	private _page$ = new Subject<number>();
	private _page: number;
	private _options: ILuEstablishment[] = [];

	constructor(
		@Inject(ALuEstablishmentService)
		@Optional()
		@SkipSelf()
		hostService: LuEstablishmentService,
		@Inject(ALuEstablishmentService)
		@Self()
		selfService: LuEstablishmentService,
	) {
		this._service = hostService || selfService;
	}

	ngOnInit() {
		this.form = new FormGroup({
			clue: new FormControl(''),
		});
		const formValue$ = this.form.valueChanges.pipe(startWith(this.form.value)) as Observable<{ clue: string }>;
		this._page$ = new Subject<number>();
		const distinctPage$ = this._page$.pipe(distinctUntilChanged());

		const pageSub = this._page$.subscribe((p) => (this._page = p));
		this._subs.add(pageSub);

		const results$ = combineLatest([distinctPage$, formValue$]).pipe(
			debounceTime(100),
			tap(([_, val]) => {
				const isSearching = val?.clue != null && val?.clue !== '';
				if (this._isSearching !== isSearching) {
					this._isSearching = isSearching;
					this.isSearching.emit(this._isSearching);
				}
			}),
			switchMap(([page, val]) => {
				const filters: string[] = [];
				return this._service.searchPaged(val.clue, page, filters);
			}),
			catchError(() => of([] as ILuEstablishment[])),
			share(),
		);

		const resultsSub = results$.pipe(withLatestFrom(distinctPage$)).subscribe(([items, page]) => {
			if (page === 0) {
				this._options = [...items];
			} else {
				this._options.push(...items);
			}
			this.outOptions$.next([...this._options]);
		});
		this._subs.add(resultsSub);

		this.loading$ = merge(formValue$.pipe(mapTo(true)), results$.pipe(mapTo(false)));
		const loadingSub = this.loading$.subscribe((l) => (this._loading = l));
		this._subs.add(loadingSub);

		this.empty$ = this.outOptions$.pipe(map((o) => o.length === 0));
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		this.reset();
	}

	onScrollBottom() {
		if (!this._loading) {
			this._page$.next(this._page + 1);
		}
	}

	onClose() {
		this.outOptions$.next([]);
	}

	reset() {
		this.form.reset();
		this._page$.next(0);
	}
}
