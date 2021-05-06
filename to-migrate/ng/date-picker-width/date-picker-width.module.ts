import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DatePickerWidthComponent } from './date-picker-width.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuDateModule } from '@lucca-front/ng/date';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';


@NgModule({
	declarations: [
		DatePickerWidthComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		LuInputModule,
		LuSelectModule,
		LuDateModule,

		RouterModule.forChild([
			{ path: '', component: DatePickerWidthComponent },
		]),
	],
	providers: [
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	],
})
export class DatePickerWidthModule {}
