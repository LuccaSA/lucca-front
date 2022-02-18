import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, Input, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOptionOperator, ALuOptionSelector, ILuOptionSelectAllLabel, LuOptionSelectAllComponent, LuOptionSelectAllIntl } from '@lucca-front/ng/option';
import { Subscription } from 'rxjs';
import { ILuEstablishment } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';

@Component({
	selector: 'lu-establishment-select-all',
	templateUrl: './establishment-select-all.component.html',
	styleUrls: ['establishment-select-all.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuEstablishmentSelectAllComponent),
			multi: true,
		},
		{
			provide: ALuOptionSelector,
			useExisting: forwardRef(() => LuEstablishmentSelectAllComponent),
			multi: true,
		},
		{
			provide: ALuEstablishmentService,
			useClass: LuEstablishmentService,
		},
	],
})
export class LuEstablishmentSelectAllComponent extends LuOptionSelectAllComponent<ILuEstablishment> implements OnDestroy {
	@Input() set filters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input() set appInstanceId(appInstanceId: number) {
		this._service.appInstanceId = appInstanceId;
	}
	@Input() set operations(operations: number[]) {
		this._service.operations = operations;
	}

	loading = false;
	private _service: LuEstablishmentService;
	private _subs = new Subscription();

	constructor(
		private readonly _changeDetectorRef: ChangeDetectorRef,
		@Inject(LuOptionSelectAllIntl)
		public override intl: ILuOptionSelectAllLabel,
		@Inject(ALuEstablishmentService)
		@Optional()
		@SkipSelf()
		hostService: LuEstablishmentService,
		@Inject(ALuEstablishmentService)
		@Self()
		selfService: LuEstablishmentService,
	) {
		super(intl);
		this._service = hostService || selfService;
	}

	override selectAll() {
		this.loading = true;
		const sub = this._service.getAll().subscribe(
			(establishments) => {
				this.onSelectValue.next([...establishments]);
			},
			() => void {},
			() => {
				this.loading = false;
				this._changeDetectorRef.detectChanges();
			},
		);
		this._subs.add(sub);
	}

	ngOnDestroy(): void {
		this._subs.unsubscribe();
	}
}
