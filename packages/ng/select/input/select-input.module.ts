import { NgModule } from '@angular/core';
import { LuSelectInputComponent } from './select-input.component';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect
 */
@NgModule({
	imports: [LuSelectInputComponent],
	exports: [LuSelectInputComponent],
})
export class LuSelectInputModule {}
