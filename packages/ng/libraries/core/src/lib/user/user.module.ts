import { NgModule } from '@angular/core';
import { LuUserDisplayModule } from './display/index';
import { LuUserPictureModule } from './picture/index';
import { LuUserTileModule } from './tile/index';
import { LuUserSelectModule } from './select/index';

@NgModule({
	imports: [
		LuUserDisplayModule,
		LuUserPictureModule,
		LuUserSelectModule,
		LuUserTileModule,
	],
	exports: [
		LuUserDisplayModule,
		LuUserSelectModule,
		LuUserPictureModule,
		LuUserTileModule,
	],
})
export class LuUserModule {}
