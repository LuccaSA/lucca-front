import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding } from '@angular/core';
import { ALuOptionOperator } from '../../../option/index';
import { ALuApiOptionSearcher, ALuApiSearcherService, ALuApiOptionPagedSearcher, ALuApiPagedSearcherService } from './api-searcher.model';
import { IApiItem } from '../../api.model';
import { LuApiSearcherService, LuApiPagedSearcherService } from './api-searcher.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';

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
			provide: ALuApiSearcherService,
			useClass: LuApiSearcherService,
		},
	],
})
export class LuApiSearcherComponent<T extends IApiItem = IApiItem, S extends ALuApiSearcherService<T> = ALuApiSearcherService<T>>
extends ALuApiOptionSearcher<T, S> {
	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef;
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
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges
		.pipe(debounceTime(250));
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
			provide: ALuApiPagedSearcherService,
			useClass: LuApiPagedSearcherService,
		},
	],
})
export class LuApiPagedSearcherComponent<T extends IApiItem = IApiItem, S extends ALuApiPagedSearcherService<T> = ALuApiPagedSearcherService<T>>
extends ALuApiOptionPagedSearcher<T, S> {
	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef;
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
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges
		.pipe(debounceTime(250));	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		super.onOpen();
	}
	resetClue() {
		this.clueControl.setValue('');
	}
}

