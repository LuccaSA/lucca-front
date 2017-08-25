import { Component } from '@angular/core';
import * as moment from 'moment';
import {DateRangeSelectChoice} from '../../../../src/app/date-range-picker/date-range-picker.component';

@Component({
	selector: 'demo-basic-date-range-picker',
	templateUrl: './basic.component.html',
	styleUrls: ['./basic.component.scss']
})
export class BasicComponent {

	preConfiguredRanges: DateRangeSelectChoice[];
	placeholder: string;

	dateMin: moment.Moment;
	dateMax: moment.Moment;

	constructor() {
		const today = moment().startOf('day');

		this.placeholder = 'Select date range';

		this.preConfiguredRanges = [
			{label: 'This day', dateMin: today.clone(), dateMax:today.clone().add(1, 'day')},
			{label: 'This month', dateMin: today.clone().startOf('month'), dateMax: today.clone().add(1, 'month').startOf('month')}
		];
	}

}
