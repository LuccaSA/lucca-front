import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, inject, Injector, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { intlInputOptions, isNil } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca/prisme/icon';
import { ISO8601Duration, ISO8601Time } from '../core/date-primitives';
import { isValidTimePickerRange, MAX_TIME } from '../core/duration.utils';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { TimePickerRange } from './time-picker-range';
import { LU_TIME_PICKER_RANGE_TRANSLATIONS } from './time-picker-range.translate';
import { TimeRangePickerSize } from './time-picker-range.type';

@Component({
	selector: 'lu-time-picker-range',
	templateUrl: './time-picker-range.component.html',
	styleUrl: './time-picker-range.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, TimePickerComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TimePickerRangeComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => TimePickerRangeComponent),
			multi: true,
		},
	],
})
export class TimePickerRangeComponent implements ControlValueAccessor, OnInit, Validator {
	#injector = inject(Injector);
	#ngControl: NgControl; // Initialized in ngOnInit

	#onChange?: (value: TimePickerRange | null) => void;
	#onTouched?: () => void;

	readonly value = signal<TimePickerRange | null>(null);

	readonly intl = input(...intlInputOptions(LU_TIME_PICKER_RANGE_TRANSLATIONS));

	readonly label = input<string>('');

	readonly displayArrows = input(false, { transform: booleanAttribute });

	readonly forceMeridiemDisplay = input(false, { transform: booleanAttribute });

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly size = input<TimeRangePickerSize>();

	readonly max = input<ISO8601Time>(MAX_TIME);

	readonly step = input<ISO8601Duration | null>(null);

	readonly startValue = computed(() => this.value()?.start ?? '––:––:––');
	readonly endValue = computed(() => this.value()?.end ?? '––:––:––');

	ngOnInit() {
		this.#ngControl = this.#injector.get(NgControl);
	}

	validate(control: AbstractControl<TimePickerRange | null>): ValidationErrors | null {
		if (isNil(control.value)) {
			return null;
		}
		return !isValidTimePickerRange(control.value) ? { time: true } : null;
	}

	writeValue(value: TimePickerRange | null): void {
		if (this.#ngControl instanceof NgModel && isNil(this.#onChange)) {
			// avoid phantom call for ngModel
			// https://github.com/angular/angular/issues/14988#issuecomment-1310420293
			return;
		}
		this.value.set(value ?? null);
	}

	registerOnChange(fn: (value: TimePickerRange | null) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.#onTouched = fn;
	}

	onStartChange(start: ISO8601Time): void {
		const newValue: TimePickerRange = {
			start,
			end: this.value()?.end,
		};
		this.value.set(newValue);
		this.#onChange?.(newValue);
	}

	onEndChange(end: ISO8601Time): void {
		const newValue: TimePickerRange = {
			start: this.value()?.start,
			end,
		};
		this.value.set(newValue);
		this.#onChange?.(newValue);
	}

	onTouched(): void {
		this.#onTouched?.();
	}
}
