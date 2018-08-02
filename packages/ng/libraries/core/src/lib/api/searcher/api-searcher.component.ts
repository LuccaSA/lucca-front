import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ALuOptionOperator } from '../../option/index';
import { ALuApiOptionSearcher, ALuApiSearcherService } from './api-searcher.model';
import { IApiItem } from '../api.model';
import { LuApiSearcherService } from './api-searcher.service';
@Component({
	selector: 'lu-api-searcher',
	templateUrl: 'api-searcher.component.html',
	styleUrls: ['api-searcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuApiSearcherComponent),
			multi: true,
		},
		{
			provide: ALuApiSearcherService,
			useClass: LuApiSearcherService,
		},
	],
})
export class LuApiSearcherComponent<T extends IApiItem = IApiItem> extends ALuApiOptionSearcher<T> {
	@ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef;
	@Input() set api(api: string) { this.service.api = api; }
	@Input() set fields(fields: string) { this.service.fields = fields; }
	@Input() set filters(filters: string[]) { this.service.filters = filters; }
	@Input() set orderBy(orderBy: string) { this.service.orderBy = orderBy; }
	/**
	 * a function to transform the item fetched from the api into the kind of item you want
	 * if you wnat to cast dates into moments for example
	 */
	@Input() set transformFn(transformFn: (item: any) => T) { this.service.transformFn = transformFn; }

	constructor(protected service: ALuApiSearcherService<T>) { super(service); }

	onOpen() {
		this.searchInput.nativeElement.focus();
		super.onOpen();
	}
}
