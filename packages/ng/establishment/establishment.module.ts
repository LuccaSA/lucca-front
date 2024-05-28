import { NgModule } from '@angular/core';
import { LuEstablishmentSelectModule } from './select/index';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with establishments directive
 */
@NgModule({
	imports: [LuEstablishmentSelectModule],
	exports: [LuEstablishmentSelectModule],
})
export class LuEstablishmentModule {}
