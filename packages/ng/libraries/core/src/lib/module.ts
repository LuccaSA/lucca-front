import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover';
import { LuUserModule } from './user';

@NgModule({
	imports: [
		LuUserModule,
		LuPopoverModule,
	],
	exports: [
		LuUserModule,
		LuPopoverModule,
	],
})
export class LuModule {}
