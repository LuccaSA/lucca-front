import { Component } from '@angular/core';

@Component({
	selector: 'sand-date-select-enh',
	templateUrl: './date-select-enh.component.html'
})
export class DateSelectEnhComponent {
	date;
	min = new Date();
}
