import { ChangeDetectionStrategy, Component, forwardRef, Inject, input, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber, syncInputSignal } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { ILuApiItem } from '../../api.model';
import { ALuApiService, LuApiHybridService } from '../../service/index';
import { ALuApiOptionPager } from './api-pager.model';

@Component({
	selector: 'lu-api-pager',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuApiPagerComponent),
			multi: true,
		},
		{
			provide: ALuApiService,
			useClass: LuApiHybridService,
		},
		{
			provide: ALuOnScrollBottomSubscriber,
			useExisting: forwardRef(() => LuApiPagerComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuApiPagerComponent),
			multi: true,
		},
	],
})
export class LuApiPagerComponent<T extends ILuApiItem = ILuApiItem>
	extends ALuApiOptionPager<T, LuApiHybridService<T>>
	implements ILuOptionOperator<T>, OnInit, ILuOnScrollBottomSubscriber, ILuOnOpenSubscriber
{
	readonly standard = input<'v3' | 'v4'>();

	readonly api = input<string>();

	readonly fields = input<string>();

	readonly filters = input<string[]>();

	readonly orderBy = input<string>();

	constructor(
		@Inject(ALuApiService)
		@Optional()
		@SkipSelf()
		hostService: LuApiHybridService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super(hostService || selfService);

		syncInputSignal(this.standard, (standard) => (this._service.standard = standard));
		syncInputSignal(this.api, (api) => (this._service.api = api));
		syncInputSignal(this.fields, (fields) => (this._service.fields = fields));
		syncInputSignal(this.filters, (filters) => (this._service.filters = filters));
		syncInputSignal(this.orderBy, (orderBy) => (this._service.orderBy = orderBy));
	}

	ngOnInit() {
		super.init();
	}
}
