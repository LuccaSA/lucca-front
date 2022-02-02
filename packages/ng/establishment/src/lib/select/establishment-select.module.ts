import { NgModule } from '@angular/core';
import { LuEstablishmentSelectInputModule } from './input/index';
import { LuEstablishmentSearcherModule } from './searcher/index';
import { LuForLegalUnitsModule } from './for-legal-units/index';
import { LuLegalUnitSelectorModule } from './legal-unit-selector/index';
import { LuEstablishmentSelectAllModule } from './select-all/index';

@NgModule({
	imports: [LuEstablishmentSelectInputModule, LuEstablishmentSearcherModule, LuForLegalUnitsModule, LuLegalUnitSelectorModule, LuEstablishmentSelectAllModule],
	exports: [LuEstablishmentSelectInputModule, LuEstablishmentSearcherModule, LuForLegalUnitsModule, LuLegalUnitSelectorModule, LuEstablishmentSelectAllModule],
})
export class LuEstablishmentSelectModule {}
