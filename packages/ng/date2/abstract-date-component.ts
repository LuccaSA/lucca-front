import { booleanAttribute, Component, computed, effect, inject, input, LOCALE_ID, model, output, signal } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { addMonths, addYears, isAfter, isBefore, isSameMonth, startOfDay, startOfMonth } from 'date-fns';
import { CalendarMode } from './calendar2/calendar-mode';
import { CellStatus } from './calendar2/cell-status';
import { DateRange, DateRangeInput } from './calendar2/date-range';
import { getDateFormat, getLocalizedDateFormat, getSeparator } from './date-format';
import { DATE_FORMAT, DateFormat } from './date.const';
import { LU_DATE2_TRANSLATIONS } from './date2.translate';
import { transformDateInputToDate, transformDateRangeInputToDateRange } from './utils';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '',
	template: '',
})
export abstract class AbstractDateComponent {
	protected locale = inject(LOCALE_ID);
	// Contains the current date format (like dd/mm/yy etc) based on current locale
	protected dateFormat = getDateFormat(this.locale);
	protected separator = getSeparator(this.locale);
	intlDateTimeFormat = new Intl.DateTimeFormat(this.locale);

	intlDateTimeFormatMonth = new Intl.DateTimeFormat(this.locale, { month: 'numeric', year: 'numeric' });
	intlDateTimeFormatYear = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });

	intl = getIntl(LU_DATE2_TRANSLATIONS);

	onTouched?: () => void;
	disabled = signal<boolean>(false);

	format = input<DateFormat>(DATE_FORMAT.DATE);
	protected inDateISOFormat = computed(() => this.format() === DATE_FORMAT.DATE_ISO);

	ranges = input([], { transform: (v: readonly DateRange[] | readonly DateRangeInput[]) => v.map(transformDateRangeInputToDateRange) });
	hideToday = input(false, { transform: booleanAttribute });
	hasTodayButton = input(false, { transform: booleanAttribute });
	clearable = input(null, { transform: booleanAttribute });
	clearBehavior = input<'clear' | 'reset'>('clear');

	mode = input<CalendarMode>('day');
	hideWeekend = input(false, { transform: booleanAttribute });

	getCellInfo = input<((day: Date, mode: CalendarMode) => CellStatus) | null>();

	min = input(new Date('1/1/1000'), {
		transform: transformDateInputToDate,
	});
	max = input(null, {
		transform: transformDateInputToDate,
	});
	focusedDate = input(null, {
		transform: transformDateInputToDate,
	});

	calendarMode = model<CalendarMode>();

	panelOpened = output<void>();

	panelClosed = output<void>();

	dateFormatLocalized = computed(() => {
		return getLocalizedDateFormat(this.locale, this.mode());
	});

	protected currentDate = signal(new Date());

	protected tabbableDate = signal<Date | null>(null);

	protected constructor() {
		effect(() => {
			const focusedDate = this.focusedDate();
			if (focusedDate) {
				this.currentDate.set(startOfDay(focusedDate));
			}
		});
	}

	isInMinMax(date: Date, mode: CalendarMode): boolean {
		return this.isAfterMin(date, mode) && this.isBeforeMax(date, mode);
	}

	isAfterMin(date: Date, mode: CalendarMode): boolean {
		if (!this.min()) {
			return true;
		}

		switch (mode) {
			case 'day':
				return this.min().getTime() <= date.getTime();
			case 'month':
				return isBefore(startOfMonth(this.min()), startOfMonth(date)) || isSameMonth(this.min(), date);
			case 'year':
				return this.min().getFullYear() <= date.getFullYear();
			default:
				return true;
		}
	}

	isBeforeMax(date: Date, mode: CalendarMode): boolean {
		if (!this.max()) {
			return true;
		}

		switch (mode) {
			case 'day':
				return this.max().getTime() >= date.getTime();
			case 'month':
				return isAfter(startOfMonth(this.max()), startOfMonth(date)) || isSameMonth(this.max(), date);
			case 'year':
				return this.max().getFullYear() >= date.getFullYear();
			default:
				return true;
		}
	}

	isValidDate(date: Date): boolean {
		return !!date && !isNaN(date.getTime());
	}

	prev(mode: CalendarMode) {
		this.move(-1, mode);
	}

	next(mode: CalendarMode) {
		this.move(1, mode);
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	move(direction: 1 | -1, mode: CalendarMode): void {
		switch (mode) {
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
