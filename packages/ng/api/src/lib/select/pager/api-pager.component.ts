import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
	Inject,
	Optional,
	SkipSelf,
	Self,
	OnInit,
} from '@angular/core';
import {
	ILuOnScrollBottomSubscriber,
	ALuOnScrollBottomSubscriber,
	ILuOnOpenSubscriber,
	ALuOnOpenSubscriber,
} from '@lucca-front/ng/core';
import { ILuOptionOperator, ALuOptionOperator } from '@lucca-front/ng/option';
import { ILuApiItem } from '../../api.model';
import { ALuApiOptionPager } from './api-pager.model';
import { ALuApiService, LuApiHybridService } from '../../service/index';

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
			provide: ALuApiService,
			useClass: LuApiHybridService,
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
export class LuApiPagerComponent<T extends ILuApiItem = ILuApiItem>
	extends ALuApiOptionPager<T, LuApiHybridService<T>>
	implements
		ILuOptionOperator<T>,
		OnInit,
		ILuOnScrollBottomSubscriber,
		ILuOnOpenSubscriber
{
	constructor(
		@Inject(ALuApiService)
		@Optional()
		@SkipSelf()
		hostService: LuApiHybridService<T>,
		@Inject(ALuApiService) @Self() selfService: LuApiHybridService<T>,
	) {
		super(hostService || selfService);
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

	ngOnInit() {
		super.init();
	}
}
