/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, Self, SkipSelf, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ALuOnCloseSubscriber, ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ILuOnCloseSubscriber, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator, LuOptionModule } from '@lucca-front/ng/option';
import { BehaviorSubject, combineLatest, merge, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, scan, share, switchMap, tap } from 'rxjs/operators';
import { ILuEstablishment } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';

@Component({
	selector: 'lu-establishment-searcher',
	templateUrl: 'establishment-searcher.component.html',
	styleUrls: ['establishment-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, LuOptionModule],
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
export class LuEstablishmentSearcherComponent implements ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber, ILuOnCloseSubscriber, ILuOptionOperator<ILuEstablishment> {
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

	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef, static: true })
	searchInput: ElementRef<HTMLElement>;

	@Output()
	isSearching = new EventEmitter<boolean>();
	private _isSearching = false;

	form: FormGroup<{ clue: FormControl<string> }> = new FormGroup({
		clue: new FormControl<string>(''),
	});

	loading = false;

	private _page$ = new BehaviorSubject<number>(0);
	private _resetOutOptions = new Subject<null>();

	outOptions$ = merge(
		combineLatest([this._page$.pipe(distinctUntilChanged()), this.form.valueChanges]).pipe(
			debounceTime(100),
			tap(() => (this.loading = true)),
			tap(([_, val]) => {
				// FIXME refactor, add some spec anywhere
				const isSearching = val?.clue != null && val?.clue !== '';
				if (this._isSearching !== isSearching) {
					this._isSearching = isSearching;
					this.isSearching.emit(this._isSearching);
				}
			}),
			switchMap(([page, val]) => this._service.searchPaged(val.clue, page).pipe(catchError(() => of([] as ILuEstablishment[])))),
			scan((acc, next) => (this._page$.value === 0 ? next : [...acc, ...next])),
			tap(() => (this.loading = false)),
			share(),
		),
		this._resetOutOptions.pipe(map(() => [] as ILuEstablishment[])),
	);

	displayPlaceholder$ = this.outOptions$.pipe(map((o) => o?.length === 0 && this._isSearching));

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

	onOpen() {
		this.searchInput.nativeElement.focus();
		this.reset();
	}

	onScrollBottom() {
		if (!this.loading) {
			this._page$.next(this._page$.value + 1);
		}
	}

	onClose() {
		this._resetOutOptions.next(null);
	}

	reset() {
		this.form.reset();
		this._page$.next(0);
	}
}
