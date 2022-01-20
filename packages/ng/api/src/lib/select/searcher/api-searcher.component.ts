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
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ALuOnCloseSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator } from '@lucca-front/ng/option';
import { ALuApiOptionSearcher, ALuApiOptionPagedSearcher } from './api-searcher.model';
import { ILuApiItem } from '../../api.model';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { ALuApiService, LuApiHybridService } from '../../service/index';

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
			provide: ALuApiService,
			useClass: LuApiHybridService,
		},
	],
})
export class LuApiSearcherComponent<T extends import('../../api.model').ILuApiItem = import('../../api.model').ILuApiItem>
	extends ALuApiOptionSearcher<T, LuApiHybridService<T>> implements OnInit {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;

	@Input() set standard(standard: string) { this._service.standard = standard; }
	@Input() set api(api: string) { this._service.api = api; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set sort(sort: string) { this._service.sort = sort }
	@Input() debounceTime: number = 250;

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiService) @Optional() @SkipSelf() hostService: ALuApiService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super((hostService || selfService) as LuApiHybridService<T>);

	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges
			.pipe(debounceTime(this.debounceTime));
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
	extends ALuApiOptionPagedSearcher<T, LuApiHybridService<T>> implements OnInit {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set standard(standard: string) { this._service.standard = standard; }
	@Input() set api(api: string) { this._service.api = api; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() debounceTime: number = 250;

	clueControl: FormControl;
	constructor(
		@Inject(ALuApiService) @Optional() @SkipSelf() hostService: ALuApiService,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super((hostService || selfService) as LuApiHybridService<T>);
	}
	ngOnInit() {
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges
			.pipe(debounceTime(this.debounceTime));
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

