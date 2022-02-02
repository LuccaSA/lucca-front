import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
	Optional,
	SkipSelf,
	Inject,
	Self,
} from '@angular/core';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '@lucca-front/ng/option';
import { BehaviorSubject } from 'rxjs';
import { ILuApiItem } from '../../api.model';
import { ALuApiOptionFeeder } from './api-feeder.model';
import { ALuApiService, LuApiHybridService } from '../../service/index';
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
