import { NgModule } from '@angular/core';
import { LuSelectAllModule } from './all/index';

@NgModule({
	imports: [
		LuSelectAllModule,
	],
	exports: [
		LuSelectAllModule,
	],
})
export class LuOptionSelectorModule {}
