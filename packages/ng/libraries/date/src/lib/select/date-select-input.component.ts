import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	forwardRef,
	ViewContainerRef,
	ElementRef,
	ViewChild,
	Input,
	Renderer2,
	AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ILuInputWithPicker, ALuPickerPanel, ILuPickerPanel } from '@lucca-front/ng/picker';
import { ALuClearer, ILuClearer, ILuInputDisplayer, ALuInputDisplayer } from '@lucca-front/ng/input';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { ALuDateAdapter, ELuDateGranularity } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-date-select',
	templateUrl: './date-select-input.component.html',
	styleUrls: ['./date-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDateSelectInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: LuDateSelectInputComponent,
			multi: true,
		},
	],
})
export class LuDateSelectInputComponent<D>
extends ALuSelectInputComponent<D>
implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit, Validator {
	@Input() min?: D;
	@Input() max?: D;
	@Input('placeholder') set inputPlaceholder(p: string) { this._placeholder = p; }
	overlapInput = true;
	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _overlay: Overlay,
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _renderer: Renderer2,
		private _adapter: ALuDateAdapter<D>,
		) {
		super(
			_changeDetectorRef,
			_overlay,
			_elementRef,
			_viewContainerRef,
			_renderer,
		);
	}

	@ViewChild(ALuPickerPanel, { static: true }) set _vcPicker(picker: ILuPickerPanel<D>) {
		if (!picker) { return; }
		this._picker = picker;
	}
	@ViewChild(ALuClearer, { static: true }) set _vcClearer(clearer: ILuClearer) {
		if (!clearer) { return; }
		this._clearer = clearer;
	}
	@ViewChild(ALuInputDisplayer, { static: true }) set _vcDisplayer(displayer: ILuInputDisplayer<D>) {
		if (!displayer) { return; }
		this.displayer = displayer;
	}
	validate(control: AbstractControl): ValidationErrors | null {
		const d = control.value;
		if (!d) { return null; }
		if (!this._adapter.isValid(d)) { return { 'date': true }; }
		if (!!this.min && this._adapter.isValid(this.min) && this._adapter.compare(this.min, d, ELuDateGranularity.day) > 0) {
			return { 'min': true };
		}
		if (!!this.max && this._adapter.isValid(this.max) && this._adapter.compare(this.max, d, ELuDateGranularity.day) < 0) {
			return { 'max': true };
		}
		return null;
	}
}
