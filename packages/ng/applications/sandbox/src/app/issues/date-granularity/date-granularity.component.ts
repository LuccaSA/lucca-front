import { Component } from '@angular/core';
import { ELuDateGranularity } from '@lucca-front/ng/core';

@Component({
	selector: 'sand-date-granularity',
	templateUrl: './date-granularity.component.html'
})
export class DateGranularityComponent {
	date = new Date();
	gran = ELuDateGranularity.month;
}
