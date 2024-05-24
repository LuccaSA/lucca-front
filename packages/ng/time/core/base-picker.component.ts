import { ISO8601Duration, ISO8601Time } from './date-primitives';
import { computed, input, model, ViewChild } from '@angular/core';
import { TimePickerPartComponent } from './time-picker-part.component';
import { ControlValueAccessor } from '@angular/forms';

export abstract class BasePickerComponent implements ControlValueAccessor {
	onChange: (value: ISO8601Time | ISO8601Duration) => void;
	onTouched: () => void;

	step = input<ISO8601Duration>(null);

	disabled = model(false);

	size = input<'S' | 'M'>();

	@ViewChild('hoursPart')
	hoursPart?: TimePickerPartComponent;

	@ViewChild('minutesPart')
	minutesPart?: TimePickerPartComponent;

	protected hoursIncrement = computed(() => this.getHoursIncrement());
	protected minutesIncrement = computed(() => this.getMinutesIncrement());

	registerOnChange(fn: () => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	abstract writeValue(value: ISO8601Time | ISO8601Duration): void;

	abstract getHoursIncrement(): number;

	abstract getMinutesIncrement(): number;

	protected focusPart(type: 'hours' | 'minutes') {
		this.onTouched?.();
		if (type === 'hours') {
			if (this.hoursIncrement() === 0) {
				return;
			}

			this.hoursPart?.focus();
		}
		if (type === 'minutes') {
			if (this.minutesIncrement() === 0) {
				return;
			}

			this.minutesPart?.focus();
		}
	}
}
