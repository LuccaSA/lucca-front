import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'lu-date-minmax',
	templateUrl: './date-minmax.component.html'
})
export class DateMinmaxComponent {
	date = new Date();
	min = new Date();
	max = new Date();
	formDir = new FormGroup({
		date: new FormControl(new Date()),
	});
	formCal = new FormGroup({
		date: new FormControl(new Date()),
	});
	formPic = new FormGroup({
		date: new FormControl(new Date()),
	});
	formSel = new FormGroup({
		date: new FormControl(new Date()),
	});
	submit() {
	}
}
