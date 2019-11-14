import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding } from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator } from '@lucca-front/ng/option';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {  LuUserService } from './user-searcher.service';
import { ALuUserService } from './user-searcher.model';
import { ILuUser } from '../../user.model';
import { Observable } from 'rxjs';
// import { ALuApiOptionPagedSearcher } from '../../../api/index';

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
			provide: ALuUserService,
			useClass:  LuUserService,
		},
	],
})
export class LuUserPagedSearcherComponent<U extends ILuUser = ILuUser, S extends ALuUserService<U> = ALuUserService<U>>
	// extends ALuApiOptionPagedSearcher<U, S>
{
	// @ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	// @Input() set fields(fields: string) { this._service.fields = fields; }
	// @Input() set filters(filters: string[]) { this._service.filters = filters; }
	// @Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	// @Input() set appInstanceId(appInstanceId: number | string) { this._service.appInstanceId = appInstanceId; }
	// @Input() set operations(operations: number[]) { this._service.operations = operations; }
	// @Input() set transformFn(transformFn: (item: any) => U) { this._service.transformFn = transformFn; }

	clueControl: FormControl;
	loading$: Observable<boolean>;
	// constructor(
	// 	@Inject(ALuUserService) @Optional() @SkipSelf() hostService: ALuUserService,
	// 	@Inject(ALuUserService) @Self() selfService: ALuUserService,
	// ) {
	// 	super((hostService || selfService) as S);
	// 	this.clueControl = new FormControl(undefined);
	// 	this.clue$ = this.clueControl.valueChanges
	// 	.pipe(debounceTime(250));
	// }

	// onOpen() {
	// 	this.searchInput.nativeElement.focus();
	// 	super.onOpen();
	// }
	// resetClue() {
	// 	this.clueControl.setValue('');
	// }
}

