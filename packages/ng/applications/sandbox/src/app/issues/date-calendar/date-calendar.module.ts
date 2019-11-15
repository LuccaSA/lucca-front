import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateCalendarComponent } from './date-calendar.component';
import { LuDateModule } from '@lucca-front/ng/date';



@NgModule({
	declarations: [
		DateCalendarComponent,
	],
	imports: [
		LuDateModule,

		RouterModule.forChild([
			{ path: '', component: DateCalendarComponent },
		]),
	],
})
export class DateCalendarModule {}
