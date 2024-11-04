import { booleanAttribute, Component, inject, input, LOCALE_ID, signal } from '@angular/core';
import { addMonths, addYears } from 'date-fns';
import { getIntl } from '@lucca-front/ng/core';
import { CalendarMode } from './calendar2/calendar-mode';
import { CellStatus } from './calendar2/cell-status';
import { DateRange } from './calendar2/date-range';
import { getDateFormat } from './date-format';
import { LU_DATE2_TRANSLATIONS } from './date2.translate';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '',
	template: '',
})
export abstract class AbstractDateComponent {
	protected locale = inject(LOCALE_ID);
	// Contains the current date format (like dd/mm/yy etc) based on current locale
	protected dateFormat = getDateFormat(this.locale).toUpperCase();
	intlDateTimeFormat = new Intl.DateTimeFormat(this.locale);

	intlDateTimeFormatMonth = new Intl.DateTimeFormat(this.locale, { month: 'numeric', year: 'numeric' });
	intlDateTimeFormatYear = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });

	intl = getIntl(LU_DATE2_TRANSLATIONS);

	onTouched?: () => void;
	disabled = false;

	ranges = input<DateRange[]>([]);
	hideToday = input<boolean, boolean>(false, { transform: booleanAttribute });
	hasTodayButton = input<boolean, boolean>(false, { transform: booleanAttribute });
	clearable = input<boolean, boolean>(false, { transform: booleanAttribute });

	mode = input<CalendarMode>('day');
	hideWeekend = input<boolean, boolean>(false, { transform: booleanAttribute });

	getCellInfo = input<((day: Date, mode: CalendarMode) => CellStatus) | null>();

	min = input<Date>(new Date('1/1/1000'));
	max = input<Date | null>(null);

	calendarMode = signal<CalendarMode>('day');

	protected currentDate = signal(new Date());

	protected tabbableDate = signal<Date | null>(null);

	isInMinMax(date: Date, mode: CalendarMode): boolean {
		let result = true;
		if (this.min()) {
			switch (mode) {
				case 'day':
					result = result && this.min().getTime() <= date.getTime();
					break;
				case 'month':
					result = result && this.min().getMonth() <= date.getMonth();
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
					result = result && this.max().getMonth() >= date.getMonth();
					break;
				case 'year':
					result = result && this.max().getFullYear() >= date.getFullYear();
					break;
			}
		}
		return result;
	}

	isValidDate(date: Date): boolean {
		return !!date && !isNaN(date.getTime());
	}

	prev() {
		this.move(-1);
	}

	next() {
		this.move(1);
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
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
