import { NgModule } from '@angular/core';
import { LuEstablishmentSelectInputComponent } from './establishment-select-input.component';
import { CommonModule } from '@angular/common';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuEstablishmentPagerModule } from '../pager/index';
import { LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS } from './establishment-select-input.token';
import { luEstablishmentSelectInputTranslations } from './establishment-select-input.translate';
import { LuEstablishmentSelectInputIntl } from './establishment-select-input.intl';
import { LuEstablishmentSearcherModule } from '../searcher/index';

@NgModule({
	imports: [
		CommonModule,
		LuInputModule,
		LuOptionModule,
		LuEstablishmentPagerModule,
		LuEstablishmentSearcherModule,
	],
	declarations: [
		LuEstablishmentSelectInputComponent,
	],
	exports: [
		LuEstablishmentSelectInputComponent,
	],
	providers: [
		{ provide: LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS, useValue: luEstablishmentSelectInputTranslations },
		LuEstablishmentSelectInputIntl,
	],
})
export class LuEstablishmentSelectInputModule {}
