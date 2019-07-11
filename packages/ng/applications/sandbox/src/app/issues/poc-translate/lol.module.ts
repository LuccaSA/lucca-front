import { NgModule } from '@angular/core';

import { LOL_TRANSLATIONS_TOKEN, lolTranslations } from './lol.translate';
import { LolIntl } from './lol.intl';
import { LolComponent } from './lol.component';

@NgModule({
	declarations: [
		LolComponent,
	],
	imports: [
	],
	providers: [
		{ provide: LOL_TRANSLATIONS_TOKEN, useValue: lolTranslations },
		LolIntl,
	],
	exports: [
		LolComponent,
	]
})
export class LolModule {}
