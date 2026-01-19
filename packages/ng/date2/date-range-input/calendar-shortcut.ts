import { DateRange } from '../calendar2/date-range';
import { endOfDay, endOfMonth, endOfQuarter, endOfWeek, endOfYear, startOfDay, startOfMonth, startOfQuarter, startOfWeek, startOfYear, subMonths, subQuarters, subWeeks, subYears } from 'date-fns';
import { getLocaleFirstDayOfWeek } from '@angular/common';

export interface CalendarShortcut {
	label: string;
	range: DateRange;
}

export const PremadeShortcuts: Record<string, (locale: string) => DateRange> = {
	SinceStartOfWeek: (locale: string) => {
		return {
			// TODO find a reliable way to obtain this, Angular has a deprecated method, date-fns can't get locale from string, Intl's weekDay isn't in firefox
			start: startOfWeek(new Date(), { weekStartsOn: getLocaleFirstDayOfWeek(locale) }),
			end: startOfDay(new Date()),
		};
	},
	LastWeek: (locale: string) => {
		const startOfLastWeek = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: getLocaleFirstDayOfWeek(locale) });
		return {
			// TODO find a reliable way to obtain this, Angular has a deprecated method, date-fns can't get locale from string, Intl's weekDay isn't in firefox
			start: startOfLastWeek,
			end: endOfWeek(startOfLastWeek, { weekStartsOn: getLocaleFirstDayOfWeek(locale) }),
		};
	},
	SinceStartOfMonth: () => {
		return {
			start: startOfMonth(new Date()),
			end: endOfDay(new Date()),
		};
	},
	LastMonth: () => {
		const startOfLastMonth = startOfMonth(subMonths(new Date(), 1));
		return {
			start: startOfLastMonth,
			end: endOfMonth(startOfLastMonth),
		};
	},
	SinceStartOfQuarter: () => {
		return {
			start: startOfQuarter(new Date()),
			end: endOfDay(new Date()),
		};
	},
	LastQuarter: () => {
		const startOfLastQuarter = startOfQuarter(subQuarters(new Date(), 1));
		return {
			start: startOfLastQuarter,
			end: endOfQuarter(startOfLastQuarter),
		};
	},
	SinceStartOfYear: () => {
		return {
			start: startOfYear(new Date()),
			end: endOfDay(new Date()),
		};
	},
	LastYear: () => {
		const startOfLastYear = startOfYear(subYears(new Date(), 1));
		return {
			start: startOfLastYear,
			end: endOfYear(startOfLastYear),
		};
	},
	LastTwelveMonths: () => {
		return {
			start: subMonths(new Date(), 12),
			end: new Date(),
		};
	},
};
