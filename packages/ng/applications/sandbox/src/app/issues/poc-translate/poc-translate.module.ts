import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocTranslateComponent } from './poc-translate.component';
import { LolModule } from './lol.module';
import { lolOverrides } from './lol.override';
import { LOL_TRANSLATIONS_TOKEN } from './lol.translate';

@NgModule({
	declarations: [
		PocTranslateComponent,
	],
	imports: [
		RouterModule.forChild([
			{ path: '', component: PocTranslateComponent },
		]),
		LolModule,
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		// { provide: LOCALE_ID, useValue: 'de-DE' },
		{ provide: LOL_TRANSLATIONS_TOKEN, useValue: lolOverrides },
	]
})
export class PocTranslateModule {}
