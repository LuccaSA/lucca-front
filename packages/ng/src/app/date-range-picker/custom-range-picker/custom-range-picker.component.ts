import {Component, Inject, OnInit} from '@angular/core';
import {DateAdapter, MD_DIALOG_DATA, MdDialogRef, NativeDateAdapter} from '@angular/material';
import * as moment from 'moment';
import {LuTranslateService} from '../../shared/translation.service';
import {DateRange} from '../date-range-picker.models';

@Component({
	selector: 'lu-custom-range-picker',
	templateUrl: './custom-range-picker.component.html'
})
export class CustomRangePickerComponent implements OnInit {

	min: moment.Moment = null;
	max: moment.Moment = null;
	locale: string;

	constructor(
		@Inject(MD_DIALOG_DATA) public data: DateRange,
		dateAdapter: DateAdapter<NativeDateAdapter>,
		public translate: LuTranslateService,
		public dialogRef: MdDialogRef<any>
	) {
		this.locale = translate.getCurrentLang();
		dateAdapter.setLocale(this.locale);
		this.min = this.update(data.dateMin);
		this.max = this.update(moment(data.dateMax).subtract(1, 'day'));
	}

	ngOnInit() { }

	updateMin(date) {
		this.min = this.update(date);
	}

	updateMax(date) {
		this.max = this.update(date);
	}

	private update(date) {
		const newDate = moment(date).startOf('day');
		newDate.locale(this.locale);
		return newDate.isValid() ? newDate: null;
	}

	displayDate(date: moment.Moment) {
		return date.format(('LL'));
	}

	close(withMin: boolean, withMax: boolean) {
		this.dialogRef.close({min: withMin ? this.min : null, max: withMax ? this.max.add(1, 'day') : null});
	}

}
