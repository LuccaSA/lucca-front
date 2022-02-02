import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ALuOptionOperator, ILuOptionOperator } from '@lucca-front/ng/option';
import { BehaviorSubject } from 'rxjs';
import { ILuApiItem } from '../../api.model';
import { ALuApiService, LuApiHybridService } from '../../service/index';
import { ALuApiOptionFeeder } from './api-feeder.model';
@Component({
	selector: 'lu-api-feeder',
	template: '',
	styleUrls: [],
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
export class LuApiFeederComponent<T extends ILuApiItem = ILuApiItem>
	extends ALuApiOptionFeeder<T, LuApiHybridService<T>>
	implements ILuOptionOperator<T>, ILuOnOpenSubscriber
{
	override outOptions$ = new BehaviorSubject<T[]>([]);
	constructor(
		@Inject(ALuApiService)
		@Optional()
		@SkipSelf()
		hostService: ALuApiService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super((hostService || selfService) as LuApiHybridService<T>);
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
}
