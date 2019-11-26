import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateCalendarComponent } from './date-calendar.component';
import { LuDateModule, LuNativeDateModule } from '@lucca-front/ng/date';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';

registerLocaleData(localeFr);
registerLocaleData(localeGb);

@NgModule({
	declarations: [
		DateCalendarComponent,
	],
	imports: [
		LuDateModule,
		FormsModule,
		CommonModule,
		LuNativeDateModule,
		RouterModule.forChild([
			{ path: '', component: DateCalendarComponent },
		]),
	],
	providers: [
		// { provide: LOCALE_ID, useValue: 'fr-FR' },
		// { provide: LOCALE_ID, useValue: 'en-GB' },
		{ provide: LOCALE_ID, useValue: 'en-US' },
	]
})
export class DateCalendarModule {}
