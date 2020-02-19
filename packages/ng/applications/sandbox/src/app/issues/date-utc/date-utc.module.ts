import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateUtcComponent } from './date-utc.component';
import { LuDateModule, LuNativeUTCDateModule, LuNativeDateModule } from '@lucca-front/ng/date';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';

registerLocaleData(localeFr);
registerLocaleData(localeGb);

@NgModule({
	declarations: [
		DateUtcComponent,
	],
	imports: [
		LuDateModule,
		// LuNativeDateModule,
		LuNativeUTCDateModule,
		RouterModule.forChild([
			{ path: '', component: DateUtcComponent },
		]),
	],
	providers: [
		// { provide: LOCALE_ID, useValue: 'fr-FR' },
		// { provide: LOCALE_ID, useValue: 'en-GB' },
		{ provide: LOCALE_ID, useValue: 'en-US' },
	]
})
export class DateUtcModule {}
