import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateUtcComponent } from './date-utc.component';
import { ALuDateAdapter, LuNativeDateAdapter, LU_NATIVE_DATE_ADAPTER_OPTIONS } from '@lucca-front/ng/core';
import { LuDateModule } from '@lucca-front/ng/date';

import { FormsModule } from '@angular/forms';
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
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: DateUtcComponent },
		]),
	],
	providers: [
		// { provide: LOCALE_ID, useValue: 'fr-FR' },
		{ provide: LOCALE_ID, useValue: 'en-GB' },
		// { provide: LOCALE_ID, useValue: 'en-US' },
		{ provide: LU_NATIVE_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class DateUtcModule {}
