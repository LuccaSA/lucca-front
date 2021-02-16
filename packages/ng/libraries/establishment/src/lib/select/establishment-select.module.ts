import { NgModule } from '@angular/core';
import { LuEstablishmentPagerModule } from './pager/index';
import { LuEstablishmentSelectInputModule } from './input/index';
import { LuEstablishmentSearcherModule } from './searcher/index';
import { LuForLegalUnitsModule } from './for-legal-units';
import { LuLegalUnitSelectorModule } from './legal-unit-selector';

@NgModule({
	imports: [
		LuEstablishmentPagerModule,
		LuEstablishmentSelectInputModule,
		LuEstablishmentSearcherModule,
		LuForLegalUnitsModule,
		LuLegalUnitSelectorModule
	],
	exports: [
		LuEstablishmentPagerModule,
		LuEstablishmentSelectInputModule,
		LuEstablishmentSearcherModule,
		LuForLegalUnitsModule,
		LuLegalUnitSelectorModule
	],
})
export class LuEstablishmentSelectModule { }
