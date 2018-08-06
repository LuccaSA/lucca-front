import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../../../option/index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LuApiPagerService } from './api-pager.service';
import { IApiItem } from '../../api.model';
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
	],
})
export class LuApiPagerComponent<T extends IApiItem = IApiItem> extends ALuApiOptionPager<T> implements ILuOptionOperator<T> {
	outOptions$ = new BehaviorSubject<T[]>([]);
	constructor(protected service: ALuApiPagerService<T>) {
		super(service);
	}
	@Input() set api(api: string) { this.service.api = api; }
	@Input() set fields(fields: string) { this.service.fields = fields; }
	@Input() set filters(filters: string[]) { this.service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this.service.orderBy = orderBy; }
	/**
	 * a function to transform the item fetched from the api into the kind of item you want
	 * if you wnat to cast dates into moments for example
	 */
	@Input() set transformFn(transformFn: (item: any) => T) { this.service.transformFn = transformFn; }
}
