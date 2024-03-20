import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, ViewChild, inject } from '@angular/core';
import { map } from 'rxjs';
import { getIntl } from '../core/translate';
import { ISO8601Duration, ISO8601Time } from './date-primitives';
import { convertStringToIsoTime, createIsoTimeFromHoursAndMinutes, getHoursPartFromIsoTime, getMinutesPartFromIsoTime } from './date.utils';
import { isoDurationToDateFnsDuration, isoDurationToSeconds } from './duration.utils';
import { ceilToNearest, circularize, floorToNearest, roundToNearest } from './math.utils';
import { isNil, isNotNil } from './misc.utils';
import { TimePickerPartComponent } from './time-picker-part.component';
import { DEFAULT_DURATION_HOUR_DECIMAL_PIPE_FORMAT, DEFAULT_MIN_TIME, DEFAULT_TIME_DECIMAL_PIPE_FORMAT, PickerControlDirection, TimeChangeEvent } from './time-picker.model';
import { LU_TIME_PICKER_TRANSLATIONS } from './time-picker.translate';

@Component({
	selector: 'lu-time-picker',
	standalone: true,
	imports: [CommonModule, TimePickerPartComponent],
	templateUrl: './time-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent implements OnChanges {
	@Input() step: ISO8601Duration | null = null;
	@Input() value: ISO8601Time | null = null;
	@Input() min: ISO8601Time | null = null;
	@Input() max: ISO8601Time | null = null;

	@Input() hideZeroValue = false;

	// TODO : remove isDuration when we have a proper duration picker
	@Input() isDuration = false;
	@Input() displayArrows = false;
	@Input() isReadonly = false;
	@Input() error: { toString: () => string } | null = null;
	@Output() timeChange = new EventEmitter<TimeChangeEvent>();
	@Output() valueChange = this.timeChange.pipe(map((event) => event.value));
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() blur = new EventEmitter<void>();

	@ViewChild('hoursPart') hoursPart?: TimePickerPartComponent;
	@ViewChild('minutesPart') minutesPart?: TimePickerPartComponent;

	protected hours = 0;

	protected minutes = 0;
	protected hoursIncrement = 1;
	protected minutesIncrement: number | null = 1; // minutes increment can be null if step is >= 1 hour
	protected pickerClass = '';
	protected fieldsetSuffixClass = '';
	protected separator = '';
	protected shouldHideZeroValue = false;
	protected timePickerButtonClass = '';

	@HostBinding('attr.aria-invalid')
	protected hasError = false;

	protected hoursDecimalConf = '';

	protected maxHours = 23;

	protected focusedPart: 'hours' | 'minutes' = 'hours';

	private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	protected intl = getIntl(LU_TIME_PICKER_TRANSLATIONS);

	// TODO refacto with signals
	ngOnChanges(): void {
		const timeToSplit = this.value === null ? DEFAULT_MIN_TIME : this.value;
		this.hours = getHoursPartFromIsoTime(timeToSplit);
		this.minutes = getMinutesPartFromIsoTime(timeToSplit);

		this.hoursIncrement = this.getHoursIncrement(this.step);
		this.minutesIncrement = this.getMinutesIncrement(this.step);

		this.shouldHideZeroValue = this.hideZeroValue && this.hours === 0 && this.minutes === 0;

		this.fieldsetSuffixClass = `timePicker-fieldset-suffix ${this.shouldHideZeroValue ? 'u-visibilityHidden' : ''}`;

		this.hasError = this.error !== null;
		this.pickerClass = `timePicker ${this.isReadonly ? 'is-readonly' : ''} ${this.displayArrows ? 'mod-withArrowHoverVisible mod-withArrow' : ''} ${this.hasError ? 'palette-error' : ''}`;

		this.separator = this.isDuration ? this.intl.timePickerHourSeparator : this.intl.timePickerTimeSeparator;

		this.hoursDecimalConf = this.isDuration ? DEFAULT_DURATION_HOUR_DECIMAL_PIPE_FORMAT : DEFAULT_TIME_DECIMAL_PIPE_FORMAT;

		this.maxHours = this.isDuration ? 24 : 23;
		this.timePickerButtonClass = `timePicker is-button" ${this.hasError ? 'mod-conflict' : ''}`;
	}

	protected focusPart(type: 'hours' | 'minutes') {
		if (type === 'hours') {
			if (this.hoursIncrement === 0) {
				return;
			}

			this.focusedPart = 'hours';
			this.hoursPart?.focus();
		}
		if (type === 'minutes') {
			if (this.minutesIncrement === 0) {
				return;
			}

			this.focusedPart = 'minutes';
			this.minutesPart?.focus();
		}
	}

	protected hoursInputHandler(value: number): void {
		this.setTime({
			previousValue: this.value,
			value: createIsoTimeFromHoursAndMinutes(value, this.minutes),
			source: 'input',
		});
	}

	protected minutesInputHandler(value: number): void {
		this.setTime({
			previousValue: this.value,
			value: createIsoTimeFromHoursAndMinutes(this.hours, value),
			source: 'input',
		});
	}

	protected focusoutHandler(event: FocusEvent): void {
		if (event.relatedTarget !== null && event.relatedTarget instanceof HTMLElement && this.elementRef.nativeElement.contains(event.relatedTarget)) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		this.focusedPart = 'hours';
		this.blur.emit();
	}

	protected copyHandler(event: ClipboardEvent): void {
		event.preventDefault();
		// write value to clipboard
		const value = this.value;
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
				const previousValue = this.value;
				this.value = value;
				this.ngOnChanges(); // TODO refacto signals
				this.timeChange.emit({
					previousValue,
					source: 'paste',
					value,
				});
			} catch (e) {
				// do nothing
			}
		}
	}

	protected clickHandler(event: MouseEvent): void {
		if (event.target === event.currentTarget && isNotNil(this.hoursPart)) {
			this.focusPart('hours');
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
		return isoDurationToSeconds(this.isDuration ? 'PT24H' : 'PT23H59M59S');
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

		this.value = result;
		this.ngOnChanges(); // TODO refacto signals
		this.timeChange.emit({
			...protoEvent,
			value: result,
		});
	}

	protected inputControlClickHandler(part: 'hours' | 'minutes', direction: PickerControlDirection): void {
		const val = this.value ?? DEFAULT_MIN_TIME;
		const hoursPart = getHoursPartFromIsoTime(val);
		const minutesPart = getMinutesPartFromIsoTime(val);

		const selectedPart = part === 'hours' ? hoursPart : minutesPart;
		const selectedIncrement = part === 'hours' ? this.hoursIncrement : this.minutesIncrement;
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
			previousValue: this.value,
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
