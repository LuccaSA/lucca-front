import { isNil } from '@lucca-front/ng/core';
import { Day, format, isSameDay, isSameMonth, isSameYear, parse, startOfDecade, startOfMonth, startOfYear } from 'date-fns';
import { CalendarWeekDay, CalendarWeekInfo } from './calendar.token';
import { CalendarMode } from './calendar2/calendar-mode';
import { DateRange, DateRangeInput } from './calendar2/date-range';
import { DATE_ISO_FORMAT } from './date.const';

export function getIntlWeekDay(date: Date): CalendarWeekDay {
	return (date.getDay() || 7) as CalendarWeekDay;
}

export function getJSFirstDayOfWeek(weekInfo: CalendarWeekInfo): Day {
	return (weekInfo.firstDay % 7) as Day;
}

const modeToComparator: Record<CalendarMode, (a: Date, b: Date) => boolean> = {
	day: isSameDay,
	month: isSameMonth,
	year: isSameYear,
};

const modeToCalendarComparator: Record<CalendarMode, (a: Date, b: Date) => boolean> = {
	day: isSameMonth,
	month: isSameYear,
	year: (a, b) => Math.floor(a.getFullYear() / 10) === Math.floor(b.getFullYear() / 10),
};

const modeToPeriodStart: Record<CalendarMode, (date: Date) => Date> = {
	day: startOfMonth,
	month: startOfYear,
	year: startOfDecade,
};

export function comparePeriods(mode: CalendarMode | null, a: Date, b: Date): boolean {
	return mode ? modeToComparator[mode](a, b) : false;
}

export function compareCalendarPeriods(mode: CalendarMode, a: Date, b: Date): boolean {
	return mode ? modeToCalendarComparator[mode](a, b) : false;
}

export function startOfPeriod(mode: CalendarMode | null, date: Date): Date {
	return mode ? modeToPeriodStart[mode](date) : date;
}

function stringToDateISO(value: string): Date {
	const res = parse(value, DATE_ISO_FORMAT, new Date());
	if (isNaN(+res)) {
		throw new Error('Invalid date: your input should be a valid iso date string (yyyy-MM-dd), received: ' + value);
	}
	return res;
}

export function transformDateInputToDate(value: null | undefined): null;
export function transformDateInputToDate(value: Date | string): Date;
export function transformDateInputToDate(value: Date | string | null): Date | null;
export function transformDateInputToDate(value: Date | null | undefined | string): Date | null {
	if (isNil(value)) {
		return null;
	}
	if (value instanceof Date) {
		return value;
	}
	return stringToDateISO(value);
}

export function transformDateToDateISO(value: null): null;
export function transformDateToDateISO(value: Date): string;
export function transformDateToDateISO(value: Date | null): string | null {
	if (isNil(value)) {
		return null;
	}

	return format(value, DATE_ISO_FORMAT);
}

function isDateRangeInput(value: DateRangeInput | DateRange): value is DateRangeInput {
	return !(value.start instanceof Date);
}

export function transformDateRangeInputToDateRange(value: DateRange | null | undefined | DateRangeInput): DateRange | null {
	if (isNil(value)) {
		return null;
	}

	if (!isDateRangeInput(value)) {
		return value;
	}

	const valueEnd = value.end ? transformDateInputToDate(value.end) : null;

	return {
		...value,
		start: transformDateInputToDate(value.start),
		end: valueEnd,
	};
}

export function transformDateRangeToDateRangeInput(value: DateRange): DateRangeInput {
	const valueEnd = value.end ? transformDateToDateISO(value.end) : null;
	return {
		...value,
		start: transformDateToDateISO(value.start),
		end: valueEnd,
	};
}
