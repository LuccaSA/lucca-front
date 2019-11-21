import { Component } from '@angular/core';

@Component({
	selector: 'sand-date-input',
	templateUrl: './date-input.component.html'
})
export class DateInputComponent {
	date = new Date();
}
