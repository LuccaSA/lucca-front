import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './tile';
import { LuUserPictureModule } from './picture';
import { LuUserDisplayModule } from './display';
import { LuUserSelectModule } from './select';

@NgModule({
	imports: [
		LuUserTileModule,
		LuUserPictureModule,
		LuUserDisplayModule,
		LuUserSelectModule,
	],
	declarations: [],
	exports: [
		LuUserPictureModule,
		LuUserDisplayModule,
		LuUserTileModule,
		LuUserSelectModule,
	],
})
export class LuUserModule {}
