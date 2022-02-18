import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LuLegalUnitSelectorDirective } from './legal-unit-selector.directive';

@NgModule({
	imports: [HttpClientModule],
	declarations: [LuLegalUnitSelectorDirective],
	exports: [LuLegalUnitSelectorDirective],
})
export class LuLegalUnitSelectorModule {}
