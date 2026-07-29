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

	readonly standard = input<'v3' | 'v4'>();

	readonly api = input<string>();

	readonly fields = input<string>();

	readonly filters = input<string[]>();

	readonly orderBy = input<string>();

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
