import { NgModule } from '@angular/core';
import { LuQualificationSelectModule } from './select/qualification-select.module';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with jobQualifications directive
 */
@NgModule({
	imports: [LuQualificationSelectModule],
	exports: [LuQualificationSelectModule],
})
export class LuQualificationModule {}
