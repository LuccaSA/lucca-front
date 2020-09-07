import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
	ViewChild,
	ElementRef,
	SkipSelf,
	Self,
	Optional,
	Inject,
	OnInit,
} from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator } from '@lucca-front/ng/option';
import { ALuApiOptionSearcher, ALuApiOptionPagedSearcher } from './api-searcher.model';
import { ILuApiItem } from '../../api.model';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { ALuApiService, LuApiV3Service } from '../../service/index';

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
			provide: ALuOnCloseSubscriber,
			useExisting: forwardRef(() => LuApiSearcherComponent),
			multi: true,
		},
		{
			provide: ALuApiService,
			useClass: LuApiV3Service,
		},
	],
})
export class LuApiSearcherComponent<T extends ILuApiItem = ILuApiItem>
extends ALuApiOptionSearcher<T, LuApiV3Service<T>> implements OnInit {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set api(api: string) {
		this._service.api = api;
	}
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiService) @Optional() @SkipSelf() hostService: ALuApiService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiV3Service<T>,
	) {
		super((hostService || selfService) as LuApiV3Service<T>);

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
			provide: ALuOnCloseSubscriber,
			useExisting: forwardRef(() => LuApiSearcherComponent),
			multi: true,
		},
		{
			provide: ALuApiService,
			useClass: LuApiV3Service,
		},
	],
})
export class LuApiPagedSearcherComponent<T extends ILuApiItem = ILuApiItem>
extends ALuApiOptionPagedSearcher<T, LuApiV3Service<T>> implements OnInit {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set api(api: string) { this._service.api = api; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiService) @Optional() @SkipSelf() hostService: ALuApiService,
		@Inject(ALuApiService) @Self() selfService: LuApiV3Service<T>,
	) {
		super((hostService || selfService) as LuApiV3Service<T>);
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
		this.clueControl.reset('');
	}
}

