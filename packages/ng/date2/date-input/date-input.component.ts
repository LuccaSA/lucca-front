import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, inject, input, LOCALE_ID, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { getIntl, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { addMonths, addYears, isAfter, isBefore, parse, startOfDay, startOfMonth } from 'date-fns';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { DateRange } from '../calendar2/date-range';
import { getDateFormat } from '../date-format';
import { LU_DATE2_TRANSLATIONS } from '../date2.translate';
import { comparePeriods, startOfPeriod } from '../utils';

@Component({
	selector: 'lu-date-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true,
		},
	],
})
export class DateInputComponent implements ControlValueAccessor, Validator {
	#locale = inject(LOCALE_ID);

	#intlDateTimeFormat = new Intl.DateTimeFormat(this.#locale);

	#intlDateTimeFormatMonth = new Intl.DateTimeFormat(this.#locale, { month: 'numeric', year: 'numeric' });
	#intlDateTimeFormatYear = new Intl.DateTimeFormat(this.#locale, { year: 'numeric' });

	// Contains the current date format (like dd/mm/yy etc) based on current locale
	#dateFormat = getDateFormat(this.#locale);

	intl = getIntl(LU_DATE2_TRANSLATIONS);

	// CVA stuff
	#onChange?: (value: Date) => void;
	onTouched?: () => void;
	disabled = false;

	min = input<Date>(new Date('1/1/1000'));
	max = input<Date | null>(null);

	ranges = input<DateRange[]>([]);

	disableOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });
	hideOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });
	hideToday = input<boolean, boolean>(false, { transform: booleanAttribute });
	hasTodayButton = input<boolean, boolean>(false, { transform: booleanAttribute });
	clearable = input<boolean, boolean>(false, { transform: booleanAttribute });
	placeholder = input<string>();

	mode = input<CalendarMode>('day');
	hideWeekend = input<boolean, boolean>(false, { transform: booleanAttribute });

	getCellInfo = input<((day: Date, mode: CalendarMode) => CellStatus) | null>();

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, 6),
	];

	calendarMode = signal<CalendarMode>('day');

	inputFocused = signal(false);

	protected currentDate = signal(startOfMonth(new Date()));

	protected tabbableDate = signal<Date | null>(null);

	selectedDate = signal<Date | null>(null);

	calendar = viewChild(Calendar2Component);

	displayValue = computed(() => {
		if (this.selectedDate() && this.isValidDate(this.selectedDate())) {
			let formatter: Intl.DateTimeFormat;
			switch (this.mode()) {
				case 'day':
					formatter = this.#intlDateTimeFormat;
					break;
				case 'month':
					formatter = this.#intlDateTimeFormatMonth;
					break;
				case 'year':
					formatter = this.#intlDateTimeFormatYear;
					break;
			}
			return formatter.format(this.selectedDate());
		}
		return this.userTextInput();
	});

	userTextInput = signal<string>('');

	combinedGetCellInfo = (date: Date, mode: CalendarMode): CellStatus => {
		const infoFromInput = this.getCellInfo()?.(date, mode);
		return {
			classes: [...(infoFromInput?.classes || [])],
			disabled: infoFromInput?.disabled || !this.isInMinMax(date, mode),
			selected: this.selectedDate() && this.calendarMode() === mode && comparePeriods(mode, date, this.selectedDate()),
			label: infoFromInput?.label,
		};
	};

	previousButton = viewChild<ElementRef<Element>>('previousButtonRef');

	nextButton = viewChild<ElementRef<Element>>('nextButtonRef');

	get isNavigationButtonFocused(): boolean {
		return [this.previousButton()?.nativeElement, this.nextButton()?.nativeElement].includes(document.activeElement);
	}

	constructor() {
		effect(
			() => {
				const inputValue = this.userTextInput();
				if (inputValue.length > 0) {
					let parsed: Date;
					try {
						parsed = parse(inputValue, this.#dateFormat, startOfDay(new Date()));
					} catch (error) {
						/* not a correct date */
					}
					if (parsed instanceof Date && parsed.getFullYear() > 999) {
						this.selectedDate.set(startOfDay(parsed));
						this.currentDate.set(startOfDay(parsed));
					} else {
						this.selectedDate.set(parsed);
					}
				}
			},
			{ allowSignalWrites: true },
		);
		effect(() => {
			this.#onChange?.(this.selectedDate());
		});

		ɵeffectWithDeps([this.calendarMode, this.tabbableDate], (calendarMode, tabbableDate) => {
			if (tabbableDate && !comparePeriods(calendarMode, tabbableDate, this.currentDate())) {
				this.currentDate.set(startOfPeriod(calendarMode, tabbableDate));
			}
			if (!this.isNavigationButtonFocused && !this.inputFocused()) {
				this.calendar()?.blurTabbableDate();
				setTimeout(() => {
					this.calendar()?.focusTabbableDate();
				});
			}
		});
	}

	openPopover(ref: PopoverDirective): void {
		ref.openPopover(true, true);
		// Once popover is opened, aka in the next CD cycle, focus current tabbable date
		setTimeout(() => {
			this.calendar()?.focusTabbableDate();
		});
	}

	validate(control: AbstractControl<Date, Date>): ValidationErrors {
		// null is not an error but means we'll skip everything else, we'll let the presence of a
		// Validators.required (or not) decide if it's an error.
		if (control.value === null || control.value === undefined) {
			return null;
		}
		// try to parse the display value cause formControl.value is undefined if date is not parsable
		try {
			parse(this.displayValue(), this.#dateFormat, startOfDay(new Date()));
		} catch (error) {
			/* not a correct date */
			return { date: true };
		}
		// Check date validity
		if (!this.isValidDate(control.value)) {
			return { date: true };
		}
		// Check min and max
		if (this.min() && isBefore(control.value, this.min())) {
			return { min: true };
		} else if (this.max() && isAfter(control.value, this.max())) {
			return { max: true };
		}
		// Everything is valid
		return null;
	}

	isValidDate(date: Date): boolean {
		return !isNaN(date?.getTime());
	}

	isInMinMax(date: Date, mode: CalendarMode): boolean {
		let result = true;
		if (this.min()) {
			switch (mode) {
				case 'day':
					result = result && this.min().getTime() <= date.getTime();
					break;
				case 'month':
					result = result && startOfMonth(this.min()).getTime() <= startOfMonth(date).getTime();
					break;
				case 'year':
					result = result && this.min().getFullYear() <= date.getFullYear();
					break;
			}
		}
		if (this.max()) {
			switch (mode) {
				case 'day':
					result = result && this.max().getTime() >= date.getTime();
					break;
				case 'month':
					result = result && startOfMonth(this.max()).getTime() >= startOfMonth(date).getTime();
					break;
				case 'year':
					result = result && this.max().getFullYear() >= date.getFullYear();
					break;
			}
		}
		return result;
	}

	writeValue(date: Date): void {
		if (date) {
			this.selectedDate.set(startOfDay(date));
			this.currentDate.set(startOfDay(date));
		}
	}

	registerOnChange(fn: (value: Date) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	prev() {
		this.move(-1);
	}

	next() {
		this.move(1);
	}

	clear(input: HTMLInputElement) {
		input.value = '';
		this.selectedDate.set(null);
		this.onTouched?.();
	}

	currentDateChangeFromCalendar(date: Date): void {
		this.tabbableDate.set(date);
		this.currentDate.set(date);
	}

	move(direction: 1 | -1): void {
		switch (this.calendarMode()) {
			case 'year':
				this.currentDate.set(addYears(this.currentDate(), direction * 10));
				this.tabbableDate.set(addYears(this.tabbableDate(), direction * 10));
				break;
			case 'month':
				this.currentDate.set(addYears(this.currentDate(), direction));
				this.tabbableDate.set(addYears(this.tabbableDate(), direction));
				break;
			case 'day':
				this.currentDate.set(addMonths(this.currentDate(), direction));
				this.tabbableDate.set(addMonths(this.tabbableDate(), direction));
				break;
		}
	}
}
