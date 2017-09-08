import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import * as moment from 'moment';
import {LuTranslateService} from '../../shared/translation.service';
import {DateRange} from '../date-range-picker.models';
import {MomentDateAdapter} from '../../shared/moment/moment.date-adapter';

@Component({
	selector: 'lu-custom-range-picker',
	styleUrls: ['./custom-range-picker.scss'],
	templateUrl: './custom-range-picker.component.html'
})
export class CustomRangePickerComponent implements OnInit {

	min: moment.Moment = null;
	max: moment.Moment = null;
	locale: string;

	constructor (
		@Inject(MD_DIALOG_DATA) public data: DateRange,
		public dateAdapter: MomentDateAdapter,
		public translate: LuTranslateService,
		public dialogRef: MdDialogRef<any>
	) {
		this.locale = translate.getCurrentLang();
		dateAdapter.setLocale(this.locale);
		this.min = this.initDate(data.start);
		this.max = this.initDate(moment(data.end).subtract(1, 'day'));
	}

	ngOnInit() { }

	private initDate(date): moment.Moment {
		const newDate = moment(date).startOf('day');
		if (newDate) {
			newDate.locale(this.locale);
		}
		return newDate.isValid() ? newDate: null;
	}

	displayDate(date: moment.Moment): string {
		return date.format(('LL'));
	}

	close(withMin: boolean, withMax: boolean) {
		this.dialogRef.close({min: withMin ? this.min : null, max: withMax ? this.max.add(1, 'day') : null});
	}

}
