import { ChangeDetectionStrategy, Component, forwardRef, Inject, input, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber, syncInputSignal } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { BehaviorSubject } from 'rxjs';
import { ILuApiItem } from '../../api.model';
import { ALuApiService, LuApiHybridService } from '../../service/index';
import { ALuApiOptionFeeder } from './api-feeder.model';

@Component({
	selector: 'lu-api-feeder',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuApiFeederComponent),
			multi: true,
		},
		{
			provide: ALuOnOpenSubscriber,
			useExisting: forwardRef(() => LuApiFeederComponent),
			multi: true,
		},
		{
			provide: ALuApiService,
			useClass: LuApiHybridService,
		},
	],
})
export class LuApiFeederComponent<T extends ILuApiItem = ILuApiItem> extends ALuApiOptionFeeder<T, LuApiHybridService<T>> implements ILuOptionOperator<T>, ILuOnOpenSubscriber {
	override readonly outOptions$ = new BehaviorSubject<T[]>([]);

	/**
	 * Standard of the Lucca API to query: `v3` or `v4`
	 */
	readonly standard = input<'v3' | 'v4'>();

	/**
	 * Url of the API to query
	 */
	readonly api = input<string>();

	/**
	 * Fields to retrieve, only works with standard="v3"
	 */
	readonly fields = input<string>();

	/**
	 * Filters added to the query string of the API call
	 */
	readonly filters = input<string[]>();

	/**
	 * Sort order, only works with standard="v3", otherwise use sort
	 */
	readonly orderBy = input<string>();

	/**
	 * Sort order, only works with standard="v4", otherwise use orderBy
	 */
	readonly sort = input<string>();

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
		syncInputSignal(this.sort, (sort) => (this._service.sort = sort));
	}
}
