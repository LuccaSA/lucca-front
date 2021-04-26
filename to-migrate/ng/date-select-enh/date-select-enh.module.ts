import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuDateModule } from '@lucca-front/ng/date';
import { DateSelectEnhComponent } from './date-select-enh.component';

import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);
registerLocaleData(localeGb);

@NgModule({
	declarations: [
		DateSelectEnhComponent,
	],
	imports: [
		LuDateModule,
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: DateSelectEnhComponent },
		]),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		// { provide: LOCALE_ID, useValue: 'en-GB' },
		// { provide: LOCALE_ID, useValue: 'en-US' },
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class DateSelectEnhModule {}
