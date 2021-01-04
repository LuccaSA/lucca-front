import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateStringComponent } from './date-string.component';
import { ALuDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';



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
		{ provide: ALuDateAdapter, useClass: LuStringDateAdapter },
	]
})
export class DateStringModule {}
