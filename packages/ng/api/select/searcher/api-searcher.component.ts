import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Inject, input, OnInit, Optional, Self, SkipSelf, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ALuOnCloseSubscriber, ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, syncInputSignal } from '@lucca-front/ng/core';
import { ALuOptionOperator, LuOptionPlaceholderComponent } from '@lucca-front/ng/option';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ALuApiService, LuApiHybridService } from '../../service/index';
import { ALuApiOptionPagedSearcher, ALuApiOptionSearcher } from './api-searcher.model';

@Component({
	selector: 'lu-api-searcher',
	templateUrl: './api-searcher.component.html',
	styleUrl: './api-searcher.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, ReactiveFormsModule, LuOptionPlaceholderComponent],
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuApiSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuApiSearcherComponent),
			multi: true,
		},
		{
			provide: ALuApiService,
			useClass: LuApiHybridService,
		},
	],
})
export class LuApiSearcherComponent<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem> extends ALuApiOptionSearcher<T, LuApiHybridService<T>> implements OnInit {
	readonly searchInput = viewChild.required<ElementRef<HTMLElement>>('searchInput');

	readonly standard = input<'v3' | 'v4'>();

	readonly api = input<string>();

	readonly fields = input<string>();

	readonly filters = input<string[]>();

	readonly orderBy = input<string>();

	readonly sort = input<string>();

	readonly debounceTime = input<number>(250);

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiService)
		@Optional()
		@SkipSelf()
		hostService: LuApiHybridService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super(hostService || selfService);

		syncInputSignal(this.standard, (standard) => (this._service.standard = standard));
		syncInputSignal(this.api, (api) => (this._service.api = api));
		syncInputSignal(this.fields, (fields) => (this._service.fields = fields));
		syncInputSignal(this.filters, (filters) => (this._service.filters = filters));
		syncInputSignal(this.orderBy, (orderBy) => (this._service.orderBy = orderBy));
		syncInputSignal(this.sort, (sort) => (this._service.sort = sort));
	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges.pipe(debounceTime(this.debounceTime())) as Observable<string>;
		super.init();
	}

	override onOpen() {
		this.searchInput().nativeElement.focus();
		super.onOpen();
	}
	resetClue() {
		this.clueControl.setValue('');
	}
}

@Component({
	selector: 'lu-api-paged-searcher',
	templateUrl: './api-searcher.component.html',
	styleUrl: './api-searcher.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, ReactiveFormsModule, LuOptionPlaceholderComponent],
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuApiPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuApiPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuApiPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuOnCloseSubscriber,
			useExisting: forwardRef(() => LuApiPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuApiService,
			useClass: LuApiHybridService,
		},
	],
})
export class LuApiPagedSearcherComponent<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem>
	extends ALuApiOptionPagedSearcher<T, LuApiHybridService<T>>
	implements OnInit
{
	readonly searchInput = viewChild.required<ElementRef<HTMLElement>>('searchInput');

	readonly standard = input<'v3' | 'v4'>();

	readonly api = input<string>();

	readonly fields = input<string>();

	readonly filters = input<string[]>();

	readonly orderBy = input<string>();

	readonly sort = input<string>();

	readonly debounceTime = input<number>(250);

	clueControl: FormControl;
	constructor(@Inject(ALuApiService) @Optional() @SkipSelf() hostService: LuApiHybridService<T>, @Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>) {
		super(hostService || selfService);

		syncInputSignal(this.standard, (standard) => (this._service.standard = standard));
		syncInputSignal(this.api, (api) => (this._service.api = api));
		syncInputSignal(this.fields, (fields) => (this._service.fields = fields));
		syncInputSignal(this.filters, (filters) => (this._service.filters = filters));
		syncInputSignal(this.orderBy, (orderBy) => (this._service.orderBy = orderBy));
		syncInputSignal(this.sort, (sort) => (this._service.sort = sort));
	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges.pipe(debounceTime(this.debounceTime())) as Observable<string>;
		super.init();
	}

	override onOpen() {
		this.searchInput().nativeElement.focus();
		super.onOpen();
	}
	resetClue() {
		this.clueControl.reset('');
	}
}
