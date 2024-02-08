/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, Self, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ALuOnCloseSubscriber, ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ILuOnCloseSubscriber, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator, LuOptionPlaceholderComponent } from '@lucca-front/ng/option';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, scan, share, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ILuEstablishment } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';
import { DEFAULT_ESTABLISHMENT_SERVICE } from '../establishment-select.token';

@Component({
	selector: 'lu-establishment-searcher',
	templateUrl: 'establishment-searcher.component.html',
	styleUrls: ['establishment-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderComponent],
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
			provide: DEFAULT_ESTABLISHMENT_SERVICE,
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

	clueControl = new FormControl<string>('');

	loading = false;

	private _nextPage$ = new Subject<void>();
	private _page$: Observable<number> = this._nextPage$.pipe(
		scan((acc) => acc + 1, 0),
		startWith(0),
	);
	private _resetOutOptions = new Subject<void>();

	outOptions$ = this._resetOutOptions.pipe(
		startWith(undefined),
		switchMap(() =>
			this.clueControl.valueChanges.pipe(
				debounceTime(100),
				switchMap((clue) =>
					this._page$.pipe(
						tap(() => (this.loading = true)),
						tap(() => {
							// FIXME refactor, add some spec anywhere
							const isSearching = clue != null && clue !== '';
							if (this._isSearching !== isSearching) {
								this._isSearching = isSearching;
								this.isSearching.emit(this._isSearching);
							}
						}),
						switchMap((page) => this._service.searchPaged(clue, page).pipe(catchError(() => of([] as ILuEstablishment[])))),
						takeWhile((loadedItems) => !!loadedItems.length),
						scan((acc, next) => [...acc, ...next]),
					),
				),
				tap(() => (this.loading = false)),
			),
		),
		share(),
	);

	displayPlaceholder$ = this.outOptions$.pipe(map((o) => o?.length === 0 && this._isSearching));

	constructor(
		@Inject(ALuEstablishmentService)
		@Optional()
		customService: LuEstablishmentService,
		@Inject(DEFAULT_ESTABLISHMENT_SERVICE)
		@Self()
		defaultService: LuEstablishmentService,
	) {
		this._service = customService || defaultService;
	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		this.reset();
	}

	onScrollBottom() {
		if (!this.loading) {
			this._nextPage$.next();
		}
	}

	onClose() {
		this._resetOutOptions.next();
	}

	reset() {
		this.clueControl.reset();
	}
}
