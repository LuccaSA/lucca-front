import { Directive, forwardRef, Inject, Optional, SkipSelf, Self, ViewContainerRef, TemplateRef } from '@angular/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { ALuUserPagedSearcherService, LuUserPagedSearcherService } from '../searcher/index';
import { ALuOnOpenSubscriber } from '@lucca-front/ng/core';
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
			provide: ALuUserPagedSearcherService,
			useClass: LuUserPagedSearcherService,
		},
		
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuUserMeOptionDirective),
			multi: true,
		},
	],
})
export class LuUserMeOptionDirective implements ILuOptionOperator {
	set inOptions$ (in$) {
		this.outOptions$ = in$;
	}
	outOptions$;
	private _service: ALuUserPagedSearcherService;
	constructor(
		@Inject(ALuUserPagedSearcherService) @Optional() @SkipSelf() hostService: ALuUserPagedSearcherService,
		@Inject(ALuUserPagedSearcherService) @Self() selfService: ALuUserPagedSearcherService,
		private _vcr: ViewContainerRef,
		private _templateRef: TemplateRef<{ $implicit: ILuUser }>,
	) {
		this._service = hostService || selfService;
	}

	me: ILuUser = undefined;
	private meDisplayed = false;
	onOpen() {
		this._service.getMe().subscribe(me => {
			this.me = me;
			this.displayMe();
		});
	}
	displayMe() {
		if (this.me && !this.meDisplayed) {
			this.meDisplayed = true;
			this._vcr.createEmbeddedView(this._templateRef, { $implicit: this.me });
		}
	}
}