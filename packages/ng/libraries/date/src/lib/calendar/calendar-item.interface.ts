export enum CalendarGranularity {
	day = 'day',
	month = 'month',
	year = 'year',
	decade = 'decade',
}
export interface ICalendarItem<D> {
	id: string;
	date: D;
	mods: string[];
	label: string;
	granularity: CalendarGranularity;
}
