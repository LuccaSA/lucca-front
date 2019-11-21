import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateInputComponent } from './date-input.component';
import { FormsModule } from '@angular/forms';
import { LuDateModule } from '@lucca-front/ng/date';



@NgModule({
	declarations: [
		DateInputComponent,
	],
	imports: [
		FormsModule,
		LuDateModule,
		RouterModule.forChild([
			{ path: '', component: DateInputComponent },
		]),
	],
})
export class DateInputModule {}
