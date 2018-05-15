import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover';
import { LuUserModule } from './user';
import { LuSelectModule } from './select';
import { LuEmptyModule } from './empty';

@NgModule({
	imports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
	],
	exports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
	],
})
export class LuModule {}
