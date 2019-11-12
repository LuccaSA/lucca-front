import { NgModule } from '@angular/core';
import { LuSelectInputModule } from './input/index';
import { LuSelectClearerModule } from './clearer/index';

@NgModule({
	imports: [
		LuSelectInputModule,
		LuSelectClearerModule,
	],
	exports: [
		LuSelectInputModule,
		LuSelectClearerModule,
	],
})
export class LuSelectModule {}
