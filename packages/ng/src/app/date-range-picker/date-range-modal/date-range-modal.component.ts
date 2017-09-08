import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import * as moment from 'moment';
import {LuTranslateService} from '../../shared/translation.service';
import {IDateRange} from '../date-range-picker.model';
import {MomentDateAdapter} from '../../shared/moment/moment.date-adapter';

@Component({
	selector: 'lu-custom-range-picker',
	styleUrls: ['./date-range-modal.scss'],
	templateUrl: './date-range-modal.component.html'
})
export class DateRangeModalComponent implements OnInit {

	start: moment.Moment = null;
	end: moment.Moment = null;
	locale: string;

	constructor (
		@Inject(MD_DIALOG_DATA) public data: IDateRange,
		public dateAdapter: MomentDateAdapter,
		public translate: LuTranslateService,
		public dialogRef: MdDialogRef<any>
	) {
		this.locale = translate.getCurrentLang();
		dateAdapter.setLocale(this.locale);
		this.start = this.initDate(data.start);
		this.end = this.initDate(moment(data.end).subtract(1, 'day'));
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

	close(withStart: boolean, withEnd: boolean) {
		this.dialogRef.close({start: withStart ? this.start : null, end: withEnd ? this.end.add(1, 'day') : null});
	}

}
