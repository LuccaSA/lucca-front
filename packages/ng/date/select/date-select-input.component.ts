import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, input, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ClearComponent } from '@lucca-front/ng/clear';
import { ALuDateAdapter, ELuDateGranularity, LuDateGranularity, syncInputSignal } from '@lucca-front/ng/core';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { ILuInputWithPicker } from '@lucca-front/ng/picker';
import { ALuSelectInputComponent } from '@lucca-front/ng/select';
import { LuDateAdapterPipe } from '../adapter';
import { LuDatePickerComponent } from '../picker';

@Component({
	selector: 'lu-date-select',
	templateUrl: './date-select-input.component.html',
	styleUrl: './date-select-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuDateAdapterPipe, LuDatePickerComponent, OverlayModule, ClearComponent, LuInputDisplayerDirective],
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
export class LuDateSelectInputComponent<D> extends ALuSelectInputComponent<D> implements ControlValueAccessor, ILuInputWithPicker<D>, AfterViewInit, Validator {
	readonly min = input<D>();

	readonly max = input<D>();

	readonly granularity = input<LuDateGranularity>(ELuDateGranularity.day);

	@Input('placeholder') override set inputPlaceholder(p: string) {
		this._placeholder = p;
	}

	readonly hideClearer = input<boolean>(false);

	readonly startOn = input<D>();

	protected _startOn: D = this._adapter.forgeToday();

	get format(): string {
		switch (this.granularity()) {
			case ELuDateGranularity.year:
				return 'y';
			case ELuDateGranularity.month:
				return 'MM/y';
			case ELuDateGranularity.day:
			default:
				return 'shortDate';
		}
	}

	constructor(
		protected override _changeDetectorRef: ChangeDetectorRef,
		protected override _overlay: Overlay,
		protected override _elementRef: ElementRef<HTMLElement>,
		protected override _viewContainerRef: ViewContainerRef,
		protected override _renderer: Renderer2,
		private _adapter: ALuDateAdapter<D>,
	) {
		super(_changeDetectorRef, _overlay, _elementRef, _viewContainerRef, _renderer);
		this.overlapInput = true;

		syncInputSignal(this.startOn, (s) => {
			this._startOn = s ?? this._adapter.forgeToday();
		});
	}

	validate(control: AbstractControl): ValidationErrors | null {
		const d = control.value as D;
		if (!d) {
			return null;
		}
		if (!this._adapter.isValid(d)) {
			return { date: true };
		}
		const min = this.min();
		if (!!min && this._adapter.isValid(min) && this._adapter.compare(min, d, ELuDateGranularity.day) > 0) {
			return { min: true };
		}
		const max = this.max();
		if (!!max && this._adapter.isValid(max) && this._adapter.compare(max, d, ELuDateGranularity.day) < 0) {
			return { max: true };
		}
		return null;
	}
}
