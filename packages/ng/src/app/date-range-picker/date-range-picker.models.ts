import * as moment from 'moment';

export interface IDateRangeSelectChoice {
	range: IDateRange;
	label: string;
}

export interface IDateRange {
	start: moment.Moment;
	end: moment.Moment;
}
