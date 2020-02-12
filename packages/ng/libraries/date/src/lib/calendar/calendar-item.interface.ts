import { DateGranularity } from '../adapter/index';

export interface ICalendarItem<D> {
	id: string;
	date: D;
	mods: string[];
	label: string;
	granularity: DateGranularity;
}
