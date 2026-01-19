import { NgModule } from '@angular/core';
import { LuLegalUnitSelectorDirective } from './legal-unit-selector.directive';

/**
 * @deprecated use `LuLegalUnitSelectorDirective` instead
 */
@NgModule({
	imports: [LuLegalUnitSelectorDirective],
	exports: [LuLegalUnitSelectorDirective],
})
export class LuLegalUnitSelectorModule {}
