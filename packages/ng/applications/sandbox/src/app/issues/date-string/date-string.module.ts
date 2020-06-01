import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateStringComponent } from './date-string.component';
import { ALuDateAdapter, LuStringDateAdapter, LU_STRING_DATE_ADAPTER_OPTIONS } from '@lucca-front/ng/core';



@NgModule({
	declarations: [
		DateStringComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: DateStringComponent },
		]),
	],
	providers: [
		
		{ provide: LOCALE_ID, useValue: 'en-US' },
		{ provide: LU_STRING_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, timezone: 'z' } },
		{ provide: ALuDateAdapter, useClass: LuStringDateAdapter },
	]
})
export class DateStringModule {}
