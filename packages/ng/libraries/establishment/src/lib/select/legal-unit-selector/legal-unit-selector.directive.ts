import { Directive, forwardRef, HostListener, Inject, Input, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { ALuOptionSelector, ILuOptionSelector } from '@lucca-front/ng/option';
import { Subject, Subscription } from 'rxjs';
import { ILuEstablishment, ILuLegalUnit } from '../../establishment.model';
import { ALuEstablishmentService, LuEstablishmentService } from '../../service/index';

@Directive({
	selector: '[luLegalUnitSelector]',
	providers: [
		{
			provide: ALuOptionSelector,
			useExisting: forwardRef(() => LuLegalUnitSelectorDirective),
			multi: true,
		},
		{
			provide: ALuEstablishmentService,
			useClass: LuEstablishmentService,
		},
	]
})
export class LuLegalUnitSelectorDirective implements ILuOptionSelector<ILuEstablishment>, OnDestroy {
	multiple = true;
	onSelectValue = new Subject<ILuEstablishment[]>();
	private _values: ILuEstablishment[];
	private _service: LuEstablishmentService;
	private _subs = new Subscription();

	@Input('luLegalUnitSelector') legalUnit: ILuLegalUnit;

	constructor(
		@Inject(ALuEstablishmentService) @Optional() @SkipSelf() hostService: ALuEstablishmentService,
		@Inject(ALuEstablishmentService) @Self() selfService: LuEstablishmentService,
	) {
		this._service = (hostService || selfService) as LuEstablishmentService;
	}

	@HostListener('click')
	onClick(): void {
		const sub = this._service.getAll(
			[`legalUnitId=${this.legalUnit.id}`]
		).subscribe(establishments => {
			if (this.shouldAdd(establishments)) {
				this.onSelectValue.next(
					Array.from(new Set<ILuEstablishment>([
						...(this._values ?? []),
						...establishments
					]))
				);
			} else {
				const establishmentIds = new Set<number>(
					establishments.map(ets => ets.id)
				);
				this.onSelectValue.next(
					(this._values ?? []).filter(ets => !establishmentIds.has(ets.id))
				);
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
		const selectedCount = (this._values ?? [])
			.filter(ets => ets.legalUnitId === this.legalUnit.id)
			.length;
		return establishments.length > selectedCount;
	}
}