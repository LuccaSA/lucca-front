import * as moment from 'moment';

export interface DateRangeSelectChoice {
	range: DateRange;
	label: string;
}

export interface DateRange {
	dateMin: moment.Moment;
	dateMax: moment.Moment;
}
