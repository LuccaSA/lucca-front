import { NgModule } from '@angular/core';
import { LuQualificationSelectInputModule } from './input/index';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with jobQualifications directive
 */
@NgModule({
	imports: [LuQualificationSelectInputModule],
	exports: [LuQualificationSelectInputModule],
})
export class LuQualificationSelectModule {}
