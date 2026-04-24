import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, inject, Injector, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { intlInputOptions, isNil } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca/prisme/icon';
import { ISO8601Duration, ISO8601Time } from '../core/date-primitives';
import { isValidTimeRangePicker, MAX_TIME } from '../core/duration.utils';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { TimeRangePickerRange } from './time-range-picker';
import { LU_TIME_RANGE_PICKER_INSTANCE } from './time-range-picker.token';
import { LU_TIME_RANGE_PICKER_TRANSLATIONS } from './time-range-picker.translate';
import { TimeRangePickerSize } from './time-range-picker.type';

@Component({
	selector: 'lu-time-range-picker',
	templateUrl: './time-range-picker.component.html',
	styleUrl: './time-range-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, TimePickerComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TimeRangePickerComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => TimeRangePickerComponent),
			multi: true,
		},
		{
			provide: LU_TIME_RANGE_PICKER_INSTANCE,
			useExisting: forwardRef(() => TimeRangePickerComponent),
		},
	],
})
export class TimeRangePickerComponent implements ControlValueAccessor, OnInit, Validator {
	#injector = inject(Injector);
	#ngControl: NgControl; // Initialized in ngOnInit

	#onChange?: (value: TimeRangePickerRange | null) => void;
	#onTouched?: () => void;

	readonly value = signal<TimeRangePickerRange | null>(null);

	readonly intl = input(...intlInputOptions(LU_TIME_RANGE_PICKER_TRANSLATIONS));

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

	validate(control: AbstractControl<TimeRangePickerRange | null>): ValidationErrors | null {
		if (isNil(control.value)) {
			return null;
		}
		return !isValidTimeRangePicker(control.value) ? { time: true } : null;
	}

	writeValue(value: TimeRangePickerRange | null): void {
		if (this.#ngControl instanceof NgModel && isNil(this.#onChange)) {
			// avoid phantom call for ngModel
			// https://github.com/angular/angular/issues/14988#issuecomment-1310420293
			return;
		}
		this.value.set(value ?? null);
	}

	registerOnChange(fn: (value: TimeRangePickerRange | null) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.#onTouched = fn;
	}

	onStartChange(start: ISO8601Time): void {
		const newValue: TimeRangePickerRange = {
			start,
			end: this.value()?.end,
		};
		this.value.set(newValue);
		this.#onChange?.(newValue);
	}

	onEndChange(end: ISO8601Time): void {
		const newValue: TimeRangePickerRange = {
			start: this.value()?.start,
			end,
		};
		this.value.set(newValue);
		this.#onChange?.(newValue);
	}

	onTouched(): void {
		this.#onTouched?.();
	}

	partToFocus(): 'meridiem' | 'minutes' {
		return this.forceMeridiemDisplay() ? 'meridiem' : 'minutes';
	}
}
