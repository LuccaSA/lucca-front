import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateMinmaxComponent } from './date-minmax.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuDateModule, LuNativeDateModule } from '@lucca-front/ng/date';

import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData, CommonModule } from '@angular/common';

registerLocaleData(localeFr);
registerLocaleData(localeGb);
registerLocaleData(localeDe);

@NgModule({
	declarations: [
		DateMinmaxComponent,
	],
	imports: [
		LuDateModule,
		LuNativeDateModule,
		FormsModule,
		CommonModule,
		ReactiveFormsModule,

		RouterModule.forChild([
			{ path: '', component: DateMinmaxComponent },
		]),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		// { provide: LOCALE_ID, useValue: 'de-DE' },
		// { provide: LOCALE_ID, useValue: 'en-GB' },
		// { provide: LOCALE_ID, useValue: 'en-US' },
	]
})
export class DateMinmaxModule {}
