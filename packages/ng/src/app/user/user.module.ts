import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './tile';
import { LuUserPictureModule } from './picture';
import { LuUserDisplayModule } from './display';
import { LuUserSelectModule } from './select';
import { LuSelectModule } from '../select';

@NgModule({
	imports: [
		CommonModule,
		LuUserTileModule,
		LuUserPictureModule,
		LuUserDisplayModule,
		LuUserSelectModule,
		LuSelectModule,
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
