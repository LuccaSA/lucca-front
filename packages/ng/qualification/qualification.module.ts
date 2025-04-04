import { NgModule } from '@angular/core';
import { LuQualificationSelectInputComponent } from './select/input/qualification-select-input.component';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with jobQualifications directive
 */
@NgModule({
	imports: [LuQualificationSelectInputComponent],
	exports: [LuQualificationSelectInputComponent],
})
export class LuQualificationModule {}
