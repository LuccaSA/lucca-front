import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild, ElementRef, SkipSelf, Self, Optional, Inject, HostBinding, ViewContainerRef, TemplateRef, EmbeddedViewRef, ChangeDetectorRef, ViewRef } from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator } from '@lucca-front/ng/option';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { LuUserPagedSearcherService } from './user-searcher.service';
import { ALuUserPagedSearcherService } from './user-searcher.model';
import { ILuUser } from '../../user.model';
import { ALuApiOptionPagedSearcher } from '@lucca-front/ng/api';

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
export class LuUserPagedSearcherComponent<U extends ILuUser = ILuUser, S extends ALuUserPagedSearcherService<U> = ALuUserPagedSearcherService<U>>
extends ALuApiOptionPagedSearcher<U, S> {
	@HostBinding('class.position-fixed') fixed = true;
	@ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
	@ViewChild('meTemplate', { read: TemplateRef, static: true }) meTemplate: TemplateRef<{ me: ILuUser }>;
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set appInstanceId(appInstanceId: number | string) { this._service.appInstanceId = appInstanceId; }
	@Input() set operations(operations: number[]) { this._service.operations = operations; }
	@Input() set transformFn(transformFn: (item: any) => U) { this._service.transformFn = transformFn; }

	clueControl: FormControl;
	private me: ILuUser = undefined;
	private meDisplayed = false;
	private meView: ViewRef;
	constructor(
		@Inject(ALuUserPagedSearcherService) @Optional() @SkipSelf() hostService: ALuUserPagedSearcherService,
		@Inject(ALuUserPagedSearcherService) @Self() selfService: ALuUserPagedSearcherService,
		private _vcr: ViewContainerRef,
		private _cdr: ChangeDetectorRef,
	) {
		super((hostService || selfService) as S);
		this.clueControl = new FormControl(undefined);
		this.clue$ = this.clueControl.valueChanges
		.pipe(
			debounceTime(250),
			tap(() => this.displayMe())
		);
	}

	displayMe() {
		if (!!this.me && !this.clueControl.value && !this.meDisplayed && !this.meView) {
			this.meView = this._vcr.createEmbeddedView(this.meTemplate, { me: this.me });
			this.meDisplayed = true;
		} else if (this.clueControl.value && this.meDisplayed) {
			this.meView = this._vcr.detach(0);
			this.meDisplayed = false;
		} else if (!!this.me && !this.clueControl.value && !this.meDisplayed) {
			this._vcr.insert(this.meView);
			this.meDisplayed = true;
		}
		setTimeout(() => { this._cdr.markForCheck(); }, 1);
	}

	onOpen() {
		this.searchInput.nativeElement.focus();
		super.onOpen();
		if (this.me === undefined) {
			this._service.getMe().subscribe(me => {
				this.me = me;
				this.displayMe();
			});
		}
	}
	resetClue() {
		this.clueControl.setValue('');
	}
}
