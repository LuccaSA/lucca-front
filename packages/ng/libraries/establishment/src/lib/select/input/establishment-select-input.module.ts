import { NgModule } from '@angular/core';
import { LuEstablishmentSelectInputComponent } from './establishment-select-input.component';
import { CommonModule } from '@angular/common';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule, LU_OPTION_SELECT_ALL_TRANSLATIONS } from '@lucca-front/ng/option';
import { LuEstablishmentPagerModule } from '../pager/index';
import { LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS } from './establishment-select-input.token';
import { luEstablishmentSelectInputTranslations } from './establishment-select-input.translate';
import { luEstablishmentSelectAllTranslations, LuEstablishmentSelectInputIntl } from './establishment-select-input.intl';
import { LuEstablishmentSearcherModule } from '../searcher/index';
import { LuLegalUnitSelectorDirective } from './legal-unit-selector.directive';
import { LuForLegalUnitsDirective } from './for-legal-units.directive';

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
		LuLegalUnitSelectorDirective,
		LuForLegalUnitsDirective,
	],
	exports: [
		LuEstablishmentSelectInputComponent,
	],
	providers: [
		{ provide: LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS, useValue: luEstablishmentSelectInputTranslations },
		{ provide: LU_OPTION_SELECT_ALL_TRANSLATIONS, useValue: luEstablishmentSelectAllTranslations },
		LuEstablishmentSelectInputIntl,
	],
})
export class LuEstablishmentSelectInputModule { }
