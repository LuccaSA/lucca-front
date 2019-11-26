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
	form = new FormGroup({
		date: new FormControl(new Date()),
	});
}
