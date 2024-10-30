import { CalendarWeekDay, CalendarWeekInfo } from './calendar.token';
import { Day, isSameDay, isSameMonth, isSameYear, startOfDecade, startOfMonth, startOfYear } from 'date-fns';
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

const modeToPeriodStart: Record<CalendarMode, (date: Date) => Date> = {
	day: startOfMonth,
	month: startOfYear,
	year: startOfDecade,
};

export function comparePeriods(mode: CalendarMode, a: Date, b: Date): boolean {
	return modeToComparator[mode](a, b);
}

export function startOfPeriod(mode: CalendarMode, date: Date): Date {
	return modeToPeriodStart[mode](date);
}
