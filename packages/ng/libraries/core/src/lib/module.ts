import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover';
import { LuUserModule } from './user';
import { LuSelectModule } from './select';

@NgModule({
	imports: [
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
	],
	exports: [
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
	],
})
export class LuModule {}
