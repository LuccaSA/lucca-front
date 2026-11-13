import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { intlInputOptions, isNil, isNotNil, luBooleanAttribute } from '@lucca-front/ng/core';
import { BasePickerComponent } from '../core/base-picker.component';
import { ISO8601Duration } from '../core/date-primitives';
import {
	createDurationFromHoursAndMinutes,
	createDurationFromMilliDays,
	getDecimalsFromMilliDays,
	getHoursPartFromDuration,
	getMinutesPartFromDuration,
	isISO8601Duration,
	isoDurationToDateFnsDuration,
	isoDurationToMilliDays,
	isoDurationToSeconds,
	MILLI_DAYS_IN_DAY,
} from '../core/duration.utils';
import { ceilToNearest, circularize, floorToNearest, roundToNearest } from '../core/math.utils';

import { PickerControlDirection } from '../core/misc.utils';
import { TimePickerPartComponent } from '../core/time-picker-part.component';
import { DurationDaysPartComponent } from './duration-days-part.component';
import { DEFAULT_MAX_DAYS, DEFAULT_MAX_HOURS_MINUTES, DEFAULT_TIME_DECIMAL_PIPE_FORMAT, DurationChangeEvent, DurationChangeOrigin, DurationPickerUnit } from './duration-picker.model';
import { LU_DURATION_PICKER_TRANSLATIONS } from './duration-picker.translate';

@Component({
	selector: 'lu-duration-picker',
	imports: [TimePickerPartComponent, DurationDaysPartComponent],
	templateUrl: './duration-picker.component.html',
	styleUrl: './duration-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DurationPickerComponent),
			multi: true,
		},
	],
})
export class DurationPickerComponent extends BasePickerComponent {
	readonly intl = input(...intlInputOptions(LU_DURATION_PICKER_TRANSLATIONS));

	readonly value = model<ISO8601Duration>('PT0S');

	/**
	 * Defines a maximum value. Defaults to `PT99H` in `hoursMinutes` unit, to `P99D` in `days` unit.
	 */
	readonly max = input<ISO8601Duration>();

	/**
	 * Switches the picker between an hours/minutes field and a single field counting days.
	 */
	readonly unit = input<DurationPickerUnit>('hoursMinutes');

	readonly displayArrows = input(false, { transform: luBooleanAttribute });

	readonly label = input<string>();

	readonly hideZeroValue = input(false, { transform: luBooleanAttribute });

	readonly durationChange = output<DurationChangeEvent>();

	readonly keyPressed = signal(false);

	readonly daysPart = viewChild<DurationDaysPartComponent>('daysPart');

	/**
	 * Owned by the picker rather than by each part: the parts live in a conditional view, so they are
	 * not resolved yet when `writeValue` runs.
	 */
	protected readonly isValueSet = signal(false);

	protected readonly isDaysUnit = computed(() => this.unit() === 'days');

	protected readonly resolvedMax = computed(() => this.max() ?? (this.isDaysUnit() ? DEFAULT_MAX_DAYS : DEFAULT_MAX_HOURS_MINUTES));

	protected readonly hours = computed(() => getHoursPartFromDuration(this.value()));
	protected readonly minutes = computed(() => getMinutesPartFromDuration(this.value()));

	/**
	 * The `days` unit computes everything in milli-days (1/1000 of a day), so that every supported
	 * step stays an integer and the value is free of float drift.
	 */
	protected readonly milliDays = computed(() => isoDurationToMilliDays(this.value()));
	protected readonly days = computed(() => this.milliDays() / MILLI_DAYS_IN_DAY);
	protected readonly maxInMilliDays = computed(() => isoDurationToMilliDays(this.resolvedMax()));
	protected readonly stepInMilliDays = computed(() => {
		const step = this.step();
		const milliDays = isNil(step) ? 0 : isoDurationToMilliDays(step);

		return milliDays > 0 ? milliDays : MILLI_DAYS_IN_DAY;
	});
	protected readonly daysDecimals = computed(() => getDecimalsFromMilliDays(this.stepInMilliDays()));

	protected readonly shouldHideValue = computed(() => this.hideZeroValue() && (this.isDaysUnit() ? this.milliDays() === 0 : this.hours() === 0 && this.minutes() === 0));

	protected readonly maxDigits = computed(() => {
		if (this.isDaysUnit()) {
			return Math.floor(this.maxInMilliDays() / MILLI_DAYS_IN_DAY).toString().length;
		}

		const maxISO = isoDurationToSeconds(this.resolvedMax());
		const maxHour = maxISO / 3600;
		const maxHourDigits = maxHour.toString().length;
		return maxHourDigits;
	});

	protected readonly pickerClasses = computed(() => {
		return {
			timePicker: true,
			'mod-stepper': this.displayArrows(),
			'mod-stepperHover': this.displayArrows(),
			[`mod-${this.size()}`]: Boolean(this.size()),
			'pr-u-animatedShake': this.keyPressed(),
		};
	});
	protected readonly fieldsetSuffixClasses = computed(() => {
		return {
			'timePicker-fieldset-groupSeparator': true,
			'pr-u-visibilityHidden': this.shouldHideValue(),
		};
	});
	protected readonly unitSuffixClasses = computed(() => {
		return {
			'timePicker-fieldset-unit': true,
			'pr-u-visibilityHidden': this.shouldHideValue(),
		};
	});
	protected readonly separator = computed(() => this.intl().timePickerTimeSeparator);

	protected hoursDecimalConf = DEFAULT_TIME_DECIMAL_PIPE_FORMAT;

	writeValue(value: ISO8601Duration): void {
		this.value.set(value || (this.isDaysUnit() ? 'P0D' : 'PT0S'));
		if (value) {
			this.isValueSet.set(true);
		}
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	protected hoursInputHandler(value: number | '––'): void {
		this.setTime({
			previousValue: this.value(),
			value: createDurationFromHoursAndMinutes(+value, this.minutes()),
			source: 'input',
		});
	}

	protected minutesInputHandler(value: number | '––'): void {
		this.setTime({
			previousValue: this.value(),
			value: createDurationFromHoursAndMinutes(this.hours(), +value),
			source: 'input',
		});
	}

	protected daysInputHandler(days: number): void {
		this.setDays(Math.round(days * MILLI_DAYS_IN_DAY), { source: 'input' });
	}

	protected daysControlHandler(direction: PickerControlDirection): void {
		const step = this.stepInMilliDays();
		const current = this.milliDays();
		const milliDays = direction === 'up' ? floorToNearest(current + step, step) : ceilToNearest(current - step, step);

		this.setDays(milliDays, { source: 'control', part: 'days', direction });
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
		let value: ISO8601Duration | null = null;
		event.preventDefault();
		const pastedValue = event.clipboardData?.getData('text/plain');
		if (isNotNil(pastedValue)) {
			if (this.isDaysUnit()) {
				this.pasteDays(pastedValue);
				return;
			}
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

	private pasteDays(pastedValue: string): void {
		if (isISO8601Duration(pastedValue)) {
			this.setDays(isoDurationToMilliDays(pastedValue), { source: 'paste' });
			return;
		}

		if (/^\d+([.,]\d+)?$/.test(pastedValue)) {
			this.setDays(Math.round(Number.parseFloat(pastedValue.replace(',', '.')) * MILLI_DAYS_IN_DAY), { source: 'paste' });
		}
	}

	/**
	 * Unlike the hours/minutes unit, which wraps around `max`, a number of days is clamped between 0 and `max`.
	 */
	private setDays(milliDays: number, origin: DurationChangeOrigin): void {
		const previousValue = this.value();
		const result = createDurationFromMilliDays(Math.min(Math.max(milliDays, 0), this.maxInMilliDays()));

		this.isValueSet.set(true);

		this.value.set(result);
		this.onChange?.(result);
		this.durationChange.emit({
			...origin,
			previousValue,
			value: result,
		});
	}

	private setTime(protoEvent: DurationChangeEvent): void {
		let hoursPart = getHoursPartFromDuration(protoEvent.value);
		const minutesPart = getMinutesPartFromDuration(protoEvent.value);

		this.isValueSet.set(true);

		if (hoursPart < 0) {
			if (hoursPart === -1) {
				hoursPart = getHoursPartFromDuration(this.resolvedMax());
			}
			if (isoDurationToSeconds(createDurationFromHoursAndMinutes(hoursPart, minutesPart)) > isoDurationToSeconds(this.resolvedMax())) {
				// If current value with minutes is > max, decrement hours again
				hoursPart--;
			}
		} else if (hoursPart > getHoursPartFromDuration(this.resolvedMax())) {
			hoursPart = 0;
		}

		const max = isoDurationToSeconds(this.resolvedMax());

		const candidateTimeAsSeconds = hoursPart * 3600 + minutesPart * 60;

		const seconds = roundToNearest(circularize(candidateTimeAsSeconds, max), 60);

		const minutes = Math.floor((seconds % 3600) / 60);

		const result = createDurationFromHoursAndMinutes(hoursPart, minutes);

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

	protected focusDays(): void {
		this.onTouched?.();
		this.daysPart()?.focus();
	}

	public focus() {
		if (this.isDaysUnit()) {
			this.focusDays();
			return;
		}

		if (isNotNil(this.hoursPart)) {
			this.focusPart('hours');
		}
	}
}
