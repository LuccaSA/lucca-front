import { Directive, forwardRef, HostListener, Inject, Input, OnDestroy, Optional, Self } from '@angular/core';
import { ALuOptionSelector, ILuOptionSelector } from '@lucca-front/ng/option';
import { Subject, Subscription } from 'rxjs';
import { ILuEstablishment, ILuLegalUnit } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';
import { DEFAULT_ESTABLISHMENT_SERVICE } from '../establishment-select.token';

@Directive({
	selector: '[luLegalUnitSelector]',
	standalone: true,
	providers: [
		{
			provide: ALuOptionSelector,
			useExisting: forwardRef(() => LuLegalUnitSelectorDirective),
			multi: true,
		},
		{
			provide: DEFAULT_ESTABLISHMENT_SERVICE,
			useClass: LuEstablishmentService,
		},
	],
})
export class LuLegalUnitSelectorDirective implements ILuOptionSelector<ILuEstablishment>, OnDestroy {
	multiple = true;
	onSelectValue = new Subject<ILuEstablishment[]>();
	private _values: ILuEstablishment[];
	private _service: LuEstablishmentService;
	private _subs = new Subscription();

	@Input('luLegalUnitSelector') legalUnit: ILuLegalUnit;
	@Input('luLegalUnitSelectorFilters') set filters(filters: string[]) {
		this._service.filters = filters;
	}
	@Input('luLegalUnitSelectorAppInstanceId') set appInstanceId(appId: number) {
		this._service.appInstanceId = appId;
	}
	@Input('luLegalUnitSelectorOperations') set operations(ops: number[]) {
		this._service.operations = ops;
	}
	constructor(
		@Inject(ALuEstablishmentService)
		@Optional()
		customService: LuEstablishmentService,
		@Inject(DEFAULT_ESTABLISHMENT_SERVICE)
		@Self()
		defaultService: LuEstablishmentService,
	) {
		this._service = customService || defaultService;
	}

	@HostListener('click')
	onClick(): void {
		const sub = this._service.getAll([`legalUnitId=${this.legalUnit.id}`]).subscribe((establishments) => {
			if (this.shouldAdd(establishments)) {
				const selectedEstablishmentIds = new Set<number>((this._values ?? []).map((ets) => ets.id));
				this.onSelectValue.next(Array.from([...(this._values ?? []), ...establishments.filter((ets) => !selectedEstablishmentIds.has(ets.id))]));
			} else {
				const establishmentIds = new Set<number>(establishments.map((ets) => ets.id));
				this.onSelectValue.next((this._values ?? []).filter((ets) => !establishmentIds.has(ets.id)));
			}
		});
		this._subs.add(sub);
	}

	setValue(values: ILuEstablishment[]): void {
		this._values = values;
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}

	private shouldAdd(establishments: ILuEstablishment[]): boolean {
		const selectedCount = (this._values ?? []).filter((ets) => ets.legalUnitId === this.legalUnit.id).length;
		return establishments.length > selectedCount;
	}
}
