import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	Renderer2,
	Inject,
	AfterViewInit, Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel } from '@lucca-front/ng/picker';
import { ILuOptionPickerPanel } from '@lucca-front/ng/option';
import { LuOptionComparer } from '@lucca-front/ng/option';
import { ILuEstablishment } from '../../establishment.model';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { LuEstablishmentSelectInputIntl } from './establishment-select-input.intl';
import { ILuEstablishmentSelectInputLabel } from './establishment-select-input.translate';

@Component({
	selector: 'lu-establishment-select',
	templateUrl: './establishment-select-input.component.html',
	styleUrls: ['./establishment-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuEstablishmentSelectInputComponent),
			multi: true,
		},
	],
})
export class LuEstablishmentSelectInputComponent<D extends ILuEstablishment = ILuEstablishment, P extends ILuOptionPickerPanel<D> = ILuOptionPickerPanel<D>>
extends ALuSelectInputComponent<D, P>
implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit {
	byId: LuOptionComparer<D> = (option1: D, option2: D) => option1 && option2 && option1.id === option2.id;
	@Input() filters: string[];

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		@Inject(LuEstablishmentSelectInputIntl) public intl: ILuEstablishmentSelectInputLabel,
	) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
	}
	trackById(idx: number, item: ILuEstablishment): number {
		return item.id;
	}
}
