import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, model, output } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ISO8601Duration } from '../core/date-primitives';
import { createDurationFromHoursAndMinutes, getHoursPartFromDuration, getMinutesPartFromDuration, isoDurationToDateFnsDuration, isoDurationToSeconds } from '../core/duration.utils';
import { ceilToNearest, circularize, floorToNearest, roundToNearest } from '../core/math.utils';
import { isNil, isNotNil, PickerControlDirection } from '../core/misc.utils';
import { TimePickerPartComponent } from '../core/time-picker-part.component';
import { DEFAULT_TIME_DECIMAL_PIPE_FORMAT, DurationChangeEvent } from './duration-picker.model';
import { LU_DURATION_PICKER_TRANSLATIONS } from './duration-picker.translate';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BasePickerComponent } from '../core/base-picker.component';
import { FORM_FIELD_INSTANCE } from '@lucca-front/ng/form-field';

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
	#formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	protected intl = getIntl(LU_DURATION_PICKER_TRANSLATIONS);

	value = model<ISO8601Duration>('PT0S');
	min = input<ISO8601Duration>('P0S');
	max = input<ISO8601Duration>('P9999D');

	loopingPoint = input<ISO8601Duration>('P9999D');

	hideZeroValue = input(false, { transform: booleanAttribute });

	durationChange = output<DurationChangeEvent>();

	protected hours = computed(() => getHoursPartFromDuration(this.value()));
	protected minutes = computed(() => getMinutesPartFromDuration(this.value()));
	protected shouldHideValue = computed(() => this.hideZeroValue() && this.hours() === 0 && this.minutes() === 0);
	protected fieldsetSuffixClasses = computed(() => {
		return {
			'timePicker-fieldset-suffix': true,
			'u-visibilityHidden': this.shouldHideValue(),
		};
	});
	protected separator = this.intl.timePickerTimeSeparator;

	protected hoursDecimalConf = DEFAULT_TIME_DECIMAL_PIPE_FORMAT;

	constructor() {
		super();
		if (this.#formFieldRef) {
			this.#formFieldRef.layout = 'fieldset';
		}
	}

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
			try {
				const value = pastedValue as ISO8601Duration;
				this.durationChange.emit({
					previousValue: this.value(),
					source: 'paste',
					value,
				});
				this.value.set(value);
				this.onChange?.(value);
			} catch (e) {
				// do nothing
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
		const hoursPart = getHoursPartFromDuration(protoEvent.value);
		const minutesPart = getMinutesPartFromDuration(protoEvent.value);

		const max = isoDurationToSeconds(this.loopingPoint());

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
