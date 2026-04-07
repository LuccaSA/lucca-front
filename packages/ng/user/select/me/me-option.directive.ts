import { Directive, EmbeddedViewRef, forwardRef, Inject, input, Optional, Self, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { ALuOnOpenSubscriber, isNotNil, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ALuUserService, LuUserV3Service } from '../../service/index';
import { ILuUser } from '../../user.model';

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
	readonly luUserMeOptionFields = input<string>();

	readonly luUserMeOptionFilters = input<string[]>();

	readonly luUserMeOptionOrderBy = input<string>();

	readonly luUserMeOptionAppInstanceId = input<number | string>();

	readonly luUserMeOptionOperations = input<number[]>();

	readonly luUserMeOptionClue = input<string>();

	set inOptions$(in$: Observable<U[]>) {
		this.outOptions$ = combineLatest([in$, this.meDisplayed$]).pipe(map(([options, meDisplayed]) => (meDisplayed ? options?.filter((o) => o.id !== this.me?.id) : options)));
	}
	outOptions$: Observable<U[]>;

	private _service: LuUserV3Service<U>;
	private _viewRef: EmbeddedViewRef<{ $implicit: U }>;

	constructor(
		@Inject(ALuUserService) @Optional() @SkipSelf() hostService: LuUserV3Service<U>,
		@Inject(ALuUserService) @Self() selfService: LuUserV3Service<U>,
		private _vcr: ViewContainerRef,
		private _templateRef: TemplateRef<{ $implicit: U }>,
	) {
		this._service = hostService || selfService;

		ɵeffectWithDeps([this.luUserMeOptionClue], (clue) => {
			if (isNotNil(clue)) {
				this.hideMe();
			} else {
				this.displayMe();
			}
		});
		this.#initServiceValues();
	}

	me: U | undefined = undefined;
	private readonly meDisplayed$ = new BehaviorSubject(false);

	#initServiceValues() {
		ɵeffectWithDeps([this.luUserMeOptionFields], (luUserMeOptionFields) => {
			if (isNotNil(luUserMeOptionFields)) {
				this._service.fields = luUserMeOptionFields;
			}
		});
		ɵeffectWithDeps([this.luUserMeOptionFilters], (luUserMeOptionFilters) => {
			if (isNotNil(luUserMeOptionFilters)) {
				this._service.filters = luUserMeOptionFilters;
			}
		});
		ɵeffectWithDeps([this.luUserMeOptionOrderBy], (luUserMeOptionOrderBy) => {
			if (isNotNil(luUserMeOptionOrderBy)) {
				this._service.orderBy = luUserMeOptionOrderBy;
			}
		});
		ɵeffectWithDeps([this.luUserMeOptionAppInstanceId], (luUserMeOptionAppInstanceId) => {
			if (isNotNil(luUserMeOptionAppInstanceId)) {
				this._service.appInstanceId = luUserMeOptionAppInstanceId;
			}
		});
		ɵeffectWithDeps([this.luUserMeOptionOperations], (luUserMeOptionOperations) => {
			if (isNotNil(luUserMeOptionOperations)) {
				this._service.operations = luUserMeOptionOperations;
			}
		});
	}

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
