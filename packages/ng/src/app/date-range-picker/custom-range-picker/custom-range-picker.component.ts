import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import * as moment from 'moment';
import {LuTranslateService} from '../../shared/translation.service';

@Component({
	selector: 'lu-custom-range-picker',
	templateUrl: './custom-range-picker.component.html'
})
export class CustomRangePickerComponent implements OnInit {

	min: moment.Moment = null;
	max: moment.Moment = null;

	constructor(public translate: LuTranslateService, public dialogRef: MdDialogRef<any>) { }

	ngOnInit() { }

	updateMin(date) {
		this.min = moment(date).startOf('day');
		this.min.locale(this.translate.getCurrentLang());
		this.tryAndAutoClose();
	}

	updateMax(date) {
		this.max = moment(date).startOf('day');
		this.max.locale(this.translate.getCurrentLang());
		this.tryAndAutoClose();
	}

	hasTwoValidDates() {
		return !!this.min && !!this.max && this.min.isBefore(this.max);
	}

	tryAndAutoClose() {
		if (this.hasTwoValidDates()) {
			this.close(true, true);
		}
	}

	displayDate(date: moment.Moment) {
		return date.format(('LL'));
	}

	close(withMin: boolean, withMax: boolean) {
		this.dialogRef.close({min: withMin ? this.min : null, max: withMax ? this.max.add(1, 'day') : null});
	}

}
