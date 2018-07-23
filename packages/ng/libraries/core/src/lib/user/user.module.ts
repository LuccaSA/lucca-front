import { NgModule } from '@angular/core';
import { LuUserDisplayModule } from './display/index';
import { LuUserPictureModule } from './picture/index';
import { LuUserTileModule } from './tile/index';

@NgModule({
	imports: [
		LuUserDisplayModule,
		LuUserPictureModule,
		LuUserTileModule,
	],
	exports: [
		LuUserDisplayModule,
		LuUserPictureModule,
		LuUserTileModule,
	],
})
export class LuUserModule {}
