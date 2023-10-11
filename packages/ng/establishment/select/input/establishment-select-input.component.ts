import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	forwardRef,
	Inject,
	Input,
	OnInit,
	Optional,
	Renderer2,
	Self,
	SkipSelf,
	ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { LuInputClearerComponent, LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { ILuOptionPickerPanel, LuOptionComparer, LuOptionItemComponent, LuOptionPickerAdvancedComponent } from '@lucca-front/ng/option';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { combineLatest } from 'rxjs';
import { ILuEstablishment } from '../../establishment.model';
import { ALuEstablishmentService, ALuLegalUnitService, LuEstablishmentService, LuLegalUnitService } from '../../service/index';
import { LuForLegalUnitsDirective } from '../for-legal-units';
import { LuLegalUnitSelectorDirective } from '../legal-unit-selector';
import { LuEstablishmentSearcherComponent } from '../searcher';
import { LuEstablishmentSelectAllComponent } from '../select-all';
import { LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS } from './establishment-select-input.translate';

@Component({
	selector: 'lu-establishment-select',
	templateUrl: './establishment-select-input.component.html',
	styleUrls: ['./establishment-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		CommonModule,
		OverlayModule,
		LuInputClearerComponent,
		LuOptionPickerAdvancedComponent,
		LuEstablishmentSearcherComponent,
		LuEstablishmentSelectAllComponent,
		LuLegalUnitSelectorDirective,
		LuOptionItemComponent,
		LuForLegalUnitsDirective,
		LuInputDisplayerDirective,
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuEstablishmentSelectInputComponent),
			multi: true,
		},
		{
			provide: ALuEstablishmentService,
			useClass: LuEstablishmentService,
		},
		{
			provide: ALuLegalUnitService,
			useClass: LuLegalUnitService,
		},
	],
})
export class LuEstablishmentSelectInputComponent<
		D extends import('../../establishment.model').ILuEstablishment = import('../../establishment.model').ILuEstablishment,
		P extends ILuOptionPickerPanel<D> = ILuOptionPickerPanel<D>,
	>
	extends ALuSelectInputComponent<D, P>
	implements ControlValueAccessor, ILuInputWithPicker<D>, OnInit, AfterViewInit
{
	byId: LuOptionComparer<D> = (option1: D, option2: D) => option1 && option2 && option1.id === option2.id;

	@Input() filters: string[];
	@Input() appInstanceId: number;
	@Input() operations: number[];

	private _establishmentService: LuEstablishmentService;
	private _legalUnitService: LuLegalUnitService;

	isSearching = false;
	groupByLu = true;

	get sort(): string {
		return this.isSearching ? 'name' : 'legalunit.name,name';
	}

	public intl = getIntl(LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS);

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
		@Inject(ALuLegalUnitService)
		@Optional()
		@SkipSelf()
		hostLuService: LuLegalUnitService,
		@Inject(ALuLegalUnitService) @Self() selfLuService: LuLegalUnitService,
		@Inject(ALuEstablishmentService)
		@Optional()
		@SkipSelf()
		hostEstablishmentService: LuEstablishmentService,
		@Inject(ALuEstablishmentService)
		@Self()
		selfEstablishmentService: LuEstablishmentService,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
		this._establishmentService = hostEstablishmentService || selfEstablishmentService;
		this._legalUnitService = hostLuService || selfLuService;
	}

	ngOnInit() {
		this._subs.add(
			combineLatest([this._legalUnitService.count(), this._establishmentService.count()]).subscribe(([luCount, establishmentCount]) => {
				this.groupByLu = luCount > 1 && establishmentCount > 1 && luCount !== establishmentCount;
			}),
		);
	}

	onIsSearchingChanged(isSearching: boolean) {
		this.isSearching = isSearching;
		this._changeDetectorRef.detectChanges();
	}

	trackById(idx: number, item: ILuEstablishment): number {
		return item.id;
	}
}
