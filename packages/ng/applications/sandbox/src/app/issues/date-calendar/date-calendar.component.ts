import { Component } from '@angular/core';

@Component({
	selector: 'sand-date-calendar',
	templateUrl: './date-calendar.component.html'
})
export class DateCalendarComponent {
	date = new Date();
}
