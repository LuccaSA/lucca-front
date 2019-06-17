import { NgModule } from '@angular/core';
import { LuApiModule } from './api/index';
import { LuInputModule } from './input/index';
import { LuNumberModule } from './number/index';
import { LuOptionModule } from './option/index';
import { LuSafeContentModule } from './safe-content/index';
import { LuScrollModule } from './scroll/index';
import { LuSelectModule } from './select/index';
import { LuUserModule } from './user/index';
import { LuOverlayModule } from './overlay/index';
import { LuTreeModule } from './tree/index';

@NgModule({
	imports: [
		LuApiModule,
		LuInputModule,
		LuNumberModule,
		LuOptionModule,
		LuSafeContentModule,
		LuScrollModule,
		LuSelectModule,
		LuUserModule,
		LuOverlayModule,
		LuTreeModule,
	],
	exports: [
		LuApiModule,
		LuInputModule,
		LuNumberModule,
		LuOptionModule,
		LuSafeContentModule,
		LuScrollModule,
		LuSelectModule,
		LuUserModule,
		LuOverlayModule,
		LuTreeModule,
	],
})
export class LuModule {}
