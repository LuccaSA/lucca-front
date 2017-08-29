import { Component } from '@angular/core';
import * as moment from 'moment';
import {DateRange, DateRangeSelectChoice} from '../../../../src/app/date-range-picker/date-range-picker.models';

@Component({
	selector: 'demo-basic-date-range-picker',
	templateUrl: './basic.component.html',
	styles: ['']
})
export class BasicComponent {

	preConfiguredRanges: DateRangeSelectChoice[];
	placeholder: string;
	range: DateRange = {dateMin: null, dateMax: null};

	constructor() {
		const today = moment().startOf('day');

		this.placeholder = 'Select date range';

		this.preConfiguredRanges = [
			{label: 'This day', range: {dateMin: today.clone(), dateMax:today.clone().add(1, 'day')}},
			{label: 'This month', range: {dateMin: today.clone().startOf('month'), dateMax: today.clone().add(1, 'month').startOf('month')}}
		];
	}

	resetRange() {
		this.range = {dateMin: null, dateMax: null};
	}

}
