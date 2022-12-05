import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ALuDateAdapter, ELuDateGranularity } from '@lucca-front/ng/core';
import { LuInputClearerComponent, LuInputDirective, LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { LuDateAdapterPipe } from '../adapter';
import { LuDatePickerComponent } from '../picker';
import { LuDateSelectInputIntl } from './date-select-input.intl';
import { LU_DATE_SELECT_INPUT_TRANSLATIONS } from './date-select-input.token';
import { ILuDateSelectInputLabel, luDateSelectInputTranslations } from './date-select-input.translate';

@Component({
	selector: 'lu-date-select',
	templateUrl: './date-select-input.component.html',
	styleUrls: ['./date-select-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [LuDateAdapterPipe, LuDatePickerComponent, LuInputDirective, OverlayModule, LuInputClearerComponent, LuInputDisplayerDirective],
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
		{
			provide: LU_DATE_SELECT_INPUT_TRANSLATIONS,
			useValue: luDateSelectInputTranslations,
		},
		LuDateSelectInputIntl,
	],
})
export class LuDateSelectInputComponent<D> extends ALuSelectInputComponent<D> implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit, Validator {
	@Input() min?: D;
	@Input() max?: D;
	@Input() granularity: ELuDateGranularity = ELuDateGranularity.day;
	@Input('placeholder') override set inputPlaceholder(p: string) {
		this._placeholder = p;
	}
	@Input() hideClearer = false;
	@Input() startOn: D = this._adapter.forgeToday();

	get format(): string {
		switch (this.granularity) {
			case ELuDateGranularity.year:
				return this._intl.formatYear;
			case ELuDateGranularity.month:
				return this._intl.formatMonth;
			case ELuDateGranularity.day:
			default:
				return this._intl.formatDay;
		}
	}
	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
		private _adapter: ALuDateAdapter<D>,
		@Inject(LuDateSelectInputIntl) private _intl: ILuDateSelectInputLabel,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
		this.overlapInput = true;
	}

	validate(control: AbstractControl): ValidationErrors | null {
		const d = control.value as D;
		if (!d) {
			return null;
		}
		if (!this._adapter.isValid(d)) {
			return { date: true };
		}
		if (!!this.min && this._adapter.isValid(this.min) && this._adapter.compare(this.min, d, ELuDateGranularity.day) > 0) {
			return { min: true };
		}
		if (!!this.max && this._adapter.isValid(this.max) && this._adapter.compare(this.max, d, ELuDateGranularity.day) < 0) {
			return { max: true };
		}
		return null;
	}
}
