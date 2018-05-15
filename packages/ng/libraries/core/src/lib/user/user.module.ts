import { NgModule } from '@angular/core';
import { LuUserDisplayModule } from './display';
import { LuUserPictureModule } from './picture';
import { LuUserTileModule } from './tile';
import { LuUserSelectModule } from './select/user-select.module';

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
