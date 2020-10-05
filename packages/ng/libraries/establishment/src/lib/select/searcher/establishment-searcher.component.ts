import { ChangeDetectionStrategy, Component, forwardRef, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding, OnInit, OnDestroy, Input } from '@angular/core';
import {
	ALuOnOpenSubscriber,
	ALuOnScrollBottomSubscriber,
	ALuOnCloseSubscriber,
	ILuOnOpenSubscriber,
	ILuOnScrollBottomSubscriber,
	ILuOnCloseSubscriber,
} from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime, switchMap, catchError, share, startWith, withLatestFrom, mapTo, map } from 'rxjs/operators';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';
import { Subject, Observable, Subscription, combineLatest, of, merge } from 'rxjs';
import { ILuEstablishment } from '../../establishment.model';

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
export class LuEstablishmentSearcherComponent
	implements OnInit, OnDestroy, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber, ILuOnCloseSubscriber, ILuOptionOperator<ILuEstablishment>
{
	@Input() set filters(filters: string[]) { this._service.filters = filters; }

	private _service: LuEstablishmentService;
	private _subs = new Subscription();

	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;

	form: FormGroup;
	outOptions$ = new Subject<ILuEstablishment[]>();
	loading$: Observable<boolean>;
	empty$: Observable<boolean>;
	private _loading = false;
	private _page$ = new Subject<number>();
	private _page: number;
	private _options: ILuEstablishment[] = [];

	constructor(
		@Inject(ALuEstablishmentService) @Optional() @SkipSelf() hostService: ALuEstablishmentService,
		@Inject(ALuEstablishmentService) @Self() selfService: LuEstablishmentService,

	) {
		this._service = (hostService || selfService) as LuEstablishmentService;
	}

	ngOnInit() {
		this.form = new FormGroup({
			clue: new FormControl(''),
		});
		const formValue$ = this.form.valueChanges.pipe(
			startWith(this.form.value),
		);
		this._page$ = new Subject<number>();
		const distinctPage$ = this._page$.pipe(
			distinctUntilChanged(),
		);

		const pageSub = this._page$.subscribe(p => this._page = p);
		this._subs.add(pageSub);

		const results$ = combineLatest(
			distinctPage$,
			formValue$
		).pipe(
			debounceTime(100),
			switchMap(([page, val]) => {
				const filters = [];
				return this._service.searchPaged(val.clue, page, filters);
			}),
			catchError(err => of([])),
			share(),
		);

		const resultsSub = results$
		.pipe(withLatestFrom(distinctPage$))
		.subscribe(([items, page]) => {
			if (page === 0) {
				this._options = [...items];
			} else {
				this._options.push(...items);
			}
			this.outOptions$.next([...this._options]);
		});
		this._subs.add(resultsSub);

		this.loading$ = merge(
			formValue$.pipe(mapTo(true)),
			results$.pipe(mapTo(false)),
		);
		const loadingSub = this.loading$.subscribe(l => this._loading = l);
		this._subs.add(loadingSub);

		this.empty$ = this.outOptions$.pipe(
			map(o => o.length === 0),
		);
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
