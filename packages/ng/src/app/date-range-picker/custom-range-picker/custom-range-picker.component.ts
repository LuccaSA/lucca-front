import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import * as moment from 'moment';
import {LuTranslateService} from '../../shared/translation.service';
import {DateRange} from '../date-range-picker.component';
import {debugOutputAstAsTypeScript} from '@angular/compiler';

@Component({
	selector: 'lu-custom-range-picker',
	templateUrl: './custom-range-picker.component.html'
})
export class CustomRangePickerComponent implements OnInit {

	min: moment.Moment = null;
	max: moment.Moment = null;

	constructor(
		@Inject(MD_DIALOG_DATA) public data: DateRange,
		public translate: LuTranslateService,
		public dialogRef: MdDialogRef<any>
	) {
		this.min = data.dateMin;
		this.max = data.dateMax ? data.dateMax.subtract(1, 'day') : null;
	}

	ngOnInit() { }

	updateMin(date) {
		this.min = moment(date).startOf('day');
		this.min.locale(this.translate.getCurrentLang());
	}

	updateMax(date) {
		this.max = moment(date).startOf('day');
		this.max.locale(this.translate.getCurrentLang());
	}

	hasTwoValidDates() {
		return !!this.min && !!this.max && this.min.isBefore(this.max);
	}

	displayDate(date: moment.Moment) {
		return date.format(('LL'));
	}

	close(withMin: boolean, withMax: boolean) {
		this.dialogRef.close({min: withMin ? this.min : null, max: withMax ? this.max.add(1, 'day') : null});
	}

}
