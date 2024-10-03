import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, inject, input, LOCALE_ID, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { addMonths, addYears, parse, startOfDay, startOfMonth } from 'date-fns';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { DateRange } from '../calendar2/date-range';
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
	],
})
export class DateInputComponent implements ControlValueAccessor {
	#locale = inject(LOCALE_ID);

	#intlDateTimeFormat = new Intl.DateTimeFormat(this.#locale);

	// Contains the current date format (like dd/mm/yy etc) based on current locale
	#dateFormat = this.#intlDateTimeFormat.formatToParts(new Date('01/01/2024')).reduce((acc, part) => {
		switch (part.type) {
			case 'day':
				return `${acc}${'d'.repeat(part.value.length)}`;
			case 'month':
				return `${acc}${'M'.repeat(part.value.length)}`;
			case 'year':
				return `${acc}${'y'.repeat(part.value.length)}`;
			case 'literal':
				return `${acc}${part.value}`;
		}
		return acc;
	}, '');

	intl = getIntl(LU_DATE2_TRANSLATIONS);

	// CVA stuff
	#onChange?: (value: Date) => void;
	onTouched?: () => void;
	disabled = false;

	min = input<Date>(new Date('1/1/1000'));
	max = input<Date | null>(null);

	ranges = input<DateRange[]>([]);

	enableOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });
	showOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });
	hideToday = input<boolean, boolean>(false, { transform: booleanAttribute });

	getCellInfo = input<((day: Date, mode: CalendarMode) => CellStatus) | null>();

	clearable = input<boolean, boolean>(false, { transform: booleanAttribute });

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, 6),
	];

	calendarMode = signal<CalendarMode>('month');

	protected currentDate = signal(startOfMonth(new Date()));

	protected tabbableDate = signal<Date | null>(null);

	selectedDate = signal<Date | null>(null);

	calendar = viewChild(Calendar2Component);

	displayValue = computed(() => {
		if (this.selectedDate()) {
			return this.#intlDateTimeFormat.format(this.selectedDate());
		}
		return null;
	});

	userTextInput = signal<string>('');

	combinedGetCellInfo = (date: Date, mode: CalendarMode): CellStatus => {
		const infoFromInput = this.getCellInfo()?.(date, mode);
		return {
			classes: [...(infoFromInput?.classes || [])],
			// TODO compare min and max based on mode
			disabled: infoFromInput?.disabled || !this.isInMinMax(date, mode),
			selected: this.selectedDate() && this.calendarMode() === mode && comparePeriods(mode, date, this.selectedDate()),
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
				const parsed = parse(inputValue, this.#dateFormat, startOfDay(new Date()));
				if (parsed.getFullYear() > 999) {
					this.selectedDate.set(startOfDay(parsed));
					this.currentDate.set(startOfDay(parsed));
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
			if (!this.isNavigationButtonFocused) {
				this.calendar()?.blurTabbableDate();
				setTimeout(() => {
					this.calendar()?.focusTabbableDate();
				});
			}
		});
	}

	isInMinMax(date: Date, mode: CalendarMode): boolean {
		let result = true;
		if (this.min()) {
			switch (mode) {
				case 'month':
					result = result && this.min().getTime() <= date.getTime();
					break;
				case 'year':
					result = result && this.min().getMonth() <= date.getMonth();
					break;
				case 'decade':
					result = result && this.min().getFullYear() <= date.getFullYear();
					break;
			}
		}
		if (this.max()) {
			switch (mode) {
				case 'month':
					result = result && this.max().getTime() >= date.getTime();
					break;
				case 'year':
					result = result && this.max().getMonth() >= date.getMonth();
					break;
				case 'decade':
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

	clear() {
		// todo clear
	}

	currentDateChangeFromCalendar(date: Date): void {
		this.tabbableDate.set(date);
		this.currentDate.set(date);
	}

	move(direction: 1 | -1): void {
		switch (this.calendarMode()) {
			case 'decade':
				this.currentDate.set(addYears(this.currentDate(), direction * 10));
				this.tabbableDate.set(addYears(this.tabbableDate(), direction * 10));
				break;
			case 'year':
				this.currentDate.set(addYears(this.currentDate(), direction));
				this.tabbableDate.set(addYears(this.tabbableDate(), direction));
				break;
			case 'month':
				this.currentDate.set(addMonths(this.currentDate(), direction));
				this.tabbableDate.set(addMonths(this.tabbableDate(), direction));
				break;
		}
	}
}
