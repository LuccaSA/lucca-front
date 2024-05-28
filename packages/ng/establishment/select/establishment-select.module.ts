import { NgModule } from '@angular/core';
import { LuForLegalUnitsDirective } from './for-legal-units/index';
import { LuEstablishmentSelectInputComponent } from './input';
import { LuLegalUnitSelectorDirective } from './legal-unit-selector/index';
import { LuEstablishmentSearcherComponent } from './searcher';
import { LuEstablishmentSelectAllComponent } from './select-all/index';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with establishments directive
 */
@NgModule({
	imports: [LuEstablishmentSelectInputComponent, LuEstablishmentSearcherComponent, LuForLegalUnitsDirective, LuLegalUnitSelectorDirective, LuEstablishmentSelectAllComponent],
	exports: [LuEstablishmentSelectInputComponent, LuEstablishmentSearcherComponent, LuForLegalUnitsDirective, LuLegalUnitSelectorDirective, LuEstablishmentSelectAllComponent],
})
export class LuEstablishmentSelectModule {}
