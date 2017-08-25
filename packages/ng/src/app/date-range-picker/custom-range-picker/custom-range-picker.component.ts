import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import * as moment from 'moment';

@Component({
	selector: 'lu-custom-range-picker',
	templateUrl: './custom-range-picker.component.html'
})
export class CustomRangePickerComponent implements OnInit {

	min: moment.Moment;
	max: moment.Moment;

	constructor(public dialogRef: MdDialogRef<any>) { }

	ngOnInit() {
	}

	updateMin(date) {
		this.min = moment(date).startOf('day');
		this.tryAndClose();
	}

	updateMax(date) {
		this.max = moment(date).add(1, 'day').startOf('day');
		this.tryAndClose();
	}

	isValid() {
		return !!this.min && !!this.max && this.min.isBefore(this.max);
	}

	tryAndClose() {
		if (this.isValid()) {
			this.dialogRef.close({min: this.min, max: this.max});
		}
	}

}
