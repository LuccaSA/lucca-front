import { ChangeDetectionStrategy, Component, forwardRef, Input, Optional, SkipSelf, Inject, Self } from '@angular/core';
import { ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '@lucca-front/ng/option';
import { BehaviorSubject } from 'rxjs';
import { ILuApiItem } from '../../api.model';
import { ALuApiOptionFeeder } from './api-feeder.model';
import { ALuApiService } from '../../service/index';
import { LuApiV3Service } from '../../service/index';
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
			useClass: LuApiV3Service,
		},
	],
})
export class LuApiFeederComponent<T extends ILuApiItem = ILuApiItem>
extends ALuApiOptionFeeder<T, LuApiV3Service<T>>
implements ILuOptionOperator<T>, ILuOnOpenSubscriber {
	outOptions$ = new BehaviorSubject<T[]>([]);
	constructor(
		@Inject(ALuApiService) @Optional() @SkipSelf() hostService: ALuApiService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiV3Service<T>,
	) {
		super((hostService || selfService) as LuApiV3Service<T>);
	}
	@Input() set api(api: string) { this._service.api = api; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
}
