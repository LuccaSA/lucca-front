import { CalendarWeekDay, CalendarWeekInfo } from './calendar.token';
import { Day } from 'date-fns';

export function getIntlWeekDay(date: Date): CalendarWeekDay {
	return (date.getDay() || 7) as CalendarWeekDay;
}

export function getJSFirstDayOfWeek(weekInfo: CalendarWeekInfo): Day {
	return (weekInfo.firstDay % 7) as Day;
}
