import { Component } from '@angular/core';

@Component({
	selector: 'sand-date-utc',
	templateUrl: './date-utc.component.html'
})
export class DateUtcComponent {
	utcValentine = new Date(Date.UTC(2020, 1, 14));
	valentine = new Date(2020, 1, 14);
}
