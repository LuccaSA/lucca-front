import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover';
import { LuUserModule } from './user';
import { LuSelectModule } from './select';
import { LuApiModule } from './api';
import { LuRddModule } from './rdd';

@NgModule({
	imports: [
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuApiModule,
		LuRddModule,
	],
	exports: [
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuApiModule,
		LuRddModule,
	],
})
export class LuModule {}
