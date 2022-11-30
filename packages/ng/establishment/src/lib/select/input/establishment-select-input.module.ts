import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuForLegalUnitsModule } from '../for-legal-units/index';
import { LuLegalUnitSelectorModule } from '../legal-unit-selector/index';
import { LuEstablishmentSearcherModule } from '../searcher/index';
import { LuEstablishmentSelectAllModule } from '../select-all/index';
import { LuEstablishmentSelectInputComponent } from './establishment-select-input.component';

@NgModule({
	imports: [CommonModule, OverlayModule, LuInputModule, LuOptionModule, LuEstablishmentSearcherModule, LuEstablishmentSelectAllModule, LuForLegalUnitsModule, LuLegalUnitSelectorModule],
	declarations: [LuEstablishmentSelectInputComponent],
	exports: [LuEstablishmentSelectInputComponent],
})
export class LuEstablishmentSelectInputModule {}
