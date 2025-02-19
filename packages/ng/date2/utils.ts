import { Day, isSameDay, isSameMonth, isSameYear, startOfDecade, startOfMonth, startOfYear } from 'date-fns';
import { isNil } from '../time/core/misc.utils';
import { CalendarWeekDay, CalendarWeekInfo } from './calendar.token';
import { CalendarMode } from './calendar2/calendar-mode';

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

export function comparePeriods(mode: CalendarMode, a: Date, b: Date): boolean {
	return modeToComparator[mode](a, b);
}

export function compareCalendarPeriods(mode: CalendarMode, a: Date, b: Date): boolean {
	return modeToCalendarComparator[mode](a, b);
}

export function startOfPeriod(mode: CalendarMode, date: Date): Date {
	return modeToPeriodStart[mode](date);
}

export function transformStringToDate(value: Date | null | undefined | string): Date | null {
	if (isNil(value)) {
		return null;
	}
	if (value instanceof Date) {
		return value;
	}
	return new Date(value);
}
