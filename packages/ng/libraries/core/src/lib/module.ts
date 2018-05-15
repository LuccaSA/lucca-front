import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover';
import { LuUserModule } from './user';
import { LuSelectModule } from './select';
import { LuApiModule } from './api';
import { LuRddModule } from './rdd';
import { LuEmptyModule } from './empty';

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
