import { ChangeDetectionStrategy, Component, forwardRef, Input, Inject, Optional, SkipSelf, Self, OnInit } from '@angular/core';
import { ILuOnScrollBottomSubscriber, ALuOnScrollBottomSubscriber, ILuOnOpenSubscriber, ALuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '@lucca-front/ng/option';
import { ILuApiItem } from '../../api.model';
import { ALuApiOptionPager } from './api-pager.model';
import { ALuApiService } from '../../service/index';
import { LuApiV3Service } from '../../service/index';

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
			useClass: LuApiV3Service,
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
extends ALuApiOptionPager<T, LuApiV3Service<T>>
implements ILuOptionOperator<T>, OnInit, ILuOnScrollBottomSubscriber, ILuOnOpenSubscriber {
	constructor(
		@Inject(ALuApiService) @Optional() @SkipSelf() hostService: LuApiV3Service<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiV3Service<T>,
	) {
		super((hostService || selfService) as LuApiV3Service<T>);
	}
	@Input() set api(api: string) {
		this._service.api = api;
	}
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }

	ngOnInit() {
		super.init();
	}
}
