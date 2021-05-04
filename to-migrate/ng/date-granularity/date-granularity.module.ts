import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateGranularityComponent } from './date-granularity.component';
import { LuDateModule } from '@lucca-front/ng/date';
import { FormsModule } from '@angular/forms';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		DateGranularityComponent,
	],
	imports: [
		LuDateModule,
		FormsModule,
		CommonModule,

		RouterModule.forChild([
			{ path: '', component: DateGranularityComponent },
		]),
	],
	providers: [
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class DateGranularityModule {}
