import { ChangeDetectionStrategy, Component, forwardRef, Inject, Optional, SkipSelf, Self, OnInit } from '@angular/core';
import { ILuOnScrollBottomSubscriber, ALuOnScrollBottomSubscriber, ILuOnOpenSubscriber, ALuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '@lucca-front/ng/option';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';
import { ALuApiOptionPager } from '@lucca-front/ng/api';
import { ILuEstablishment } from '../../establishment.model';

@Component({
	selector: 'lu-establishment-pager',
	template: '',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuEstablishmentPagerComponent),
			multi: true,
		},
		{
			provide: ALuEstablishmentService,
			useClass: LuEstablishmentService,
		},
		{
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuEstablishmentPagerComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuEstablishmentPagerComponent),
			multi: true,
		},
	],
})
export class LuEstablishmentPagerComponent
extends ALuApiOptionPager<ILuEstablishment, LuEstablishmentService>
implements ILuOptionOperator<ILuEstablishment>, OnInit, ILuOnScrollBottomSubscriber, ILuOnOpenSubscriber {
	constructor(
		@Inject(ALuEstablishmentService) @Optional() @SkipSelf() hostService: LuEstablishmentService,
		@Inject(ALuEstablishmentService) @Self() selfService: LuEstablishmentService,
	) {
		super((hostService || selfService) as LuEstablishmentService);
	}

	ngOnInit() {
		super.init();
	}
}
