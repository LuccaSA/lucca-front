import { ChangeDetectionStrategy, Component, forwardRef, Input, Optional, SkipSelf, Inject, Self } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator, ALuOnOpenSubscriber, ILuOnOpenSubscriber } from '@lucca-front/ng/option';
import { BehaviorSubject } from 'rxjs';
import { LuApiFeederService } from './api-feeder.service';
import { IApiItem } from '../../api.model';
import { ALuApiOptionFeeder, ALuApiFeederService } from './api-feeder.model';
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
			provide: ALuApiFeederService,
			useClass: LuApiFeederService,
		},
	],
})
export class LuApiFeederComponent<T extends IApiItem = IApiItem, S extends ALuApiFeederService<T> = ALuApiFeederService<T>>
extends ALuApiOptionFeeder<T, S>
implements ILuOptionOperator<T>, ILuOnOpenSubscriber {
	outOptions$ = new BehaviorSubject<T[]>([]);
	constructor(
		@Inject(ALuApiFeederService) @Optional() @SkipSelf() hostService: ALuApiFeederService,
		@Inject(ALuApiFeederService) @Self() selfService: ALuApiFeederService,
	) {
		super((hostService || selfService) as S);
	}
	@Input() set api(api: string) { this._service.api = api; }
	@Input() set fields(fields: string) { this._service.fields = fields; }
	@Input() set filters(filters: string[]) { this._service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this._service.orderBy = orderBy; }
	@Input() set transformFn(transformFn: (item: any) => T) { this._service.transformFn = transformFn; }
}
