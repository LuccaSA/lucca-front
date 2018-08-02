import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../../option/index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LuApiFeederService } from './api-feeder.service';
import { IApiItem } from '../api.model';
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
		LuApiFeederService,
	],
})
export class LuApiFeederComponent<T extends IApiItem = IApiItem> extends ALuApiOptionFeeder<T> implements ILuOptionOperator<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	constructor(protected service: LuApiFeederService<T>) {
		super(service);
	}
	@Input() set api(api: string) { this.service.api = api; }
	@Input() set fields(fields: string) { this.service.fields = fields; }
	@Input() set filters(filters: string) { this.service.filters = filters; }
}
