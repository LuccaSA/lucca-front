import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover';
import { LuUserModule } from './user';
import { LuEmptyModule } from './empty/empty.module';

@NgModule({
	imports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
	],
	exports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
	],
})
export class LuModule {}
