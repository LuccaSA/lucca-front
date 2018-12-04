import { NgModule } from '@angular/core';
import { LuApiModule } from './api/index';
import { LuInputModule } from './input/index';
import { LuNumberModule } from './number/index';
import { LuOptionModule } from './option/index';
import { LuPopoverModule } from './popover/index';
import { LuSafeContentModule } from './safe-content/index';
import { LuScrollModule } from './scroll/index';
import { LuSelectModule } from './select/index';
import { LuTooltipModule } from './tooltip/index';
import { LuUserModule } from './user/index';

@NgModule({
	imports: [
		LuApiModule,
		LuInputModule,
		LuNumberModule,
		LuOptionModule,
		LuPopoverModule,
		LuSafeContentModule,
		LuScrollModule,
		LuSelectModule,
		LuTooltipModule,
		LuUserModule,
	],
	exports: [
		LuApiModule,
		LuInputModule,
		LuNumberModule,
		LuOptionModule,
		LuPopoverModule,
		LuSafeContentModule,
		LuScrollModule,
		LuSelectModule,
		LuTooltipModule,
		LuUserModule,
	],
})
export class LuModule {}
