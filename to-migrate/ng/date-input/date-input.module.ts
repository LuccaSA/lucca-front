import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateInputComponent } from './date-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuDateModule } from '@lucca-front/ng/date';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';

import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData, CommonModule } from '@angular/common';

registerLocaleData(localeFr);
registerLocaleData(localeGb);
registerLocaleData(localeDe);

@NgModule({
	declarations: [
		DateInputComponent,
	],
	imports: [
		FormsModule,
		LuDateModule,
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{ path: '', component: DateInputComponent },
		]),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		// { provide: LOCALE_ID, useValue: 'de-DE' },
		// { provide: LOCALE_ID, useValue: 'en-GB' },
		// { provide: LOCALE_ID, useValue: 'en-US' },
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class DateInputModule {}
