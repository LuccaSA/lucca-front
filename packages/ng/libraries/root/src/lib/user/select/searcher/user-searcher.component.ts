import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding } from '@angular/core';
import { ALuOptionOperator, ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber } from '../../../option/index';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { LuUserPagedSearcherService } from './user-searcher.service';
import { ALuUserPagedSearcherService } from './user-searcher.model';
import { IUser } from '../../user.model';
import { ALuApiOptionPagedSearcher } from '../../../api/index';

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
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuUserPagedSearcherComponent),
			multi: true,
		},
		{
			provide: ALuUserPagedSearcherService,
			useClass: LuUserPagedSearcherService,
		},
	],
})
export class LuUserPagedSearcherComponent<U extends IUser = IUser, S extends ALuUserPagedSearcherService<U> = ALuUserPagedSearcherService<U>>
extends ALuApiOptionPagedSearcher<U, S> {
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set appInstanceId(appInstanceId: number | string) { this._service.appInstanceId = appInstanceId; }
	@Input() set operations(operations: number[]) { this._service.operations = operations; }
	@Input() set transformFn(transformFn: (item: any) => U) { this._service.transformFn = transformFn; }

	clueControl: FormControl;
	constructor(
		@Inject(ALuUserPagedSearcherService) @Optional() @SkipSelf() hostService: ALuUserPagedSearcherService,
		@Inject(ALuUserPagedSearcherService) @Self() selfService: ALuUserPagedSearcherService,
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

