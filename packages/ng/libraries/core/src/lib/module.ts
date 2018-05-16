import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover/index';
import { LuUserModule } from './user/index';
import { LuSelectModule } from './select/index';
import { LuApiModule } from './api/index';
import { LuRddModule } from './rdd/index';
import { LuEmptyModule } from './empty/index';

@NgModule({
	imports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuApiModule,
		LuRddModule,
	],
	exports: [
		LuEmptyModule,
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuApiModule,
		LuRddModule,
	],
})
export class LuModule {}
