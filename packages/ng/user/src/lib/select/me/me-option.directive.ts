import { Directive, forwardRef, Inject, Optional, SkipSelf, Self, ViewContainerRef, TemplateRef, Input, EmbeddedViewRef } from '@angular/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { ALuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ILuUser } from '../../user.model';
import { ALuUserService, LuUserV3Service } from '../../service/index';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
	selector: '[luUserMeOption]',
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuUserMeOptionDirective),
			multi: true,
		},
		{
			provide: ALuUserService,
			useClass: LuUserV3Service,
		},

		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuUserMeOptionDirective),
			multi: true,
		},
	],
})
export class LuUserMeOptionDirective<U extends ILuUser = ILuUser> implements ILuOptionOperator<U> {
	@Input() set luUserMeOptionFields(fields: string) {
		this._service.fields = fields;
	}
	@Input() set luUserMeOptionFilters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input() set luUserMeOptionOrderBy(orderBy: string) {
		this._service.orderBy = orderBy;
	}
	@Input() set luUserMeOptionAppInstanceId(appInstanceId: number | string) {
		this._service.appInstanceId = appInstanceId;
	}
	@Input() set luUserMeOptionOperations(operations: number[]) {
		this._service.operations = operations;
	}
	@Input() set luUserMeOptionClue(clue: string) {
		clue ? this.hideMe() : this.displayMe();
	}

	set inOptions$(in$: Observable<U[]>) {
		this.outOptions$ = combineLatest([in$, this.meDisplayed$]).pipe(map(([options, meDisplayed]) => (meDisplayed ? options?.filter((o) => o.id !== this.me?.id) : options)));
	}
	outOptions$: Observable<U[]>;

	private _service: LuUserV3Service<U>;
	private _viewRef: EmbeddedViewRef<{ $implicit: ILuUser }>;

	constructor(
		@Inject(ALuUserService) @Optional() @SkipSelf() hostService: ALuUserService,
		@Inject(ALuUserService) @Self() selfService: ALuUserService,
		private _vcr: ViewContainerRef,
		private _templateRef: TemplateRef<{ $implicit: U }>,
	) {
		this._service = (hostService || selfService) as LuUserV3Service<U>;
	}

	me: ILuUser = undefined;
	private meDisplayed$ = new BehaviorSubject(false);
	onOpen() {
		this._service.getMe().subscribe((me) => {
			this.me = me;
			this.displayMe();
		});
	}
	displayMe() {
		if (this.me && !this.meDisplayed$.value) {
			this.meDisplayed$.next(true);
			this._viewRef = this._vcr.createEmbeddedView(this._templateRef, {
				$implicit: this.me,
			});
		}
	}
	hideMe() {
		if (this.me && this.meDisplayed$.value && this._viewRef) {
			this.meDisplayed$.next(false);
			this._viewRef.destroy();
		}
	}
}
