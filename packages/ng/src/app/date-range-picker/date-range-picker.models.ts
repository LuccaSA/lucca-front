import * as moment from 'moment';

export interface DateRangeSelectChoice {
	range: DateRange;
	label: string;
}

export interface DateRange {
	start: moment.Moment;
	end: moment.Moment;
}
