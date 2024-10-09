import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { getLocaleFirstDayOfWeek, getLocaleWeekEndRange } from '@angular/common';

export type CalendarWeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface CalendarWeekInfo {
	firstDay: CalendarWeekDay;
	weekend: CalendarWeekDay[];
}

export const WEEK_INFO = new InjectionToken<CalendarWeekInfo>('Calendar2:WeekInfo', {
	factory: () => {
		const locale = inject(LOCALE_ID);
		// TODO find a reliable way to obtain this, Angular has a deprecated method, date-fns can't get locale from string, Intl's weekDay isn't in firefox
		const [weekendStart, weekendEnd] = getLocaleWeekEndRange(locale);
		const weekend: number[] = [];
		let weekDay: number = weekendStart;
		while (weekDay != weekendEnd) {
			// Sunday is 0 in Angular but 7 in Intl
			weekend.push(weekDay || 7);
			weekDay = (weekDay + 1) % 7;
		}
		weekend.push(weekDay || 7);
		return {
			firstDay: (getLocaleFirstDayOfWeek(locale) + 7) % 7,
			weekend,
		} as CalendarWeekInfo;
	},
});
