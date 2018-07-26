import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover/index';
import { LuUserModule } from './user/index';
import { LuSelectModule } from './select/index';
import { LuOptionModule } from './option/index';
// import { LuApiModule } from './api/index';
import { LuEmptyModule } from './empty/index';

@NgModule({
	imports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuOptionModule,
		// LuApiModule,
	],
	exports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuOptionModule,
		// LuApiModule,
	],
})
export class LuModule {}
