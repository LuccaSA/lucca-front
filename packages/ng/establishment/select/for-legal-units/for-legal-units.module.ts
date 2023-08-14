import { NgModule } from '@angular/core';
import { LuForLegalUnitsDirective } from './for-legal-units.directive';

@NgModule({
	imports: [LuForLegalUnitsDirective],
	exports: [LuForLegalUnitsDirective],
})
export class LuForLegalUnitsModule {}
