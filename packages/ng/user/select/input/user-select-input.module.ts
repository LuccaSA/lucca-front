import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with luCustomUsers directive
 */
@NgModule({
	imports: [LuUserSelectInputComponent],
	exports: [LuUserSelectInputComponent],
})
export class LuUserSelectInputModule {}
