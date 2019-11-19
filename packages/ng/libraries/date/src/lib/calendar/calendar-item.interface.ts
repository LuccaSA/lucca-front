export enum CalendarGranularity {
	day = 'day',
	month = 'month',
	year = 'year',
	decade = 'decade',
}
export interface ICalendarItem {
	id: string;
	date: Date;
	mods: string[];
	label: string;
	granularity: CalendarGranularity;
}
