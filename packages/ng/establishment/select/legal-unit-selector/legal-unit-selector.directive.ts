import { Directive, forwardRef, Inject, input, OnDestroy, Optional, Self } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import { ALuOptionSelector, ILuOptionSelector } from '@lucca-front/ng/option';
import { Subject, Subscription } from 'rxjs';
import { ILuEstablishment, ILuLegalUnit } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';
import { DEFAULT_ESTABLISHMENT_SERVICE } from '../establishment-select.token';

@Directive({
	host: {
		'(click)': 'onClick()',
	},
	selector: '[luLegalUnitSelector]',
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
	readonly onSelectValue = new Subject<ILuEstablishment[]>();
	private _values: ILuEstablishment[];
	private _service: LuEstablishmentService;
	private _subs = new Subscription();

	readonly legalUnit = input<ILuLegalUnit>(undefined, { alias: 'luLegalUnitSelector' });

	readonly filters = input<string[]>(undefined, { alias: 'luLegalUnitSelectorFilters' });

	readonly appInstanceId = input<number>(undefined, { alias: 'luLegalUnitSelectorAppInstanceId' });

	readonly operations = input<number[]>(undefined, { alias: 'luLegalUnitSelectorOperations' });

	multiple = true;

	constructor(
		@Inject(ALuEstablishmentService)
		@Optional()
		customService: LuEstablishmentService,
		@Inject(DEFAULT_ESTABLISHMENT_SERVICE)
		@Self()
		defaultService: LuEstablishmentService,
	) {
		this._service = customService || defaultService;

		syncInputSignal(this.filters, (filters) => (this._service.filters = filters));
		syncInputSignal(this.appInstanceId, (appInstanceId) => (this._service.appInstanceId = appInstanceId));
		syncInputSignal(this.operations, (operations) => (this._service.operations = operations));
	}

	onClick(): void {
		const legalUnit = this.legalUnit();
		if (!legalUnit) return;

		const sub = this._service.getAll([`legalUnitId=${legalUnit.id}`]).subscribe((establishments) => {
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
		const legalUnit = this.legalUnit();
		if (!legalUnit) return false;

		const selectedCount = (this._values ?? []).filter((ets) => ets.legalUnitId === legalUnit.id).length;
		return establishments.length > selectedCount;
	}
}
