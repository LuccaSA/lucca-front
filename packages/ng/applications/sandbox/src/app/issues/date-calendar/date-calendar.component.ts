import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'sand-date-calendar',
	templateUrl: './date-calendar.component.html'
})
export class DateCalendarComponent implements OnInit {
	date = new Date();
	ngOnInit() {
		// this.date.setFullYear(2016);
	}
	random() {
		this.date = new Date(this.date);
		this.date.setDate(Math.ceil(Math.random() * 30));
	}
}
