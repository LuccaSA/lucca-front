import { CalendarWeekDay, CalendarWeekInfo } from './calendar.token';
import { Day, isSameDay, isSameMonth, isSameYear, startOfDay, startOfMonth, startOfYear } from 'date-fns';
import { CalendarMode } from './calendar2/calendar-mode';

export function getIntlWeekDay(date: Date): CalendarWeekDay {
	return (date.getDay() || 7) as CalendarWeekDay;
}

export function getJSFirstDayOfWeek(weekInfo: CalendarWeekInfo): Day {
	return (weekInfo.firstDay % 7) as Day;
}

const modeToComparator: Record<CalendarMode, (a: Date, b: Date) => boolean> = {
	month: isSameDay,
	year: isSameMonth,
	decade: isSameYear,
};

const modeToPeriodStart: Record<CalendarMode, (date: Date) => Date> = {
	month: startOfDay,
	year: startOfMonth,
	decade: startOfYear,
};

export function comparePeriods(mode: CalendarMode, a: Date, b: Date): boolean {
	return modeToComparator[mode](a, b);
}

export function startOfPeriod(mode: CalendarMode, date: Date): Date {
	return modeToPeriodStart[mode](date);
}
