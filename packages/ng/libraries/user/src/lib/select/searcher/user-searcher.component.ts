import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding, OnInit, OnDestroy } from '@angular/core';
import {
	ALuOnOpenSubscriber,
	ALuOnScrollBottomSubscriber,
	ALuOnCloseSubscriber,
	ILuOnOpenSubscriber,
	ILuOnScrollBottomSubscriber,
	ILuOnCloseSubscriber,
} from '@lucca-front/ng/core';
import { ALuOptionOperator } from '@lucca-front/ng/option';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime, switchMap, catchError, share, startWith, withLatestFrom, mapTo, map } from 'rxjs/operators';
import { ILuUser } from '../../user.model';
import { ALuApiOptionPagedSearcher } from '@lucca-front/ng/api';
import { ALuUserService, LuUserV3Service } from '../../service/index';
import { Subject, Observable, Subscription, combineLatest, of, merge } from 'rxjs';

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
			provide: ALuOnCloseSubscriber,
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
			useClass: LuUserV3Service,
		},
	],
})
export class LuUserPagedSearcherComponent<U extends ILuUser = ILuUser>
	implements OnInit, OnDestroy, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber, ILuOnCloseSubscriber
{

	private _service: LuUserV3Service<U>;
	private _subs = new Subscription();

	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set appInstanceId(appInstanceId: number | string) { this._service.appInstanceId = appInstanceId; }
	@Input() set operations(operations: number[]) { this._service.operations = operations; }

	form: FormGroup;
	// page$: Subject<number>;
	outOptions$ = new Subject<U[]>();
	loading$: Observable<boolean>;
	empty$: Observable<boolean>;
	private _loading = false;
	private _page$ = new Subject<number>();
	private _page: number;
	private _options: U[] = [];

	constructor(
		@Inject(ALuUserService) @Optional() @SkipSelf() hostService: ALuUserService,
		@Inject(ALuUserService) @Self() selfService: LuUserV3Service<U>,
	) {
		this._service = (hostService || selfService) as LuUserV3Service<U>;
	}

	ngOnInit() {
		this.form = new FormGroup({
			clue: new FormControl(''),
			formerEmployees: new FormControl(false),
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
				if (val.formerEmployees) {
					filters.push(`formerEmployees=true`);
				}
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
