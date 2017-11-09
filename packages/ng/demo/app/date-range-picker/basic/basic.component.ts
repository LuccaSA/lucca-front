import { Component } from '@angular/core';
import * as moment from 'moment';
// import {IDateRange, IDateRangeSelectChoice} from '../../../../src/app/date-range-picker/date-range-picker.model';

@Component({
	selector: 'demo-basic-date-range-picker',
	templateUrl: './basic.component.html',
	styles: ['']
})
export class BasicComponent {

	// preConfiguredRanges: IDateRangeSelectChoice[];
	// placeholder: string;
	// range: IDateRange = {start: null, end: null};

	// emptyRange = (range: IDateRange) => {
	// 	return !range || (!range.start && !range.end);
	// }

	// constructor() {
	// 	const today = moment().startOf('day');

	// 	this.placeholder = 'Select date range';

	// 	this.preConfiguredRanges = [
	// 		{label: 'This day', range: {start: today.clone(), end:today.clone().add(1, 'day')}},
	// 		{label: 'This month', range: {start: today.clone().startOf('month'), end: today.clone().add(1, 'month').startOf('month')}}
	// 	];
	// }

	// resetRange() {
	// 	this.range = {start: null, end: null};
	// }

}
