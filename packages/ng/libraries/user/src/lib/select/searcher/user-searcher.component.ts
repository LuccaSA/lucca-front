import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding, OnInit } from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ALuOnCloseSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator } from '@lucca-front/ng/option';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ILuUser } from '../../user.model';
import { ALuApiOptionPagedSearcher } from '@lucca-front/ng/api';
import { ALuUserService, LuUserV3Service } from '../../service/index';

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
extends ALuApiOptionPagedSearcher<U, LuUserV3Service<U>> implements OnInit {
	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set appInstanceId(appInstanceId: number | string) { this._service.appInstanceId = appInstanceId; }
	@Input() set operations(operations: number[]) { this._service.operations = operations; }

	clueControl: FormControl;
	constructor(
		@Inject(ALuUserService) @Optional() @SkipSelf() hostService: ALuUserService,
		@Inject(ALuUserService) @Self() selfService: LuUserV3Service<U>,
	) {
		super((hostService || selfService) as LuUserV3Service<U>);
	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		super.onOpen();
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
	resetClue() {
		this.clueControl.reset('');
	}
}
