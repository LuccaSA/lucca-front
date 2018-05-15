import { NgModule } from '@angular/core';
import { LuUserDisplayModule } from './display';
import { LuUserPictureModule } from './picture';
import { LuUserTileModule } from './tile';

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
