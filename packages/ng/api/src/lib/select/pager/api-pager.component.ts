import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOnOpenSubscriber, ALuOnScrollBottomSubscriber, ILuOnOpenSubscriber, ILuOnScrollBottomSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { ILuApiItem } from '../../api.model';
import { ALuApiService, LuApiHybridService } from '../../service/index';
import { ALuApiOptionPager } from './api-pager.model';

@Component({
	selector: 'lu-api-pager',
	template: '',
	styleUrls: [],
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
	constructor(
		@Inject(ALuApiService)
		@Optional()
		@SkipSelf()
		hostService: LuApiHybridService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super(hostService || selfService);
	}

	@Input() set standard(standard: string) {
		this._service.standard = standard;
	}
	@Input() set api(api: string) {
		this._service.api = api;
	}
	@Input() set fields(fields: string) {
		this._service.fields = fields;
	}
	@Input() set filters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input() set orderBy(orderBy: string) {
		this._service.orderBy = orderBy;
	}

	ngOnInit() {
		super.init();
	}
}
