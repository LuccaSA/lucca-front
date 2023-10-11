import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Inject, Input, OnInit, Optional, Self, SkipSelf, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ALuOnCloseSubscriber, ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator, LuOptionPlaceholderComponent } from '@lucca-front/ng/option';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ALuApiService, LuApiHybridService } from '../../service/index';
import { ALuApiOptionPagedSearcher, ALuApiOptionSearcher } from './api-searcher.model';

@Component({
	selector: 'lu-api-searcher',
	templateUrl: 'api-searcher.component.html',
	styleUrls: ['api-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderComponent],
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
	@ViewChild('searchInput', { read: ElementRef, static: true })
	searchInput: ElementRef<HTMLElement>;

	@Input() set standard(standard: 'v3' | 'v4') {
		this._service.standard = standard;
	}
	@Input() set api(api: string) {
		this._service.api = api;
	}
	@Input() set fields(fields: string) {
		this._service.fields = fields;
	}
	@Input() set filters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input() set orderBy(orderBy: string) {
		this._service.orderBy = orderBy;
	}
	@Input() set sort(sort: string) {
		this._service.sort = sort;
	}
	@Input() debounceTime = 250;

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiService)
		@Optional()
		@SkipSelf()
		hostService: LuApiHybridService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super(hostService || selfService);
	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges.pipe(debounceTime(this.debounceTime)) as Observable<string>;
		super.init();
	}

	override onOpen() {
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
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderComponent],
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
	@ViewChild('searchInput', { read: ElementRef, static: true })
	searchInput: ElementRef<HTMLElement>;
	@Input() set standard(standard: 'v3' | 'v4') {
		this._service.standard = standard;
	}
	@Input() set api(api: string) {
		this._service.api = api;
	}
	@Input() set fields(fields: string) {
		this._service.fields = fields;
	}
	@Input() set filters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input() set orderBy(orderBy: string) {
		this._service.orderBy = orderBy;
	}
	@Input() set sort(sort: string) {
		this._service.sort = sort;
	}
	@Input() debounceTime = 250;

	clueControl: FormControl;
	constructor(@Inject(ALuApiService) @Optional() @SkipSelf() hostService: LuApiHybridService<T>, @Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>) {
		super(hostService || selfService);
	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges.pipe(debounceTime(this.debounceTime)) as Observable<string>;
		super.init();
	}

	override onOpen() {
		this.searchInput.nativeElement.focus();
		super.onOpen();
	}
	resetClue() {
		this.clueControl.reset('');
	}
}
