import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateCalendarComponent } from './date-calendar.component';
import { LuDateModule } from '@lucca-front/ng/date';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		DateCalendarComponent,
	],
	imports: [
		LuDateModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: DateCalendarComponent },
		]),
	],
})
export class DateCalendarModule {}
