import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Inject, input, Optional, output, Self, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	ALuOnCloseSubscriber,
	ALuOnOpenSubscriber,
	ALuOnScrollBottomSubscriber,
	ILuOnCloseSubscriber,
	ILuOnOpenSubscriber,
	ILuOnScrollBottomSubscriber,
	isNotNilOrEmptyString,
	syncInputSignal,
} from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator, LuOptionPlaceholderComponent } from '@lucca-front/ng/option';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, scan, share, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ILuEstablishment } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';
import { DEFAULT_ESTABLISHMENT_SERVICE } from '../establishment-select.token';

@Component({
	selector: 'lu-establishment-searcher',
	templateUrl: 'establishment-searcher.component.html',
	styleUrl: 'establishment-searcher.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'position-fixed',
	},
	imports: [AsyncPipe, ReactiveFormsModule, LuOptionPlaceholderComponent],
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
	readonly filters = input<string[]>();

	readonly appInstanceId = input<number>();

	readonly operations = input<number[]>();

	readonly sort = input<string>();

	private _service: LuEstablishmentService;

	readonly searchInput = viewChild<ElementRef<HTMLElement>>('searchInput');

	readonly isSearching = output<boolean>();

	private _isSearching = false;

	clueControl = new FormControl<string>('');

	loading = false;

	private readonly _nextPage$ = new Subject<void>();
	private readonly _page$: Observable<number> = this._nextPage$.pipe(
		scan((acc) => acc + 1, 0),
		startWith(0),
	);
	private _resetOutOptions = new Subject<void>();

	readonly outOptions$ = this._resetOutOptions.pipe(
		startWith(undefined),
		switchMap(() =>
			this.clueControl.valueChanges.pipe(
				debounceTime(100),
				switchMap((clue) =>
					this._page$.pipe(
						tap(() => (this.loading = true)),
						tap(() => {
							// FIXME refactor, add some spec anywhere
							const isSearching = isNotNilOrEmptyString(clue);
							if (this._isSearching !== isSearching) {
								this._isSearching = isSearching;
								this.isSearching.emit(this._isSearching);
							}
						}),
						switchMap((page) => this._service.searchPaged(clue ?? '', page).pipe(catchError(() => of([] as ILuEstablishment[])))),
						takeWhile((loadedItems) => !!loadedItems.length),
						scan((acc, next) => [...acc, ...next]),
					),
				),
				tap(() => (this.loading = false)),
			),
		),
		share(),
	);

	readonly displayPlaceholder$ = this.outOptions$.pipe(map((o) => o?.length === 0 && this._isSearching));

	constructor(
		@Inject(ALuEstablishmentService)
		@Optional()
		customService: LuEstablishmentService,
		@Inject(DEFAULT_ESTABLISHMENT_SERVICE)
		@Self()
		defaultService: LuEstablishmentService,
	) {
		this._service = customService || defaultService;

		syncInputSignal(this.filters, (filters) => (this._service.filters = filters));
		syncInputSignal(this.appInstanceId, (appInstanceId) => (this._service.appInstanceId = appInstanceId));
		syncInputSignal(this.operations, (operations) => (this._service.operations = operations));
		syncInputSignal(this.sort, (sort) => (this._service.sort = sort));
	}

	onOpen() {
		this.searchInput()?.nativeElement.focus();
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
