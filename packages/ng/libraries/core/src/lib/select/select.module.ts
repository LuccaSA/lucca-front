import { NgModule } from '@angular/core';
import { LuSelectInputModule } from './input/index';
import { LuSelectPickerModule } from './picker/index';

@NgModule({
	imports: [
		LuSelectInputModule,
		LuSelectPickerModule,
	],
	exports: [
		LuSelectInputModule,
		LuSelectPickerModule,
	],
})
export class LuSelectModule {}
