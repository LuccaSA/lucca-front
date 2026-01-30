import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, inject, input, LOCALE_ID, model, output, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl, isNil, isNotNil } from '@lucca-front/ng/core';
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
import { PickerControlDirection } from '../core/misc.utils';
import { TimePickerPartComponent } from '../core/time-picker-part.component';
import { DEFAULT_MIN_TIME, DEFAULT_TIME_DECIMAL_PIPE_FORMAT, TimeChangeEvent } from './time-picker.model';
import { LU_TIME_PICKER_TRANSLATIONS } from './time-picker.translate';

const MAX_TIME = '23:59:59';
let nextId = 0;

@Component({
	selector: 'lu-time-picker',
	imports: [TimePickerPartComponent, FormsModule],
	templateUrl: './time-picker.component.html',
	styleUrl: './time-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
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

	readonly idSuffix = nextId++;

	readonly anteMeridiemRef = viewChild<ElementRef<HTMLInputElement>>('anteMeridiemRef');

	readonly postMeridiemRef = viewChild<ElementRef<HTMLInputElement>>('postMeridiemRef');

	value = model<ISO8601Time>('--:--:--');
	readonly max = input<ISO8601Time>(MAX_TIME);

	readonly displayArrows = input(false, { transform: booleanAttribute });

	readonly forceMeridiemDisplay = input<boolean | null>(null);

	readonly enableMeridiemDisplay = computed(() => {
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

	readonly label = input<string>();

	readonly timeChange = output<TimeChangeEvent>();

	protected readonly hoursDisplay = computed(() => getHoursDisplayPartFromIsoTime(this.value(), this.enableMeridiemDisplay()));
	protected readonly minutesDisplay = computed(() => getMinutesDisplayPartFromIsoTime(this.value()));

	protected readonly hours = computed(() => getHoursPartFromIsoTime(this.value()));
	protected readonly minutes = computed(() => getMinutesPartFromIsoTime(this.value()));
	protected readonly pickerClasses = computed(() => {
		return {
			timePicker: true,
			'mod-stepper': this.displayArrows(),
			'mod-stepperHover': this.displayArrows(),
			[`mod-${this.size()}`]: Boolean(this.size()),
		};
	});
	protected separator = this.intl.timePickerTimeSeparator;

	protected hoursDecimalConf = DEFAULT_TIME_DECIMAL_PIPE_FORMAT;

	protected readonly maxHours = computed(() => {
		if (this.enableMeridiemDisplay()) {
			return 12;
		}
		return getHoursPartFromIsoTime(this.max() ?? '23:59:59');
	});

	protected readonly ampmDisplay = computed(() => {
		return formatAMPM(this.hours()).suffix;
	});

	protected override focusPart(type: 'hours' | 'minutes' | 'meridiem') {
		if (type === 'meridiem') {
			const elementToFocus = this.ampmDisplay() === 'AM' ? this.anteMeridiemRef()?.nativeElement : this.postMeridiemRef()?.nativeElement;
			elementToFocus?.focus();
		} else {
			super.focusPart(type);
		}
	}

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
			} catch {
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
