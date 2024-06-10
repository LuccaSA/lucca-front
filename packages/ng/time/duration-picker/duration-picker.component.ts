import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, Input, input, model, output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { BasePickerComponent } from '../core/base-picker.component';
import { ISO8601Duration } from '../core/date-primitives';
import { createDurationFromHoursAndMinutes, getHoursPartFromDuration, getMinutesPartFromDuration, isISO8601Duration, isoDurationToDateFnsDuration, isoDurationToSeconds } from '../core/duration.utils';
import { ceilToNearest, circularize, floorToNearest, roundToNearest } from '../core/math.utils';
import { isNil, isNotNil, PickerControlDirection } from '../core/misc.utils';
import { TimePickerPartComponent } from '../core/time-picker-part.component';
import { DEFAULT_TIME_DECIMAL_PIPE_FORMAT, DurationChangeEvent } from './duration-picker.model';
import { LU_DURATION_PICKER_TRANSLATIONS } from './duration-picker.translate';

@Component({
	selector: 'lu-duration-picker',
	standalone: true,
	imports: [TimePickerPartComponent, NgClass],
	templateUrl: './duration-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DurationPickerComponent),
			multi: true,
		},
	],
})
export class DurationPickerComponent extends BasePickerComponent {
	protected intl = getIntl(LU_DURATION_PICKER_TRANSLATIONS);

	value = model<ISO8601Duration>('PT0S');
	max = input<ISO8601Duration>('PT99H');

	displayArrows = input(false, { transform: booleanAttribute });

	@Input() label: string;

	hideZeroValue = input(false, { transform: booleanAttribute });

	durationChange = output<DurationChangeEvent>();

	protected hours = computed(() => getHoursPartFromDuration(this.value()));
	protected minutes = computed(() => getMinutesPartFromDuration(this.value()));
	protected shouldHideValue = computed(() => this.hideZeroValue() && this.hours() === 0 && this.minutes() === 0);

	protected pickerClasses = computed(() => {
		return {
			timePicker: true,
			'mod-stepper': this.displayArrows(),
			'mod-stepperHover': this.displayArrows(),
			[`mod-${this.size()}`]: Boolean(this.size()),
		};
	});
	protected fieldsetSuffixClasses = computed(() => {
		return {
			'timePicker-fieldset-groupSeparator': true,
			'u-visibilityHidden': this.shouldHideValue(),
		};
	});
	protected separator = this.intl.timePickerTimeSeparator;

	protected hoursDecimalConf = DEFAULT_TIME_DECIMAL_PIPE_FORMAT;

	writeValue(value: ISO8601Duration): void {
		this.value.set(value || 'PT0S');
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	protected hoursInputHandler(value: number): void {
		this.setTime({
			previousValue: this.value(),
			value: createDurationFromHoursAndMinutes(value, this.minutes()),
			source: 'input',
		});
	}

	protected minutesInputHandler(value: number): void {
		this.setTime({
			previousValue: this.value(),
			value: createDurationFromHoursAndMinutes(this.hours(), value),
			source: 'input',
		});
	}

	protected copyHandler(event: ClipboardEvent): void {
		event.preventDefault();
		// write value to clipboard
		const value = this.value();
		if (isNotNil(value)) {
			event.clipboardData?.setData('text/plain', value);
		}
	}

	protected pasteHandler(event: ClipboardEvent): void {
		event.preventDefault();
		const pastedValue = event.clipboardData?.getData('text/plain');
		if (isNotNil(pastedValue)) {
			let value: ISO8601Duration;
			// If it's an iso duration, handle as-is
			if (isISO8601Duration(pastedValue)) {
				value = pastedValue;
			}
			if (/\d?\dh\d\d/.test(pastedValue)) {
				const split = pastedValue.split('h');
				value = createDurationFromHoursAndMinutes(+split[0], +split[1]);
			}
			if (/\d?\d:\d\d/.test(pastedValue)) {
				const split = pastedValue.split(':');
				value = createDurationFromHoursAndMinutes(+split[0], +split[1]);
			}
			if (value) {
				this.durationChange.emit({
					previousValue: this.value(),
					source: 'paste',
					value,
				});
				this.value.set(value);
				this.onChange?.(value);
			}
		}
	}

	override getHoursIncrement(): number {
		const step = this.step();
		if (isNil(step)) {
			return 1;
		}

		const { hours } = isoDurationToDateFnsDuration(step);

		if (hours === 0) {
			return 1;
		}

		return 24 % hours === 0 ? hours : 1;
	}

	override getMinutesIncrement(): number | null {
		const step = this.step();
		if (isNil(step)) {
			return 1;
		}

		const { minutes } = isoDurationToDateFnsDuration(step);

		if (minutes === 0) {
			return null;
		}

		return 60 % minutes === 0 ? minutes : 1;
	}

	private setTime(protoEvent: DurationChangeEvent): void {
		let hoursPart = getHoursPartFromDuration(protoEvent.value);
		const minutesPart = getMinutesPartFromDuration(protoEvent.value);

		if (hoursPart < 0) {
			hoursPart = getHoursPartFromDuration(this.max());
			if (isoDurationToSeconds(createDurationFromHoursAndMinutes(hoursPart, minutesPart)) > isoDurationToSeconds(this.max())) {
				// If current value with minutes is > max, decrement hours again
				hoursPart--;
			}
		} else if (hoursPart > getHoursPartFromDuration(this.max())) {
			hoursPart = 0;
		}

		const max = isoDurationToSeconds(this.max());

		const candidateTimeAsSeconds = hoursPart * 3600 + minutesPart * 60;

		const seconds = roundToNearest(circularize(candidateTimeAsSeconds, max), 60);

		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);

		const result = createDurationFromHoursAndMinutes(hours, minutes);

		this.value.set(result);
		this.onChange?.(result);
		this.durationChange.emit({
			...protoEvent,
			value: result,
		});
	}

	protected inputControlClickHandler(part: 'hours' | 'minutes', direction: PickerControlDirection): void {
		const val = this.value() ?? 'PT0S';
		const hoursPart = getHoursPartFromDuration(val);
		const minutesPart = getMinutesPartFromDuration(val);

		const selectedPart = part === 'hours' ? hoursPart : minutesPart;
		const selectedIncrement = part === 'hours' ? this.hoursIncrement() : this.minutesIncrement();
		let modifiedVal: number;

		if (selectedIncrement === null) {
			return;
		}

		if (direction === 'up') {
			modifiedVal = floorToNearest(selectedPart + selectedIncrement, selectedIncrement);
		} else {
			modifiedVal = ceilToNearest(selectedPart - selectedIncrement, selectedIncrement);
		}

		const newTime = part === 'hours' ? createDurationFromHoursAndMinutes(modifiedVal, minutesPart) : createDurationFromHoursAndMinutes(hoursPart, modifiedVal);

		this.setTime({
			source: 'control',
			previousValue: this.value(),
			value: newTime,
			part,
			direction,
		});
	}

	public focus() {
		if (isNotNil(this.hoursPart)) {
			this.focusPart('hours');
		}
	}
}
