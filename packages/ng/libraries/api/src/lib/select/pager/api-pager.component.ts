import { ChangeDetectionStrategy, Component, forwardRef, Input, Inject, Optional, SkipSelf, Self, OnInit } from '@angular/core';
import { ILuOnScrollBottomSubscriber, ALuOnScrollBottomSubscriber, ILuOnOpenSubscriber, ALuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '@lucca-front/ng/option';
import { LuApiPagerService } from './api-pager.service';
import { ILuApiItem } from '../../api.model';
import { ALuApiOptionPager, ALuApiPagerService } from './api-pager.model';

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
			provide: ALuApiPagerService,
			useClass: LuApiPagerService,
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
export class LuApiPagerComponent<T extends ILuApiItem = ILuApiItem, S extends ALuApiPagerService<T> = ALuApiPagerService<T>>
extends ALuApiOptionPager<T, S>
implements ILuOptionOperator<T>, OnInit, ILuOnScrollBottomSubscriber, ILuOnOpenSubscriber {
	constructor(
		@Inject(ALuApiPagerService) @Optional() @SkipSelf() hostService: ALuApiPagerService,
		@Inject(ALuApiPagerService) @Self() selfService: ALuApiPagerService,
	) {
		super((hostService || selfService) as S);
	}
	@Input() set api(api: string) {
		this._service.api = api;
	}
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	/**
	 * a function to transform the item fetched from the api into the kind of item you want
	 * if you wnat to cast dates into moments for example
	 */
	@Input() set transformFn(transformFn: (item: any) => T) { this._service.transformFn = transformFn; }
	ngOnInit() {
		super.init();
	}
}
