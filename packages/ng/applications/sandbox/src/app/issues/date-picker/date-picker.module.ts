import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DatePickerComponent } from './date-picker.component';

import { LuSelectModule } from '@lucca-front/ng/select';
import { LuDateModule, ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/date';
import { LuInputModule } from '@lucca-front/ng/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuOptionModule } from '@lucca-front/ng/option';


@NgModule({
	declarations: [
		DatePickerComponent,
	],
	imports: [
		LuSelectModule,
		LuDateModule,
		LuInputModule,
		LuOptionModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: DatePickerComponent },
		]),
	],
	providers: [
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class DatePickerModule {}
