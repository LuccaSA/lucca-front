import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover/index';
import { LuUserModule } from './user/index';
import { LuSelectModule } from './select/index';
import { LuOptionModule } from './option/index';
import { LuScrollModule } from './scroll/index';
import { LuApiModule } from './api/index';
import { LuInputModule } from './input/index';

@NgModule({
	imports: [
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuOptionModule,
		LuScrollModule,
		LuApiModule,
		LuInputModule,
	],
	exports: [
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
		LuOptionModule,
		LuScrollModule,
		LuApiModule,
		LuInputModule,
	],
})
export class LuModule {}
