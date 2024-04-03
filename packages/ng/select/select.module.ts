import { NgModule } from '@angular/core';
import { LuSelectInputModule } from './input/index';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect
 */
@NgModule({
	imports: [LuSelectInputModule],
	exports: [LuSelectInputModule],
})
export class LuSelectModule {}
