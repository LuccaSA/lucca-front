import { NgModule } from '@angular/core';
import { LuForLegalUnitsDirective } from './for-legal-units.directive';

/**
 * @deprecated use `LuForLegalUnitsDirective` instead
 */
@NgModule({
	imports: [LuForLegalUnitsDirective],
	exports: [LuForLegalUnitsDirective],
})
export class LuForLegalUnitsModule {}
