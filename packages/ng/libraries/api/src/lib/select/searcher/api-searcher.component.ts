import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding, OnInit } from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator } from '@lucca-front/ng/option';
import { ALuApiOptionSearcher, ALuApiSearcherService, ALuApiOptionPagedSearcher, ALuApiPagedSearcherService } from './api-searcher.model';
import { ILuApiItem } from '../../api.model';
import { LuApiSearcherService, LuApiPagedSearcherService } from './api-searcher.service';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
	selector: 'lu-api-searcher',
	templateUrl: 'api-searcher.component.html',
	styleUrls: ['api-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
			provide: ALuApiSearcherService,
			useClass: LuApiSearcherService,
		},
	],
})
export class LuApiSearcherComponent<T extends ILuApiItem = ILuApiItem, S extends ALuApiSearcherService<T> = ALuApiSearcherService<T>>
extends ALuApiOptionSearcher<T, S> implements OnInit {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set api(api: string) {
		this._service.api = api;
	}
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	/**
	 * a function to transform the item fetched from the api into the kind of item you want
	 * if you wnat to cast dates into moments for example
	 */
	@Input() set transformFn(transformFn: (item: any) => T) { this._service.transformFn = transformFn; }

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiSearcherService) @Optional() @SkipSelf() hostService: ALuApiSearcherService,
		@Inject(ALuApiSearcherService) @Self() selfService: ALuApiSearcherService,
	) {
		super((hostService || selfService) as S);

	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges
		.pipe(debounceTime(250));
		super.init();
	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		super.onOpen();
	}
	resetClue() {
		this.clueControl.setValue('');
	}
}

@Component({
	selector: 'lu-api-paged-searcher',
	templateUrl: 'api-searcher.component.html',
	styleUrls: ['api-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
			provide: ALuApiPagedSearcherService,
			useClass: LuApiPagedSearcherService,
		},
	],
})
export class LuApiPagedSearcherComponent<T extends ILuApiItem = ILuApiItem, S extends ALuApiPagedSearcherService<T> = ALuApiPagedSearcherService<T>>
extends ALuApiOptionPagedSearcher<T, S> implements OnInit {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set api(api: string) { this._service.api = api; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	/**
	 * a function to transform the item fetched from the api into the kind of item you want
	 * if you wnat to cast dates into moments for example
	 */
	@Input() set transformFn(transformFn: (item: any) => T) { this._service.transformFn = transformFn; }

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiPagedSearcherService) @Optional() @SkipSelf() hostService: ALuApiPagedSearcherService,
		@Inject(ALuApiPagedSearcherService) @Self() selfService: ALuApiPagedSearcherService,
	) {
		super((hostService || selfService) as S);
	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges
		.pipe(
			tap(c => this.resetPage()),
			// debounceTime(250),
		);
		super.init();
	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		super.onOpen();
	}
	resetClue() {
		this.clueControl.reset('')
	}
}

