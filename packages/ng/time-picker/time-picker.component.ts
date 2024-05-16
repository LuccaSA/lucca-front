import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, model, ViewChild } from '@angular/core';
import { getIntl } from '../core/translate';
import { ISO8601Duration, ISO8601Time } from './date-primitives';
import { convertStringToIsoTime, createIsoTimeFromHoursAndMinutes, getHoursPartFromIsoTime, getMinutesPartFromIsoTime } from './date.utils';
import { isoDurationToDateFnsDuration, isoDurationToSeconds } from './duration.utils';
import { ceilToNearest, circularize, floorToNearest, roundToNearest } from './math.utils';
import { isNil, isNotNil } from './misc.utils';
import { TimePickerPartComponent } from './time-picker-part.component';
import { DEFAULT_DURATION_HOUR_DECIMAL_PIPE_FORMAT, DEFAULT_MIN_TIME, DEFAULT_TIME_DECIMAL_PIPE_FORMAT, PickerControlDirection, TimeChangeEvent } from './time-picker.model';
import { LU_TIME_PICKER_TRANSLATIONS } from './time-picker.translate';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FORM_FIELD_INSTANCE } from '../form-field/form-field.token';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'lu-time-picker',
	standalone: true,
	imports: [TimePickerPartComponent],
	templateUrl: './time-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TimePickerComponent),
			multi: true,
		},
	],
})
export class TimePickerComponent implements ControlValueAccessor {
	#formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	onChange: (value: ISO8601Time) => void;
	onTouched: () => void;

	step = input<ISO8601Duration>(null);
	value = model<ISO8601Time>('00:00:00');
	min = input<ISO8601Time>(null);
	max = input<ISO8601Time>(null);

	hideZeroValue = input(false, { transform: booleanAttribute });

	// TODO : remove isDuration when we have a proper duration picker
	isDuration = input(false, { transform: booleanAttribute });
	displayArrows = input(false, { transform: booleanAttribute });
	isReadonly = input(false, { transform: booleanAttribute });
	disabled = model(false);

	error = input<{ toString: () => string } | null>(null);

	@ViewChild('hoursPart') hoursPart?: TimePickerPartComponent;
	@ViewChild('minutesPart') minutesPart?: TimePickerPartComponent;

	protected hours = computed(() => getHoursPartFromIsoTime(this.value()));
	protected minutes = computed(() => getMinutesPartFromIsoTime(this.value()));
	protected hoursIncrement = computed(() => this.getHoursIncrement(this.step()));
	protected minutesIncrement = computed(() => this.getMinutesIncrement(this.step()));
	protected shouldHideZeroValue = computed(() => this.hideZeroValue() && this.hours() === 0 && this.minutes() === 0);
	protected pickerClass = computed(() => `timePicker ${this.isReadonly() ? 'is-readonly' : ''} ${this.displayArrows() ? 'mod-withStepperHover mod-withStepper' : ''}`);
	protected fieldsetSuffixClass = computed(() => `timePicker-fieldset-suffix ${this.shouldHideZeroValue() ? 'u-visibilityHidden' : ''}`);
	protected separator = computed(() => (this.isDuration() ? this.intl.timePickerHourSeparator : this.intl.timePickerTimeSeparator));

	protected hoursDecimalConf = computed(() => (this.isDuration() ? DEFAULT_DURATION_HOUR_DECIMAL_PIPE_FORMAT : DEFAULT_TIME_DECIMAL_PIPE_FORMAT));

	protected maxHours = computed(() => (this.isDuration() ? 24 : 23));

	protected intl = getIntl(LU_TIME_PICKER_TRANSLATIONS);

	writeValue(value: ISO8601Time): void {
		this.value.set(value || '00:00:00');
	}

	registerOnChange(fn: () => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

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

	protected hoursInputHandler(value: number): void {
		this.setTime({
			previousValue: this.value(),
			value: createIsoTimeFromHoursAndMinutes(value, this.minutes()),
			source: 'input',
		});
	}

	protected minutesInputHandler(value: number): void {
		this.setTime({
			previousValue: this.value(),
			value: createIsoTimeFromHoursAndMinutes(this.hours(), value),
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
			try {
				const value = convertStringToIsoTime(pastedValue);
				this.value.set(value);
				this.onChange?.(value);
			} catch (e) {
				// do nothing
			}
		}
	}

	private getHoursIncrement(step: ISO8601Duration | null): number {
		if (isNil(step)) {
			return 1;
		}

		const { hours } = isoDurationToDateFnsDuration(step);

		if (hours === 0) {
			return 1;
		}

		return 24 % hours === 0 ? hours : 1;
	}

	private getMinutesIncrement(step: ISO8601Duration | null): number | null {
		if (isNil(step)) {
			return 1;
		}

		const { minutes } = isoDurationToDateFnsDuration(step);

		if (minutes === 0) {
			return null;
		}

		return 60 % minutes === 0 ? minutes : 1;
	}

	private getLoopingPoint(): number {
		return isoDurationToSeconds(this.isDuration() ? 'PT24H' : 'PT23H59M59S');
	}

	private setTime(protoEvent: TimeChangeEvent): void {
		const hoursPart = getHoursPartFromIsoTime(protoEvent.value);
		const minutesPart = getMinutesPartFromIsoTime(protoEvent.value);

		const max = this.getLoopingPoint();

		const candidateTimeAsSeconds = hoursPart * 3600 + minutesPart * 60;

		const seconds = roundToNearest(circularize(candidateTimeAsSeconds, max), 60);

		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);

		const result = createIsoTimeFromHoursAndMinutes(hours, minutes);

		this.value.set(result);
		this.onChange?.(result);
	}

	protected inputControlClickHandler(part: 'hours' | 'minutes', direction: PickerControlDirection): void {
		const val = this.value() ?? DEFAULT_MIN_TIME;
		const hoursPart = getHoursPartFromIsoTime(val);
		const minutesPart = getMinutesPartFromIsoTime(val);

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

		const newTime = part === 'hours' ? createIsoTimeFromHoursAndMinutes(modifiedVal, minutesPart) : createIsoTimeFromHoursAndMinutes(hoursPart, modifiedVal);

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
