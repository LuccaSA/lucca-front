import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, inject, Input, input, LOCALE_ID, model, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { BasePickerComponent } from '../core/base-picker.component';
import { ISO8601Time } from '../core/date-primitives';
import {
	convertStringToIsoTime,
	createIsoTimeFromHoursAndMinutes,
	formatAMPM,
	getHoursDisplayPartFromIsoTime,
	getHoursPartFromIsoTime,
	getMinutesDisplayPartFromIsoTime,
	getMinutesPartFromIsoTime,
	isoTimeToSeconds,
} from '../core/date.utils';
import { isoDurationToDateFnsDuration } from '../core/duration.utils';
import { ceilToNearest, circularize, floorToNearest, roundToNearest } from '../core/math.utils';
import { isNil, isNotNil, PickerControlDirection } from '../core/misc.utils';
import { TimePickerPartComponent } from '../core/time-picker-part.component';
import { DEFAULT_MIN_TIME, DEFAULT_TIME_DECIMAL_PIPE_FORMAT, TimeChangeEvent } from './time-picker.model';
import { LU_TIME_PICKER_TRANSLATIONS } from './time-picker.translate';

@Component({
	selector: 'lu-time-picker',
	standalone: true,
	imports: [TimePickerPartComponent, NgClass, FormsModule],
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
export class TimePickerComponent extends BasePickerComponent {
	protected intl = getIntl(LU_TIME_PICKER_TRANSLATIONS);
	protected localeId = inject(LOCALE_ID);

	value = model<ISO8601Time>('--:--:--');
	max = input<ISO8601Time>(null);

	displayArrows = input(false, { transform: booleanAttribute });

	forceMeridiemDisplay = input<boolean | null>(null);

	enableMeridiemDisplay = computed(() => {
		if (this.forceMeridiemDisplay() !== null) {
			return this.forceMeridiemDisplay();
		}
		// We can't ask the API if time should include meridiem so the easiest was to just make it format a static date.
		return Intl.DateTimeFormat(this.localeId, {
			timeStyle: 'short',
			dateStyle: 'short',
		})
			.format(new Date('1/1/1 17:00:00'))
			.includes('PM');
	});

	@Input() label: string;

	timeChange = output<TimeChangeEvent>();

	protected hoursDisplay = computed(() => getHoursDisplayPartFromIsoTime(this.value(), this.enableMeridiemDisplay()));
	protected minutesDisplay = computed(() => getMinutesDisplayPartFromIsoTime(this.value()));

	protected hours = computed(() => getHoursPartFromIsoTime(this.value()));
	protected minutes = computed(() => getMinutesPartFromIsoTime(this.value()));
	protected pickerClasses = computed(() => {
		return {
			timePicker: true,
			'mod-stepper': this.displayArrows(),
			'mod-stepperHover': this.displayArrows(),
			[`mod-${this.size()}`]: Boolean(this.size()),
		};
	});
	protected separator = this.intl.timePickerTimeSeparator;

	protected hoursDecimalConf = DEFAULT_TIME_DECIMAL_PIPE_FORMAT;

	protected maxHours = computed(() => {
		if (this.enableMeridiemDisplay()) {
			return 12;
		}
		return getHoursPartFromIsoTime(this.max() ?? '23:59:59');
	});

	protected ampmDisplay = computed(() => {
		return formatAMPM(this.hours()).suffix;
	});

	writeValue(value: ISO8601Time): void {
		this.value.set(value || '––:––:––');
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	protected hoursInputHandler(value: number | '––'): void {
		this.setTime({
			previousValue: this.value(),
			// Mostly for compiler because we never set the time to –– with input handler
			value: createIsoTimeFromHoursAndMinutes(+value, this.minutes()),
			source: 'input',
		});
	}

	protected minutesInputHandler(value: number | '––'): void {
		this.setTime({
			previousValue: this.value(),
			// Mostly for compiler because we never set the time to –– with input handler
			value: createIsoTimeFromHoursAndMinutes(this.hours(), +value),
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
				this.timeChange.emit({
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

	private setTime(protoEvent: TimeChangeEvent): void {
		const hoursPart = getHoursPartFromIsoTime(protoEvent.value);
		const minutesPart = getMinutesPartFromIsoTime(protoEvent.value);

		const max = isoTimeToSeconds(this.max());

		const candidateTimeAsSeconds = hoursPart * 3600 + minutesPart * 60;

		const seconds = roundToNearest(circularize(candidateTimeAsSeconds, max), 60);

		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);

		const result = createIsoTimeFromHoursAndMinutes(hours, minutes);

		this.value.set(result);
		this.onChange?.(result);
		this.timeChange.emit({
			...protoEvent,
			value: result,
		});
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

	switchMeridiem(newValue: 'AM' | 'PM') {
		let hours = getHoursPartFromIsoTime(this.value());
		const minutes = getMinutesPartFromIsoTime(this.value());
		if (newValue === 'PM') {
			hours = circularize(hours + 12, 23);
		} else {
			hours = circularize(hours - 12, 23);
		}
		this.setTime({
			source: 'input',
			previousValue: this.value(),
			value: createIsoTimeFromHoursAndMinutes(hours, minutes),
		});
	}
}
